'use client';

import Image from 'next/image';

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4 py-28 pl-16 tablet:pl-40 pc:pl-[21.25rem]">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-300 p-4 hover:cursor-pointer">
        <Image
          src="/images/sidebar-plusbtn.svg"
          alt="Add Dashboard"
          width={30}
          height={30}
        />
        <p className="mt-2 text-sm text-gray-600">새로운 대시보드 추가</p>
      </div>
    </div>
  );
}
