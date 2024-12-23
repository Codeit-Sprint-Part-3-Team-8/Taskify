'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import iconArrow from '@images/icon/icon_arrow.svg';
import ModifyBox from './ModifyBox';
import Link from 'next/link';
import SideBar from '@/_components/Sidebar/SideBar';
import NavBar from '@/_components/Navbar/NavBar';
import ModifyList from './ModifyList';
import { DashboardType } from '@/_types/dashboards.type';
import { MemberListType } from '@/_types/members.type';
import { usePathname } from 'next/navigation';
import { deleteMember, getMemberList } from '@/api/member.api';
import { getDashboard } from '@/api/dashboards.api';
import useAsync from '@/_hooks/useAsync';

export default function Dashboard() {
  const pathname = usePathname();
  const dashboardId = Number(pathname.split('/')[2]);
  const [dashboardData, setDashboardData] = useState<DashboardType | null>(
    null,
  );
  const [memberData, setMemberData] = useState<MemberListType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: memberDataAsync, excute: deleteMemberAsync } =
    useAsync(deleteMember);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const dashboardResponse = await getDashboard({ dashboardId });
      setDashboardData(dashboardResponse || []);

      const memberResponse = await getMemberList({ dashboardId });
      setMemberData(memberResponse || []);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching data', err);
      setError('Error fetching data');
      setLoading(false);
    }
  }, [dashboardId]);

  useEffect(() => {
    if (!dashboardId) return;

    fetchData();
  }, [dashboardId, fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!dashboardData || !memberData) {
    return <div>Not Found</div>;
  }

  const handleRemoveMember = async (memberId: number) => {
    await deleteMemberAsync({ memberId: memberId });
    fetchData();
    console.log(memberDataAsync);
  };

  return (
    <>
      <NavBar type="mydashboard" />
      <SideBar />
      <div className="dashboard-content">
        <div className="bg-gray-FAFAFA pl-3 pt-4">
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
            <ModifyList
              memberData={memberData}
              onClickRemoveMember={handleRemoveMember}
            />
          </div>
        </div>
      </div>
    </>
  );
}
