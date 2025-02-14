import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-center bg-blue-600 p-3 text-white">
      <Image src="/img/logo.png" width={100} height={100} alt={"logo"} />
    </header>
  );
}
