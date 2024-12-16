import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div>
      <Link href={'/'}>
        <Image
          width={108.8}
          height={33.07}
          src="/main-logo.svg"
          alt="Taskify"
        />
      </Link>
      <button>
        <div>Dash Boards</div>
        <Image
          width={20}
          height={20}
          src="/sidebar-plusbtn.svg"
          alt="Plusbtn"
        />
      </button>
      <div>대쉬보드 목록</div>
    </div>
  );
}
