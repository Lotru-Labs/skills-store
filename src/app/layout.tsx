import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RSI · The Robotics Skills Index",
  description: "Find, install and publish robotics skills. The RSI is a repository of software for the robotics community.",
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
      </body>
    </html>
  );
}
