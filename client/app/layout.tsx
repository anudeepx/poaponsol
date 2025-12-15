import type { Metadata } from "next";
import { Space_Grotesk, Tiny5 } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "@/components/providers/wallet-provider";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const tiny5 = Tiny5({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-tiny5",
});

export const metadata: Metadata = {
  title: "poaponsol",
  description: "A Solana POAP-style attendance protocol on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // className={`${tiny5.variable}`}
      className={`${spaceGrotesk.variable} ${tiny5.variable}`}
    >
      <body className="font-space antialiased bg-black text-white">
        <SolanaProvider>
          <Toaster position="bottom-right" />
          {children}
        </SolanaProvider>
      </body>
    </html>
  );
}
