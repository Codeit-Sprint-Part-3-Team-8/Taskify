'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getDashboard, getMember } from '@/api/navbar';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import DropdownMenu from './Dropdown';
import DropdownContent from './DropdownContent';
import Profile from './Profile';

interface Member {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
}

interface DashBoard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

enum ScreenSize {
  LARGE = 1280,
  MEDIUM = 744,
  SMALL = 0,
}

export default function DashboardNavBar() {
  const BOARD_ID = 12827; // board id를 상수로 선언해 이용 후에 /dashboard/id 페이지 생성 후 수정 예정
  const [dashboard, setDashboard] = useState<DashBoard>();
  const [members, setMembers] = useState<Member[]>([]);
  const [visibleMembers, setVisibleMembers] = useState(2);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const dashboard = await getDashboard(BOARD_ID);
        setDashboard(dashboard);
      } catch (error) {
        console.error('대시보드 정보를 가져오는데 실패했습니다:', error);
      }
    }
    fetchDashboardData();
  }, [BOARD_ID]);

  useEffect(() => {
    async function fetchMemberData() {
      try {
        const memberData = await getMember(BOARD_ID);
        setMembers(memberData || []);
      } catch (error) {
        console.error('멤버 정보를 가져오는데 실패했습니다:', error);
      }
    }
    fetchMemberData();
  }, [BOARD_ID]);

  useEffect(() => {
    const getVisibleMembers = (): number => {
      const screenSize: number = window.innerWidth;

      if (screenSize >= ScreenSize.LARGE) return 4;
      if (screenSize >= ScreenSize.MEDIUM) return 3;
      return 2;
    };

    setVisibleMembers(getVisibleMembers());

    const handleResize = () => {
      setVisibleMembers(getVisibleMembers());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed top-0 flex h-[3.75rem] w-full items-center justify-end border-b border-gray-D9D9D9 pl-[5.25rem] pr-2 tablet:h-[4.375rem] tablet:pl-[12.5rem] tablet:pr-8 pc:justify-between pc:pl-80 pc:pr-20">
      <div className="hidden gap-2 font-pretendard text-lg font-bold text-black-333236 pc:flex pc:text-xl">
        {dashboard?.title}
        {dashboard?.createdByMe && (
          <Image
            width={20}
            height={20}
            src="/images/icon/ic-crown.svg"
            alt="CrownIcon"
          />
        )}
      </div>

      <div className="flex items-center gap-2 tablet:gap-6 pc:gap-10">
        <div className="flex items-center gap-1.5 tablet:gap-3 pc:gap-4">
          <Link
            href={`/dashboard/${BOARD_ID}/edit`}
            className="flex items-center justify-center rounded-md border border-gray-D9D9D9 px-3 py-1.5 font-pretendard text-md font-medium tablet:gap-2 tablet:rounded-lg tablet:py-2 pc:px-4 pc:py-2.5 pc:text-lg"
          >
            <Image
              width={20}
              height={20}
              src={'/images/icon/ic-setting.svg'}
              alt="setting"
              className="hidden tablet:block"
            />
            관리
          </Link>
          <button className="flex items-center justify-center rounded-md border border-gray-D9D9D9 px-3 py-1.5 font-pretendard text-md font-medium tablet:gap-2 tablet:rounded-lg tablet:py-2 pc:px-4 pc:py-2.5 pc:text-lg">
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

        <div className="flex items-center -space-x-3">
          {members.slice(0, visibleMembers).map((member) => (
            <Image
              key={member.id}
              width={32}
              height={32}
              src={
                member.profileImageUrl || '/images/contents/default-profile.svg'
              }
              alt={`${member.nickname} 프로필`}
              className="rounded-full border-2 border-white"
            />
          ))}
          {members.length > visibleMembers && (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-D9D9D9 text-xs font-medium text-black-333236">
              +{members.length - visibleMembers}
            </span>
          )}
        </div>
        <div className="relative flex items-center border-l border-gray-D9D9D9 pl-4 pc:pl-9">
          <DropdownMenu
            trigger={
              <Profile
                profileImageUrl={user?.profileImageUrl}
                nickname={user?.nickname}
              />
            }
          >
            <DropdownContent />
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
