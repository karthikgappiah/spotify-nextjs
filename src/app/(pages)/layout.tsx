import type { ReactNode } from "react";
import "@/src/styles/app.css";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
