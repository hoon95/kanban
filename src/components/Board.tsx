import TaskCard from "@/components/TaskCard";

type BoardProps = {
  title: string;
};

export default function Board({ title }: BoardProps) {
  return (
    <div className="bg-gray-100 rounded-md p-4 shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-4">
        {/* 할 일 목록이 여기에 나열될 것 */}
        <TaskCard text="할 일 1" />
        <TaskCard text="할 일 2" />
      </div>
    </div>
  );
}
