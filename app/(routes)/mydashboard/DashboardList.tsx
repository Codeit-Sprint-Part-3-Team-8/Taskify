'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getMyDashBoardList } from '@/api/mydashboard';
import useAsync from '@/_hooks/useAsync';

interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

const SIZE = 5;

export default function DashboardList() {
  const [page, setPage] = useState(1);
  const {
    data,
    excute: fetchDashboards,
    loading,
  } = useAsync(
    async ({ page }: { page: number }) =>
      await getMyDashBoardList('pagination', page, SIZE),
  );

  useEffect(() => {
    fetchDashboards({ page });
  }, [page]);

  const handleNextPage = () => {
    if (data?.dashboards.length === SIZE) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / SIZE) : 0;

  return (
    <div className="p-4 py-[5.25rem] pl-[5.5rem] tablet:py-[6.875rem] tablet:pl-[12.5rem] pc:py-28 pc:pl-[21.25rem]">
      <div className="max-w-5xl">
        <div className="grid grid-cols-1 grid-rows-6 gap-4 tablet:grid-cols-2 tablet:grid-rows-3 pc:grid-cols-3 pc:grid-rows-2">
          <div className="flex items-center justify-center gap-3 rounded-lg border border-gray-D9D9D9 px-14 py-5 hover:cursor-pointer">
            <p className="font-pretendard text-md font-semibold text-black-333236 tablet:text-lg">
              새로운 대시보드
            </p>
            <Image
              src="/images/icon/ic-chip.svg"
              alt="Add Dashboard"
              width={22}
              height={22}
            />
          </div>
          {!loading &&
            data?.dashboards.map((dashboard: Dashboard) => (
              <div
                key={dashboard.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-D9D9D9 px-5 py-5"
              >
                <div className="flex items-center gap-3 pc:gap-4">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: dashboard.color }}
                  ></div>
                  <p className="truncate font-pretendard text-md font-semibold text-black-333236 tablet:text-base">
                    {dashboard.title}
                  </p>
                </div>
                <Image
                  width={18}
                  height={18}
                  src="/images/icon/ic-blackarrow.svg"
                  alt="arrow"
                />
              </div>
            ))}
          {loading && <div>Loading...</div>}
        </div>
        <div className="mt-4 flex items-center justify-end gap-4 pc:mt-3">
          <div className="font-pretendard text-xs font-normal text-black-333236 tablet:text-md">{`${totalPages} 페이지 중 ${page} `}</div>
          <div>
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="rounded-md border border-gray-D9D9D9 px-2.5 py-2.5 tablet:px-3 tablet:py-3"
            >
              <Image
                width={16}
                height={16}
                src="/images/icon/ic-leftarrow-gray.svg"
                alt="leftarrow"
              />
            </button>
            <button
              onClick={handleNextPage}
              disabled={data?.dashboards.length !== SIZE}
              className="rounded-md border border-gray-D9D9D9 px-2.5 py-2.5 tablet:px-3 tablet:py-3"
            >
              <Image
                width={16}
                height={16}
                src="/images/icon/ic-rightarrow-gray.svg"
                alt="rightarrow"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
