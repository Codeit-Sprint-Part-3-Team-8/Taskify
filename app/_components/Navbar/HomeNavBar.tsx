import Link from 'next/link';
import Image from 'next/image';

export default function HomeNavBar() {
  return (
    <div className="bg-black-000000">
      <Image
        width={35}
        height={35}
        src="/images/logo/logo-image-white.svg"
        alt="logoImage"
      />
      <Image
        width={80}
        height={22}
        src="/images/logo/logo-text-white.svg"
        alt="logoText"
      />
      <ul>
        <li>
          <Link href="/login">로그인</Link>
        </li>
        <li>
          <Link href="/signup">회원가입</Link>
        </li>
      </ul>
    </div>
  );
}
