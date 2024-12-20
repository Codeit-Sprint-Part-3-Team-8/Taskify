import Image from 'next/image';

export default function DashboardNavBar() {
  return (
    <div className="flex h-[3.75rem] w-full items-center justify-between border-b border-gray-D9D9D9 pl-[5.25rem] pr-2 tablet:h-[4.375rem] tablet:pl-[12.5rem] tablet:pr-8 pc:pl-80 pc:pr-20">
      <div className="text-lg text-black-333236 tablet:text-xl">대시보드</div>
      <button>관리</button>
      <button>초대하기</button>
      <Image
        width={38}
        height={38}
        src={'/images/contents/default-profile.svg'}
        alt={'프로필 이미지'}
        className="rounded-full"
      />
      <div className="relative flex items-center">
        <button type="button">
          <Image
            width={38}
            height={38}
            src={'/images/contents/default-profile.svg'}
            alt={'프로필 이미지'}
            className="rounded-full"
          />
          <div className="hidden text-lg text-black-333236 tablet:block">
            {'사용자'}
          </div>
        </button>
      </div>
    </div>
  );
}
