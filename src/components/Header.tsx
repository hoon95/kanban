import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center gap-5 pl-5 py-3 border-gray-200 border-b-[1px]">
      <Image
        src="/img/logo.png"
        width={100}
        height={50}
        alt="logo"
        priority={true}
        className="w-auto"
      />
      <div className="flex-col">
        <h3 className="text-2xl font-bold">칸반 보드</h3>
        <p className="text-sm">글로벌널리지 실무 과제 - 김다훈</p>
      </div>
    </header>
  );
}
