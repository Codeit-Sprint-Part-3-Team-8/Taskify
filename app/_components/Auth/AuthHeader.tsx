import Image from 'next/image';
import Link from 'next/link';

export default function AuthHeader({ text }: { text: string }) {
  return (
    <header className="mb-7 flex select-none flex-col items-center justify-center">
      <Link href="/">
        <Image
          width={200}
          height={280}
          sizes="100%, 100%, 100%, 100%"
          src="/images/logo/logo-main.svg"
          alt="Taskify"
        />
      </Link>
      <span className="text-xl font-medium text-black-333236">{text}</span>
    </header>
  );
}
