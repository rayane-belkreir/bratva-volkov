import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { PendingStatusBanner } from "@/components/PendingStatusBanner";
import { WelcomeGuideProvider } from "@/components/WelcomeGuideProvider";
import { DatabaseInitializer } from "@/components/DatabaseInitializer";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bratva Volkov - RP Mafia Russe",
  description: "Serveur RP GTA centré sur une famille mafieuse russe. Family. Honor. Respect.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="font-cinzel flex flex-col min-h-screen">
        <DatabaseInitializer />
        <AuthProvider>
          <WelcomeGuideProvider>
            <Header />
            <PendingStatusBanner />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </WelcomeGuideProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
