import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";

export const metadata: Metadata = {
  title: "L'Arbre de la Photographie Universelle",
  description: "Formation Holistique, Gamifiée et Intelligente",
};

import { UnifiedHeader } from "@/components/layout/UnifiedHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <AuthProvider>
          <UnifiedHeader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
