import Image from "next/image";

export default function SignUp() {
  return (
    <div>
      <header>
        <Image width={200} height={280} src="/logo-main.svg" alt="Taskify" />
        <span>첫 방문을 확영합니다!</span>
      </header>
    </div>
  );
}
