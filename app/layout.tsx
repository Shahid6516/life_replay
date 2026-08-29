import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Life Replay — AI Life Chronicle",
  description: "Relive every memory, reflection, and milestone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className={`dark ${bricolage.variable} ${bricolage.className}`}>
        <body className={`${bricolage.className} bg-zinc-950 text-white antialiased selection:bg-orange-500 selection:text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}