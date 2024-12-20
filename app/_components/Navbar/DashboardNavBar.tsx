import Image from 'next/image';

export default function DashboardNavBar() {
  return (
    <div className="flex h-[3.75rem] w-full items-center justify-between border-b border-gray-D9D9D9 pl-[5.25rem] pr-2 tablet:h-[4.375rem] tablet:pl-[12.5rem] tablet:pr-8 pc:pl-80 pc:pr-20">
      <div className="font-pretendard text-lg font-bold text-black-333236 tablet:text-xl">
        대시보드
      </div>
      <div className="flex items-center gap-4 tablet:gap-8 pc:gap-10">
        <div className="flex items-center gap-1.5 tablet:gap-3 pc:gap-4">
          <button className="font-pretendard flex items-center justify-center rounded-md border border-gray-D9D9D9 px-3 py-1.5 font-medium tablet:gap-2 tablet:rounded-lg tablet:px-4 tablet:py-2 pc:py-2.5">
            <Image
              width={20}
              height={20}
              src={'/images/icon/ic-setting.svg'}
              alt="setting"
              className="hidden tablet:block"
            />
            관리
          </button>
          <button className="font-pretendard flex items-center justify-center rounded-md border border-gray-D9D9D9 px-3 py-1.5 font-medium tablet:gap-2 tablet:rounded-lg tablet:px-4 tablet:py-2 pc:py-2.5">
            <Image
              width={20}
              height={20}
              src={'/images/icon/ic-plusbtn.svg'}
              alt="plus"
              className="hidden tablet:block"
            />
            초대하기
          </button>
        </div>
        <Image
          width={38}
          height={38}
          src={'/images/contents/default-profile.svg'}
          alt={'프로필 이미지'}
          className="rounded-full"
        />
        <div className="relative flex items-center border-l border-gray-D9D9D9 pl-4 pc:pl-9">
          <button
            type="button"
            className="flex items-center rounded-full p-1 tablet:gap-3"
          >
            <Image
              width={38}
              height={38}
              src={'/images/contents/default-profile.svg'}
              alt={'프로필 이미지'}
              className="rounded-full"
            />
            <div className="font-pretendard hidden text-lg font-medium text-black-333236 tablet:block">
              {'사용자'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
