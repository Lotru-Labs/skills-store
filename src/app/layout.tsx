import type { Metadata } from "next";
import "./globals.css";

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "RSI · The Robotics Skills Index",
  description: "Find, install and publish robotics skills. The RSI is a repository of software for the robotics community.",
  icons: {
    icon: '/rsi_icon.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
