import Image from 'next/image';
import Link from 'next/link';

export default function AuthHeader() {
  return (
    <header className="mb-7 flex select-none flex-col items-center justify-center">
      <Link href="/">
        <Image
          width={200}
          height={280}
          src="/images/logo/logo-main.svg"
          alt="Taskify"
        />
      </Link>
      <span className="text-xl font-medium text-black-333236">
        첫 방문을 환영합니다!
      </span>
    </header>
  );
}
