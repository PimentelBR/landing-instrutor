export interface Avaliacao {
  nome: string;
  iniciais: string;
  nota: number;
  texto: string;
  data: string;
}

export interface Instrutor {
  slug: string;
  nome: string;
  iniciais: string;
  avatarColor: string;
  bairro: string;
  cidade: string;
  avaliacao: number;
  totalAvaliacoes: number;
  preco: number;
  categorias: string[];
  especialidades: string[];
  experiencia: number;
  premium: boolean;
  verificado: boolean;
  disponivel: boolean;
  bio: string;
  sobre: string;
  telefone: string;
  alunosFormados: number;
  aulasRealizadas: number;
  tempoResposta: string;
  taxaAprovacao: number;
  horarios: { dia: string; slots: string[] }[];
  avaliacoes: Avaliacao[];
}

export const instrutores: Instrutor[] = [
  {
    slug: "joao-mendes",
    nome: "João Mendes",
    iniciais: "JM",
    avatarColor: "from-blue-500 to-blue-700",
    bairro: "Itaparica",
    cidade: "Vila Velha",
    avaliacao: 4.9,
    totalAvaliacoes: 87,
    preco: 120,
    categorias: ["Carro", "Automático"],
    especialidades: ["Primeira CNH", "Medo de Dirigir", "Reciclagem"],
    experiencia: 8,
    premium: true,
    verificado: true,
    disponivel: true,
    bio: "Instrutor com 8 anos de experiência, especialista em alunos com medo de dirigir.",
    sobre: "Sou instrutor de trânsito autônomo há 8 anos em Vila Velha. Me especializei em ajudar alunos que têm dificuldades ou medo de dirigir, criando um ambiente tranquilo e seguro para o aprendizado. Já formei mais de 200 alunos e tenho orgulho de ter uma das maiores taxas de aprovação da região.\n\nTrabalhando com veículo automático e manual, adapto o método de ensino ao ritmo de cada aluno. Ofereço aulas em Itaparica, Praia da Costa, Terra Vermelha e regiões próximas.",
    telefone: "(27) 9 9123-4567",
    alunosFormados: 214,
    aulasRealizadas: 1840,
    tempoResposta: "< 1 hora",
    taxaAprovacao: 94,
    horarios: [
      { dia: "Segunda", slots: ["07:00", "08:00", "09:00", "14:00", "15:00"] },
      { dia: "Terça",   slots: ["07:00", "08:00", "10:00", "16:00"] },
      { dia: "Quarta",  slots: ["08:00", "09:00", "14:00", "15:00", "16:00"] },
      { dia: "Quinta",  slots: ["07:00", "09:00", "10:00", "14:00"] },
      { dia: "Sexta",   slots: ["07:00", "08:00", "09:00"] },
      { dia: "Sábado",  slots: ["08:00", "09:00", "10:00"] },
    ],
    avaliacoes: [
      { nome: "Lucas Martins",  iniciais: "LM", nota: 5, texto: "Excelente instrutor! Muito paciente e didático. Consegui minha CNH na primeira tentativa graças ao João.", data: "Abril 2026" },
      { nome: "Camila Souza",   iniciais: "CS", nota: 5, texto: "Tinha muito medo de dirigir e o João foi incrível em me ajudar. Recomendo de olhos fechados!", data: "Março 2026" },
      { nome: "Rafael Gomes",   iniciais: "RG", nota: 5, texto: "Profissional de verdade. Pontual, organizado, e explica muito bem. Valeu cada centavo.", data: "Fevereiro 2026" },
      { nome: "Patrícia Lima",  iniciais: "PL", nota: 4, texto: "Muito bom instrutor. As aulas foram claras e objetivas. Recomendo!", data: "Janeiro 2026" },
    ],
  },
  {
    slug: "fernanda-lima",
    nome: "Fernanda Lima",
    iniciais: "FL",
    avatarColor: "from-violet-500 to-violet-700",
    bairro: "Praia da Costa",
    cidade: "Vila Velha",
    avaliacao: 4.8,
    totalAvaliacoes: 63,
    preco: 110,
    categorias: ["Carro", "Manual", "Automático"],
    especialidades: ["Primeira CNH", "Renovação", "Direção Defensiva"],
    experiencia: 5,
    premium: true,
    verificado: true,
    disponivel: true,
    bio: "Instrutora com foco em direção defensiva e segurança viária.",
    sobre: "Há 5 anos formando motoristas conscientes e seguros em Vila Velha. Minha abordagem é baseada em direção defensiva — ensino não apenas a passar na prova, mas a ser um motorista seguro para toda a vida.\n\nAtendo principalmente na região de Praia da Costa, Glória e Centro de Vila Velha. Tenho veículo confortável e moderno, com duplo comando para máxima segurança.",
    telefone: "(27) 9 9234-5678",
    alunosFormados: 142,
    aulasRealizadas: 980,
    tempoResposta: "< 2 horas",
    taxaAprovacao: 91,
    horarios: [
      { dia: "Segunda", slots: ["08:00", "09:00", "10:00", "15:00", "16:00"] },
      { dia: "Quarta",  slots: ["08:00", "09:00", "14:00", "15:00"] },
      { dia: "Quinta",  slots: ["09:00", "10:00", "14:00", "16:00"] },
      { dia: "Sexta",   slots: ["08:00", "09:00", "10:00", "14:00"] },
      { dia: "Sábado",  slots: ["09:00", "10:00", "11:00"] },
    ],
    avaliacoes: [
      { nome: "Ana Paula",   iniciais: "AP", nota: 5, texto: "A Fernanda é fantástica! Me ensinou muito mais do que só passar na prova. Aprendi a dirigir de verdade.", data: "Maio 2026" },
      { nome: "Bruno Costa", iniciais: "BC", nota: 5, texto: "Muito paciente e profissional. Explica com clareza e passa muita confiança. Indico a todos!", data: "Abril 2026" },
      { nome: "Juliana Reis", iniciais: "JR", nota: 4, texto: "Ótima instrutora. Fui de zero a habilitada com ela. Super recomendo.", data: "Março 2026" },
    ],
  },
  {
    slug: "ricardo-souza",
    nome: "Ricardo Souza",
    iniciais: "RS",
    avatarColor: "from-emerald-500 to-emerald-700",
    bairro: "Terra Vermelha",
    cidade: "Vila Velha",
    avaliacao: 4.7,
    totalAvaliacoes: 44,
    preco: 95,
    categorias: ["Carro", "Manual"],
    especialidades: ["Primeira CNH", "Baliza", "Estrada"],
    experiencia: 3,
    premium: false,
    verificado: true,
    disponivel: true,
    bio: "Instrutor jovem, dinâmico e com ótimo preço na região de Terra Vermelha.",
    sobre: "Instrutor desde 2023, com foco em atender a região de Terra Vermelha, Morada da Barra e adjacências. Sou o instrutor com melhor custo-benefício da região, sem abrir mão da qualidade no ensino.\n\nEspecializado em manobras (baliza, garagem, cruzamento) e direção em estrada. Atendo fins de semana sem custo adicional.",
    telefone: "(27) 9 9345-6789",
    alunosFormados: 67,
    aulasRealizadas: 520,
    tempoResposta: "< 3 horas",
    taxaAprovacao: 88,
    horarios: [
      { dia: "Terça",   slots: ["07:00", "08:00", "09:00"] },
      { dia: "Quarta",  slots: ["07:00", "08:00", "14:00", "15:00"] },
      { dia: "Quinta",  slots: ["07:00", "08:00", "09:00", "14:00"] },
      { dia: "Sexta",   slots: ["08:00", "14:00", "15:00", "16:00"] },
      { dia: "Sábado",  slots: ["08:00", "09:00", "10:00", "11:00"] },
      { dia: "Domingo", slots: ["09:00", "10:00"] },
    ],
    avaliacoes: [
      { nome: "Carlos Mendes", iniciais: "CM", nota: 5, texto: "Ricardo é muito bom! Preço justo e ensina com facilidade. Aprovei na primeira.", data: "Maio 2026" },
      { nome: "Larissa Faria", iniciais: "LF", nota: 4, texto: "Muito atencioso e explica bem as manobras. Recomendo para quem mora em Terra Vermelha.", data: "Abril 2026" },
    ],
  },
  {
    slug: "ana-paula-costa",
    nome: "Ana Paula Costa",
    iniciais: "AC",
    avatarColor: "from-rose-500 to-rose-700",
    bairro: "Coqueiral",
    cidade: "Vila Velha",
    avaliacao: 5.0,
    totalAvaliacoes: 29,
    preco: 130,
    categorias: ["Carro", "Automático"],
    especialidades: ["Medo de Dirigir", "Ansiedade", "Primeira CNH"],
    experiencia: 6,
    premium: true,
    verificado: true,
    disponivel: false,
    bio: "Especialista em alunos com ansiedade e medo de dirigir. Agenda lotada.",
    sobre: "Com 6 anos de experiência, me tornei referência no atendimento a alunos que sofrem com ansiedade ao volante. Uso técnicas de respiração e relaxamento aliadas ao ensino da direção para criar uma experiência transformadora.\n\nAtualmente trabalho exclusivamente com veículo automático, que oferece mais conforto e segurança para alunos ansiosos. Atendo na região de Coqueiral, Itapuã e Barra do Jucu.",
    telefone: "(27) 9 9456-7890",
    alunosFormados: 98,
    aulasRealizadas: 760,
    tempoResposta: "< 4 horas",
    taxaAprovacao: 96,
    horarios: [],
    avaliacoes: [
      { nome: "Mariana Torres",  iniciais: "MT", nota: 5, texto: "Tinha fobia de dirigir e a Ana Paula literalmente mudou minha vida. Incrível profissional!", data: "Maio 2026" },
      { nome: "Diego Alves",     iniciais: "DA", nota: 5, texto: "Melhor instrutora que já tive. Paciência infinita e resultado garantido.", data: "Abril 2026" },
      { nome: "Rebeca Nunes",    iniciais: "RN", nota: 5, texto: "Aprovei com 100% de aproveitamento no exame prático! Ela é sensacional.", data: "Março 2026" },
    ],
  },
  {
    slug: "carlos-oliveira",
    nome: "Carlos Oliveira",
    iniciais: "CO",
    avatarColor: "from-amber-500 to-amber-700",
    bairro: "Centro",
    cidade: "Vila Velha",
    avaliacao: 4.6,
    totalAvaliacoes: 108,
    preco: 100,
    categorias: ["Carro", "Moto", "Manual", "Automático"],
    especialidades: ["Primeira CNH", "Motocicleta", "Direção Defensiva", "Estrada"],
    experiencia: 12,
    premium: false,
    verificado: true,
    disponivel: true,
    bio: "12 anos de experiência. Único da região que ensina carro e moto.",
    sobre: "Sou um dos instrutores mais experientes de Vila Velha, com 12 anos de atuação e mais de 400 alunos formados. Sou o único instrutor autônomo da região que atende tanto habilitação para carro (categoria B) quanto motocicleta (categoria A).\n\nMinha metodologia é prática e objetiva. Foco no que realmente cai no exame e nas situações que o aluno vai encontrar no dia a dia. Atendo em todo o Centro de Vila Velha.",
    telefone: "(27) 9 9567-8901",
    alunosFormados: 412,
    aulasRealizadas: 3200,
    tempoResposta: "< 2 horas",
    taxaAprovacao: 89,
    horarios: [
      { dia: "Segunda", slots: ["06:00", "07:00", "08:00", "13:00", "14:00", "15:00"] },
      { dia: "Terça",   slots: ["06:00", "07:00", "13:00", "14:00", "15:00", "16:00"] },
      { dia: "Quarta",  slots: ["06:00", "07:00", "08:00", "13:00", "14:00"] },
      { dia: "Quinta",  slots: ["07:00", "08:00", "13:00", "14:00", "15:00"] },
      { dia: "Sexta",   slots: ["07:00", "08:00", "09:00", "13:00", "14:00"] },
    ],
    avaliacoes: [
      { nome: "Tiago Freitas",  iniciais: "TF", nota: 5, texto: "O Carlos é o melhor! Fiz habilitação de carro e moto com ele. Super recomendo!", data: "Maio 2026" },
      { nome: "Sandra Costa",   iniciais: "SC", nota: 4, texto: "Muito experiente e sabe como ensinar. Consegui minha CNH rapidinho.", data: "Abril 2026" },
      { nome: "Paulo Henrique", iniciais: "PH", nota: 5, texto: "12 anos de experiência se nota! Didática excelente.", data: "Março 2026" },
    ],
  },
  {
    slug: "mariana-torres",
    nome: "Mariana Torres",
    iniciais: "MT",
    avatarColor: "from-sky-500 to-sky-700",
    bairro: "Glória",
    cidade: "Vila Velha",
    avaliacao: 4.9,
    totalAvaliacoes: 52,
    preco: 115,
    categorias: ["Carro", "Manual", "Automático"],
    especialidades: ["Primeira CNH", "Idosos", "Reciclagem", "Direção Defensiva"],
    experiencia: 7,
    premium: true,
    verificado: true,
    disponivel: true,
    bio: "Especialista em idosos e reciclagem. Muita paciência e didática diferenciada.",
    sobre: "Há 7 anos trabalho com um público muito especial: além de jovens em busca da primeira habilitação, tenho grande experiência com idosos que querem renovar ou aprender a dirigir, e condutores que precisam de reciclagem.\n\nMinha abordagem é sempre tranquila, respeitosa e adaptada ao ritmo de cada aluno. Atendo principalmente na região da Glória, Polo Moda e adjacências.",
    telefone: "(27) 9 9678-9012",
    alunosFormados: 163,
    aulasRealizadas: 1240,
    tempoResposta: "< 1 hora",
    taxaAprovacao: 93,
    horarios: [
      { dia: "Segunda", slots: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"] },
      { dia: "Terça",   slots: ["08:00", "09:00", "10:00", "14:00", "15:00"] },
      { dia: "Quarta",  slots: ["08:00", "09:00", "14:00", "15:00", "16:00"] },
      { dia: "Quinta",  slots: ["08:00", "09:00", "10:00", "15:00", "16:00"] },
      { dia: "Sexta",   slots: ["08:00", "09:00", "10:00"] },
    ],
    avaliacoes: [
      { nome: "Sônia Almeida",   iniciais: "SA", nota: 5, texto: "Tenho 62 anos e a Mariana me deu toda a confiança para aprender. Incrível!", data: "Maio 2026" },
      { nome: "Felipe Borges",   iniciais: "FB", nota: 5, texto: "Excelente instrutora. Paciência e didática fora do comum. Aprovei na primeira!", data: "Abril 2026" },
      { nome: "Cristiane Melo",  iniciais: "CM", nota: 5, texto: "A melhor decisão foi escolher a Mariana. Confiança total desde a primeira aula.", data: "Março 2026" },
    ],
  },
];

export function getInstrutor(slug: string): Instrutor | undefined {
  return instrutores.find(i => i.slug === slug);
}

export const bairros = [...new Set(instrutores.map(i => i.bairro))].sort();
export const todasCategorias = [...new Set(instrutores.flatMap(i => i.categorias))].sort();
export const todasEspecialidades = [...new Set(instrutores.flatMap(i => i.especialidades))].sort();
