'use client';

import Image from 'next/image';
import Link from 'next/link';
import instance from '@/api/axios';
import { useEffect, useState } from 'react';

interface DashBoard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

interface DashBoardResponse {
  dashboards: DashBoard[];
  totalCount: number;
  cursorId: number | null;
}


export default function SideBar() {
  const [myDashBoards, setMyDashBoards] = useState<DashBoard[]>([]);

  async function getMyDashBoardList() {
    try {
      const response = await instance.get<DashBoardResponse>(
        `/dashboards?navigationMethod=pagination`
      );

      setMyDashBoards(response.data.dashboards || []);
    } catch (error) {
      console.error('내 대시보드를 불러오는데 실패했습니다.', error);
    }
  }

  useEffect(() => {
    getMyDashBoardList();
  }, []);

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-16 flex-col gap-10 border border-r-gray-D9D9D9 bg-white px-3 py-5 tablet:w-40 tablet:gap-14 pc:w-72 pc:px-2">
      <Link className="flex justify-center tablet:justify-start" href={'/'}>
        <Image
          width={28.82}
          height={33.07}
          src="/images/logo/logo-image.svg"
          alt="Taskify"
        />
        <Image
          className="hidden tablet:block"
          width={80}
          height={22}
          src="/images/logo/logo-text.svg"
          alt="Taskify"
        />
      </Link>
      <div className="flex h-full w-full flex-col gap-4">
        <button className="flex w-full items-center justify-center tablet:justify-between">
          <div className="hidden text-xs text-gray-787486 tablet:block">
            Dash Boards
          </div>
          <Image
            width={20}
            height={20}
            src="/images/icon/ic-plusbtn.svg"
            alt="Plusbtn"
          />
        </button>
        <div className="flex h-full w-full flex-col gap-3.5 tablet:gap-0.5 pc:gap-2">
          {myDashBoards.length > 0 &&
            myDashBoards.map((dashboard) => (
              <div
                key={dashboard.id}
                className="flex w-full items-center justify-center gap-4 rounded p-4 tablet:justify-start tablet:gap-2.5 tablet:px-3 tablet:py-2"
              >
                <span
                  className="sh h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: dashboard.color }}
                />
                <div className="hidden w-full text-gray-787486 tablet:flex tablet:gap-1 tablet:text-base pc:gap-1.5">
                  <div className="w-0 flex-1 truncate">{dashboard.title}</div>
                  {dashboard.createdByMe && (
                    <Image
                      width={17.59}
                      height={14}
                      src="/images/icon/ic-crown.svg"
                      alt="CrownIcon"
                    />
                  )}
                </div>
              </div>
            ))}
          {myDashBoards.length === 0 && <div></div>}
        </div>
      </div>
    </div>
  );
}
