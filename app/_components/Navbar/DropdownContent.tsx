import { useRouter } from 'next/navigation';

export default function DropdownContet() {
  const router = useRouter();

  return (
    <>
      <button
        className="block w-full border-b px-4 py-2 text-center text-sm text-black-333236 hover:bg-gray-100"
        type="button"
        onClick={() => router.push('/mypage')}
      >
        내 정보
      </button>
      <button
        className="block w-full border-b px-4 py-2 text-center text-sm text-black-333236 hover:bg-gray-100"
        type="button"
        onClick={() => router.push('/mydashboard')}
      >
        내 대시보드
      </button>
      <button
        className="block w-full px-4 py-2 text-center text-sm text-black-333236 hover:bg-gray-100"
        type="button"
        onClick={() => alert('로그아웃 클릭됨')}
      >
        로그아웃
      </button>
    </>
  );
}
