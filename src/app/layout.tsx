import type { Metadata } from "next";
import { Space_Mono, Bebas_Neue } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { about } from "@/data/content";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${about.name} — Portfolio`,
  description: `Ask my AI anything about ${about.name.split(" ")[0]}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${bebasNeue.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
