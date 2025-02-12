type TaskCardProps = {
  text: string;
};

export default function TaskCard({ text }: TaskCardProps) {
  return (
    <div className="bg-white p-4 mb-2 rounded-md shadow-sm">
      <p>{text}</p>
      <button className="text-red-500 mt-2">삭제</button>
    </div>
  );
}
