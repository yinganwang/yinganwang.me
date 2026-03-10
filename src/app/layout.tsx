import type { Metadata } from "next";
import { Special_Elite, Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Personal Cards",
  description: "A minimal, collectible card-style personal site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${specialElite.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
