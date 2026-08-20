import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "@/src/components/providers";
import { Devtools } from "@/src/components/providers/devtools";
import "@/src/styles/app.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          {children}
          {process.env.NODE_ENV === "development" && <Devtools />}
        </Providers>
      </body>
    </html>
  );
}
