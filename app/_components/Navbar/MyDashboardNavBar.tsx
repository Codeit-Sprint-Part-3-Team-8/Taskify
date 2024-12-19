'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MyDashboardNavBar() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div className="flex h-[3.75rem] w-full items-center justify-between border-b border-gray-D9D9D9 pl-[5.25rem] pr-2 tablet:h-[4.375rem] tablet:pl-[12.5rem] tablet:pr-8 pc:pl-80 pc:pr-20">
      <div className="text-lg text-black-333236 tablet:text-xl">
        내 대시보드
      </div>
      <div className="relative flex items-center" ref={dropdownRef}>
        <button
          className="flex items-center rounded-full p-1 focus:bg-gray-9FA6B2 tablet:gap-3"
          onClick={toggleDropdown}
          type="button"
        >
          <Image
            width={38}
            height={38}
            src="/images/contents/default-profile.svg"
            alt="profile"
          />
          <div className="hidden text-lg text-black-333236 tablet:block">
            사용자
          </div>
        </button>
        {isDropdownVisible && (
          <div className="absolute right-0 top-10 z-10 mt-2 w-36 rounded-md border border-gray-D9D9D9 bg-white shadow-lg">
            <button
              className="block w-full border-b px-4 py-2 text-center text-sm text-black-333236 hover:bg-gray-100"
              type="button"
              onClick={() => router.push('/mypage')}
            >
              계정 관리
            </button>
            <button
              className="block w-full px-4 py-2 text-center text-sm text-black-333236 hover:bg-gray-100"
              type="button"
              onClick={() => alert('로그아웃 클릭됨')}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
