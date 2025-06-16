import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@src/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopCart - E-commerce Moderno",
  description: "Plataforma de e-commerce com carrinho avançado, desenvolvida com Next.js 15 e TypeScript",
  keywords: ["e-commerce", "carrinho", "compras", "produtos", "Next.js"],
  authors: [{ name: "ShopCart Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
