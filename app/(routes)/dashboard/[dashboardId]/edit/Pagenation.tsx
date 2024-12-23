import Image from 'next/image';
import React from 'react';
import iconArrow from '@images/icon/icon_arrow.svg';

export default function Pagenation() {
  return (
    <div className="flex items-center gap-4">
      <div>1 페이지 중 1</div>
      <div className="flex">
        <div className="w-9 rounded-bl-[0.6rem] rounded-tl-[0.6rem] border border-gray-D9D9D9 p-[0.6rem]">
          <Image
            src={iconArrow}
            className="text-gray-D9D9D9"
            alt="돌아가기"
            width={16}
            height={16}
          />
        </div>
        <div className="w-9 scale-x-[-1] transform rounded-bl-[0.6rem] rounded-tl-[0.6rem] border border-gray-D9D9D9 p-[0.6rem]">
          <Image
            src={iconArrow}
            className="text-gray-D9D9D9"
            alt="돌아가기"
            width={16}
            height={16}
          />
        </div>
      </div>
    </div>
  );
}
