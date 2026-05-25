import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PoloInstrutor | Gerencie Alunos e Aulas em Vila Velha",
  description: "A plataforma completa para instrutores de trânsito autônomos crescerem profissionalmente em Vila Velha. Receba mais alunos, gerencie sua agenda e construa sua reputação online.",
  keywords: [
    "instrutor de trânsito Vila Velha",
    "aulas de direção Vila Velha",
    "instrutor particular CNH",
    "instrutor autônomo Vila Velha",
    "aulas de direção ES",
    "CNH Vila Velha",
  ],
  authors: [{ name: "PoloInstrutor" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "PoloInstrutor | Vila Velha",
    description: "Gerencie alunos, agenda e construa sua reputação como instrutor autônomo em Vila Velha.",
    siteName: "PoloInstrutor",
  },
  twitter: {
    card: "summary_large_image",
    title: "PoloInstrutor",
    description: "A plataforma completa para instrutores de trânsito autônomos em Vila Velha.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
