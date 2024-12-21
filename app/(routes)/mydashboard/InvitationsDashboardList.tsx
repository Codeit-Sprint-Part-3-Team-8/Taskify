'use client';

import Image from 'next/image';

export default function InvitationsDashboardList() {
  return (
    <div className="w-full pl-[5.5rem] tablet:pl-[12.5rem] pc:pl-[21.25rem]">
      <div className="tablet:pb-30 flex flex-col gap-[6.5625rem] px-5 pb-20 pt-6 tablet:gap-16 tablet:px-10 pc:gap-16 pc:pb-[7.5rem]">
        <h1 className="font-pretendard text-md font-bold text-black-333236 tablet:text-2xl">
          초대받은 대시보드
        </h1>
        <div className="flex flex-col items-center">
          <div className="relative h-[3.75rem] w-[3.75rem] tablet:h-[6.25rem] tablet:w-[6.25rem]">
            <Image fill src="/images/icon/ic-invite.svg" alt="invitations" />
          </div>
          <p className="font-pretendard text-xs font-normal text-gray-9FA6B2 tablet:text-lg">
            아직 초대받은 대시보드가 없어요
          </p>
        </div>
      </div>
    </div>
  );
}
