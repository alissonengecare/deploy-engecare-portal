'use client';

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ColorModeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Metadata foi removida daqui pois não pode ser exportada de um client component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SessionProvider>
          <ColorModeProvider>
            {children}
          </ColorModeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
