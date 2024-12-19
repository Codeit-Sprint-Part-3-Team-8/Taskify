import Link from 'next/link';
import Image from 'next/image';

export default function HomeNavBar() {
  return (
    <nav className="flex h-[3.75rem] w-full justify-between gap-2.5 bg-black-000000 px-6 py-4 tablet:h-[4.375rem] tablet:px-10 pc:px-20">
      <Link href="/" className="flex">
        <Image
          width={35}
          height={35}
          src="/images/logo/logo-image-white.svg"
          alt="logoImage"
        />
        <Image
          className="hidden tablet:block"
          width={80}
          height={22}
          src="/images/logo/logo-text-white.svg"
          alt="logoText"
        />
      </Link>
      <ul className="flex items-center justify-center gap-6 tablet:gap-9">
        <li>
          <Link className="text-sm text-white tablet:text-base" href="/login">
            로그인
          </Link>
        </li>
        <li>
          <Link className="text-sm text-white tablet:text-base" href="/signup">
            회원가입
          </Link>
        </li>
      </ul>
    </nav>
  );
}
