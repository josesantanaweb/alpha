import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { QueryProvider } from "@/modules/shared/components/QueryProvider";
import { AuthInitializer } from "@/modules/auth/components/auth-initializer";
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

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${lato.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <QueryProvider>
          <AuthInitializer />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
