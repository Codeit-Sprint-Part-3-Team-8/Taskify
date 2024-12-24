'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import iconArrow from '@images/icon/icon_arrow.svg';
import ModifyBox from './ModifyBox';
import Link from 'next/link';
import SideBar from '@/_components/Sidebar/SideBar';
import NavBar from '@/_components/Navbar/NavBar';
import ModifyList from './ModifyList';
import { usePathname } from 'next/navigation';
import { getMemberList } from '@/api/member.api';
import { getDashboard } from '@/api/dashboards.api';
import useAsync from '@/_hooks/useAsync';

const PAGE_SIZE = 4;

export default function Dashboard() {
  const pathname = usePathname();
  const dashboardId = Number(pathname.split('/')[2]);

  const {
    data: dashboardData,
    excute: getDashboardData,
    // loading: dashboardLoading,
    // error: dashboardError,
  } = useAsync(getDashboard);

  const {
    data: memberData,
    excute: getMemberData,
    // loading: memberLoading,
    // error: memberError,
  } = useAsync(getMemberList);

  const handleClickPage = async (page: number) => {
    await getMemberData({ dashboardId, page, size: PAGE_SIZE });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getDashboardData({ dashboardId }),
          getMemberData({ dashboardId, size: PAGE_SIZE }),
        ]);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [dashboardId, getDashboardData, getMemberData]);

  return (
    <>
      <NavBar type="mydashboard" />
      <SideBar />
      <div className="sidebar-right-content">
        <div className="pl-3 pt-4">
          <Link href={`/dashboard/${dashboardId}`}>
            <div className="mb-5 flex pr-1 pc:mb-9">
              <Image src={iconArrow} alt="돌아가기" width={18} height={18} />
              <div className="text-lg font-medium text-black-333236">
                돌아가기
              </div>
            </div>
          </Link>
          <div className="flex flex-col gap-4">
            <ModifyBox modifyData={dashboardData} />
            <ModifyList memberData={memberData} onClickPage={handleClickPage} />
          </div>
        </div>
      </div>
    </>
  );
}
