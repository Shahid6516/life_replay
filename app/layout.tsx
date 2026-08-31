import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

export const dynamic = "force-dynamic";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Life Replay — AI Life Chronicle",
  description: "Relive every memory, reflection, and milestone.",
  icons: {
    icon: "/logo.png" , 
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${bricolage.variable} ${bricolage.className}`}
    >
      <body
        className={`${bricolage.className} bg-[#070709] text-white antialiased selection:bg-orange-500 selection:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}