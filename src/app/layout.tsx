import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lato } from "next/font/google";
import { AppLayout } from "@/components/layout";
import { QueryProvider } from "@/components/providers";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"], 
});

export const metadata: Metadata = {
  title: "Alpha",
  description: "Alpha store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <QueryProvider>
          <AppLayout>{children}</AppLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
