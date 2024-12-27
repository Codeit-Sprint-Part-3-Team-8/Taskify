import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DropdownContent() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <Link
        className="block w-full border-b px-4 py-2 text-center text-md text-black-333236 hover:bg-gray-100"
        href="/mypage"
      >
        내 정보
      </Link>
      <Link
        className="block w-full border-b px-4 py-2 text-center text-md text-black-333236 hover:bg-gray-100"
        href="/mydashboard"
      >
        내 대시보드
      </Link>
      <button
        className="block w-full px-4 py-2 text-center text-md text-black-333236 hover:bg-gray-100"
        type="button"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </>
  );
}
