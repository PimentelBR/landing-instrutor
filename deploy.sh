#!/usr/bin/env bash
set -e

SERVER="ubuntu@147.15.92.73"
KEY="/Users/gideao.pimentel/Desktop/ssh-key-2026-05-11.key"
REMOTE_DIR="/home/ubuntu/landing-instrutor"

echo "==> Sincronizando arquivos para o servidor..."
rsync -az --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude api/node_modules \
  --exclude api/dist \
  --exclude '*.log' \
  --exclude '.env' \
  -e "ssh -i $KEY" \
  . "$SERVER:$REMOTE_DIR"

echo "==> Executando deploy no servidor..."
ssh -i "$KEY" "$SERVER" bash <<'REMOTE'
  set -e
  cd /home/ubuntu/landing-instrutor

  # Cria .env se não existir
  if [ ! -f .env ]; then
    PGPASS=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 20)
    JWT=$(openssl rand -hex 32)
    ADMIN=$(openssl rand -hex 24)
    echo "POSTGRES_PASSWORD=${PGPASS}" > .env
    echo "JWT_SECRET=${JWT}" >> .env
    echo "ADMIN_TOKEN=${ADMIN}" >> .env
    echo "[INFO] .env criado com segredos gerados automaticamente."
  fi
  # Garante ADMIN_TOKEN para instâncias antigas
  if ! grep -q ADMIN_TOKEN .env; then
    ADMIN=$(openssl rand -hex 24)
    echo "ADMIN_TOKEN=${ADMIN}" >> .env
    echo "[INFO] ADMIN_TOKEN gerado e adicionado ao .env."
  fi

  # Abre porta 4000 se ainda não estiver aberta
  sudo iptables -C INPUT -m state --state NEW -p tcp --dport 4000 -j ACCEPT 2>/dev/null || \
    sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 4000 -j ACCEPT

  echo "[INFO] Parando containers antigos..."
  docker compose down --remove-orphans 2>/dev/null || true

  echo "[INFO] Buildando imagens (pode demorar alguns minutos)..."
  docker compose build

  echo "[INFO] Subindo containers..."
  docker compose up -d

  echo "[INFO] Aguardando postgres ficar pronto..."
  timeout 60 bash -c 'until docker compose exec -T postgres pg_isready -U instrutor -d landing_instrutor 2>/dev/null; do sleep 2; done'
  echo "[INFO] Postgres pronto!"

  echo "[INFO] Criando/atualizando schema do banco..."
  docker compose exec -T api sh -c "npx prisma db push --accept-data-loss"

  echo "[INFO] Rodando seed (instrutores de demonstração)..."
  docker compose exec -T api sh -c "node dist/lib/seed.js" 2>/dev/null && \
    echo "[INFO] Seed concluído!" || echo "[AVISO] Seed ignorado (já executado anteriormente)"

  echo ""
  docker compose ps
REMOTE

echo ""
echo "========================================="
echo "Deploy concluído com sucesso!"
echo "  Frontend: http://147.15.92.73"
echo "  API:      http://147.15.92.73:4000/health"
echo "========================================="
