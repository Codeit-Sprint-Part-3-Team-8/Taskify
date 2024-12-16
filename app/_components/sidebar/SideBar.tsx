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

const ACCESSTOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDk1OCwidGVhbUlkIjoiMTEtOCIsImlhdCI6MTczNDMzMTY1OSwiaXNzIjoic3AtdGFza2lmeSJ9.NUwX8wxDLIx4GWjslfJYQ-jaxA0AsSLSZXcmK9r0sog';

export default function Sidebar() {
  const [myDashBoards, setMyDashBoards] = useState<DashBoard[]>([]);

  async function getMyDashBoardList() {
    try {
      const response = await instance.get<DashBoardResponse>(
        `11-8/dashboards?navigationMethod=pagination`,
        {
          headers: {
            Authorization: `Bearer ${ACCESSTOKEN}`,
          },
        },
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
    <div>
      <Link href={'/'}>
        <Image
          width={108.8}
          height={33.07}
          src="/main-logo.svg"
          alt="Taskify"
        />
      </Link>
      <button>
        <div>Dash Boards</div>
        <Image
          width={20}
          height={20}
          src="/sidebar-plusbtn.svg"
          alt="Plusbtn"
        />
      </button>
      <div>
        {myDashBoards.length > 0 ? (
          myDashBoards.map((dashboard) => (
            <div key={dashboard.id}>
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: dashboard.color }}
              ></div>
              {dashboard.title}
              {dashboard.createdByMe ? (
                <Image
                  width={17.59}
                  height={14}
                  src="/ic-crown.svg"
                  alt="CrownIcon"
                />
              ) : (
                <div></div>
              )}
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
