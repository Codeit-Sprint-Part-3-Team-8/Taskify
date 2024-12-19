'use server';

import React from 'react';
import MainContent from './MainContent';
import iconArrow from '@images/icon/icon_arrow.svg';
import Image from 'next/image';
import ModifyBox from './ModifyBox';
import { detailDashboard, UpdateDashboardReturn } from '@/api/dashboard';
import Link from 'next/link';

interface Params {
  params: {
    dashboardId: number;
  };
}

async function fetchData(dashboardId: number): Promise<UpdateDashboardReturn> {
  const res = await detailDashboard(dashboardId);
  if (!res) {
    throw new Error('Failed to fetch data');
  }
  return res;
}

export default async function Dashboard({ params }: Params) {
  const { dashboardId } = await params;
  const data = await fetchData(dashboardId);

  return (
    <>
      {/* <SideBar /> */}
      <MainContent>
        <div className="ml-3 mt-4 bg-gray-FAFAFA">
          <Link href={`/dashboard/${dashboardId}`}>
            <div className="mb-5 flex pr-1 pc:mb-9">
              <Image src={iconArrow} alt="돌아가기" width={18} height={18} />
              <div className="text-lg font-medium text-black-333236">
                돌아가기
              </div>
            </div>
          </Link>
          <ModifyBox modifyData={data} />
        </div>
      </MainContent>
    </>
  );
}
