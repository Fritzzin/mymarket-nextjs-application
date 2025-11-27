import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Market",
  description: "Example Project for a fictional market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
