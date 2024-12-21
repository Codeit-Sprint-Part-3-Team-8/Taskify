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
    <div className="p-4 py-28 pl-[5.5rem] tablet:pl-[12.5rem] pc:pl-[21.25rem]">
      <div className="grid grid-cols-1 grid-rows-6 gap-4 tablet:grid-cols-2 tablet:grid-rows-3 pc:grid-cols-3 pc:grid-rows-2">
        <div className="flex items-center justify-center gap-3 rounded-lg border border-gray-D9D9D9 px-14 py-4 hover:cursor-pointer">
          <p className="text-sm text-black-333236">새로운 대시보드</p>
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
              className="flex items-center justify-center gap-3 rounded-lg border border-gray-D9D9D9 px-14 py-4"
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: dashboard.color }}
              ></div>
              <p className="truncate text-sm text-black-333236">
                {dashboard.title}
              </p>
            </div>
          ))}

        {loading && <div>Loading...</div>}
      </div>

      <div className="mt-4 flex justify-between">
        <div>{`${totalPages} 페이지 중 ${page} `}</div>
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="rounded-md border border-gray-D9D9D9 px-4 py-2"
        >
          <Image
            width={20}
            height={20}
            src="/images/icon/ic-leftarrow-gray.svg"
            alt="leftarrow"
          />
        </button>
        <button
          onClick={handleNextPage}
          disabled={data?.dashboards.length !== SIZE}
          className="rounded-md border border-gray-D9D9D9 px-4 py-2"
        >
          <Image
            width={20}
            height={20}
            src="/images/icon/ic-rightarrow-gray.svg"
            alt="rightarrow"
          />
        </button>
      </div>
    </div>
  );
}
