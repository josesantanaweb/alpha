import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import { QueryProvider } from "@/modules/shared/components/QueryProvider";
import { AuthInitializer } from "@/modules/auth/components/auth-initializer";
import { PushNotificationManager } from "@/modules/push/components/push-notification-manager";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Aura",
  description: "Aura store",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Aura",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0E",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={`${lato.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <QueryProvider>
          <AuthInitializer />
          <PushNotificationManager />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
