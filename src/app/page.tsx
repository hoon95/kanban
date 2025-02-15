"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";

const BoardList = dynamic(() => import("@/components/BoardList"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <Header />
      <BoardList />
    </div>
  );
}
