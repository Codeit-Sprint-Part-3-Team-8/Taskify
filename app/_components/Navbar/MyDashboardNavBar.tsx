'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import DropdownMenu from './Dropdown';
import Profile from './Profile';
import DropdownContet from './DropdownContent';

export default function MyDashboardNavBar() {
  const { user } = useAuth();

  return (
    <div className="flex h-[3.75rem] w-full items-center justify-between border-b border-gray-D9D9D9 pl-[5.25rem] pr-2 tablet:h-[4.375rem] tablet:pl-[12.5rem] tablet:pr-8 pc:pl-80 pc:pr-20">
      <div className="text-lg text-black-333236 tablet:text-xl">
        내 대시보드
      </div>
      <div className="relative flex items-center">
        <DropdownMenu
          trigger={
            <Profile
              profileImageUrl={user?.profileImageUrl}
              nickname={user?.nickname}
            />
          }
        >
          <DropdownContet />
        </DropdownMenu>
      </div>
    </div>
  );
}
