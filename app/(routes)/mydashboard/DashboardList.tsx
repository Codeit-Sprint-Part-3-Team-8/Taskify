'use client';

import Image from 'next/image';

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 grid-rows-6 gap-4 p-4 py-28 pl-[5.5rem] tablet:grid-cols-2 tablet:grid-rows-3 tablet:pl-[12.5rem] pc:grid-cols-3 pc:grid-rows-2 pc:pl-[21.25rem]">
      <div className="flex items-center justify-center gap-3 rounded-lg border border-gray-D9D9D9 px-14 py-4 hover:cursor-pointer">
        <p className="text-sm text-black-333236">새로운 대시보드</p>
        <Image
          src="/images/icon/ic-chip.svg"
          alt="Add Dashboard"
          width={22}
          height={22}
        />
      </div>
    </div>
  );
}
