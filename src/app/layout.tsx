"use client";

import type { Metadata } from "next";
import "@/styles/globals.css";
import { scan } from "react-scan";

if (process.env.NODE_ENV === "development") {
  scan({
    enabled: true,
    log: true,
  });
}

// export const metadata: Metadata = {
//   title: "칸반 보드",
//   description: "업무의 효율을 증진시키기 위한 칸반 형태의 To-Do List",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body>{children}</body>
    </html>
  );
}
