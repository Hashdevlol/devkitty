import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DevKitty - PumpFun Dev Wallet Analyzer",
  description: "Track top PumpFun developer wallets by profit. Analyze launches, success rates, and creator fees with our cat-themed analytics platform.",
  keywords: ["PumpFun", "Solana", "DEV", "Analytics", "Crypto", "Wallet", "Trading"],
  authors: [{ name: "DevKitty" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>© 2026 DevKitty. Built with 💜 for the PumpFun community.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}