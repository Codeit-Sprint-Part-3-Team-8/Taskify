'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import iconArrow from '@images/icon/icon_arrow.svg';
import ModifyBox from './ModifyBox';
import Link from 'next/link';
import SideBar from '@/_components/Sidebar/SideBar';
import NavBar from '@/_components/Navbar/NavBar';
import ModifyList from './ModifyList';
import { usePathname } from 'next/navigation';
import { deleteDashboard } from '@/api/dashboards.api';
import InviteList from './InviteList';
import Button from '@/_components/Button/Button';
import InviteModal from './InviteModal';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const dashboardId = Number(pathname.split('/')[2]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDeleteDashboard = async () => {
    await deleteDashboard({ dashboardId });
    router.push(`/mydashboard`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <NavBar type="dashboard" />
      <SideBar />
      <div className="sidebar-right-content">
        <div className="pb-32 pl-3 pt-4 tablet:pb-16 pc:pb-14">
          <Link href={`/dashboard/${dashboardId}`}>
            <div className="mb-5 flex pr-1 pc:mb-9">
              <Image src={iconArrow} alt="돌아가기" width={18} height={18} />
              <div className="text-lg font-medium text-black-333236">
                돌아가기
              </div>
            </div>
          </Link>
          <div className="flex flex-col gap-4">
            <ModifyBox dashboardId={dashboardId} />
            <ModifyList dashboardId={dashboardId} />
            <InviteList
              onClickModal={() => setIsModalOpen(true)}
              dashboardId={dashboardId}
            />
          </div>
          <div className="mx-3 pt-6">
            <Button
              className="w-full py-3 tablet:w-80"
              backgroundColor="white"
              onClick={handleDeleteDashboard}
            >
              <div className="font-pretendard text-lg font-medium text-black-333236">
                대시보드 삭제하기
              </div>
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <InviteModal dashboardId={dashboardId} onClose={handleCloseModal} />
      )}
    </>
  );
}
