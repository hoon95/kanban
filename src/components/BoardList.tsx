import Board from "@/components/Board";

export default function BoardList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* 각 보드는 여기서 map으로 출력 */}
      <Board title="보드 1" />
      <Board title="보드 2" />
    </div>
  );
}
