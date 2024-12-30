'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getDashboard } from '@/api/navbar';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import DropdownMenu from './Dropdown';
import DropdownContent from './DropdownContent';
import Profile from './Profile';
import useAsync from '@/_hooks/useAsync';
import { useParams } from 'next/navigation';
import { getMemberList } from '@/api/member.api';
import InviteModal from '@/(routes)/dashboard/[dashboardId]/edit/InviteModal';

enum ScreenSize {
  LARGE = 1280,
  MEDIUM = 744,
  SMALL = 0,
}

export default function DashboardNavBar() {
  const [visibleMembers, setVisibleMembers] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth(true);
  const params = useParams();
  const id = Number(params.dashboardId);

  const { data: dashboardsData, excute: fetchDashboards } =
    useAsync(getDashboard);

  const { data: membersData, excute: fetchMembers } = useAsync(getMemberList);

  useEffect(() => {
    fetchMembers({ dashboardId: id, page: 1, size: 20 });
    fetchDashboards(id);
  }, [id, fetchMembers, fetchDashboards]);

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

  const handleOpenInviteModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseInviteModal = () => {
    setIsModalOpen(false);
  };

  const members = membersData?.members || []; //옵셔널 체이닝과 기본값(|| [])을 활용해 에러 방지

  return (
    <>
      <div className="fixed top-0 z-30 flex h-[3.75rem] w-full items-center justify-end border-b border-gray-D9D9D9 bg-white pl-[5.25rem] pr-2 tablet:h-[4.375rem] tablet:pl-[12.5rem] tablet:pr-8 pc:justify-between pc:pl-80 pc:pr-20">
        <div className="hidden w-1/3 gap-2 font-pretendard text-lg font-bold text-black-333236 pc:flex pc:text-xl">
          <div className="truncate">{dashboardsData?.title}</div>
          {dashboardsData?.createdByMe && (
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
              href={`/dashboard/${id}/edit`}
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
            <button
              onClick={handleOpenInviteModal}
              className="flex items-center justify-center rounded-md border border-gray-D9D9D9 px-3 py-1.5 font-pretendard text-md font-medium tablet:gap-2 tablet:rounded-lg tablet:py-2 pc:px-4 pc:py-2.5 pc:text-lg"
            >
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
              <div
                key={member.id}
                className="relative h-8 w-8 overflow-hidden rounded-full"
              >
                <Image
                  fill
                  src={
                    member.profileImageUrl ||
                    '/images/contents/default-profile.svg'
                  }
                  alt={`${member.nickname} 프로필`}
                  className="rounded-full border-2 border-white object-cover"
                />
              </div>
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
      {isModalOpen && (
        <InviteModal dashboardId={id} onClose={handleCloseInviteModal} />
      )}
    </>
  );
}
