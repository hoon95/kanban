import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "칸반 보드",
  description: "업무의 효율을 증진시키기 위한 칸반 형태의 To-Do List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
