import { Geist } from "next/font/google";
import type { ReactNode } from "react";
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
    <html lang="en" className={geist.variable}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
