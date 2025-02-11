export default function Home() {
  return (
    <div className="h-screen flex gap-10 justify-center items-center">
      <ul className="flex flex-col items-center text-sm mb-5">
        <li className="text-2xl">To-Do 보드</li>
        <li>보드를 생성할 수 있어야 합니다.</li>
        <li>보드를 수정할 수 있어야 합니다.</li>
        <li>보드를 삭제할 수 있어야 합니다.</li>
        <li>보드를 할 수 있어야 합니다.</li>
      </ul>
      <ul className="flex flex-col items-center text-sm">
        <li className="text-2xl">To-Do 할일</li>
        <li>할 일은, 하나의 텍스트 박스를 가집니다</li>
        <li>보드 안에서, 할 일을 생성할 수 있어야 합니다.</li>
        <li>보드 안에서, 할 일을 삭제할 수 있어야 합니다.</li>
        <li>보드 안에서, 할 일의 내용을 수정할 수 있어야 합니다.</li>
        <li>할 일의 위치를 변경할 수 있어야 한다.</li>
        <li>(보드간의 할 일 위치, 보드 내에서의 할 일 위치)</li>
      </ul>
    </div>
  );
}
