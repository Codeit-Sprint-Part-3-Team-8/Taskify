import Image from 'next/image';

export default function MyDashboardNavBar() {
  return (
    <div className="flex w-full justify-between pl-80">
      <div>내 대시보드</div>
      <div className="flex items-center">
        <Image
          width={38}
          height={38}
          src="/images/contents/default-profile.svg"
          alt="profile"
        />
        <div>사용자</div>
      </div>
    </div>
  );
}
