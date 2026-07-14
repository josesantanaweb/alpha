import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lato } from "next/font/google";
import { QueryProvider, AuthInitializer } from "@/components/providers";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Aura",
  description: "Aura store",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <QueryProvider>
            <AuthInitializer />
            {children}
          </QueryProvider>
      </body>
    </html>
  );
}