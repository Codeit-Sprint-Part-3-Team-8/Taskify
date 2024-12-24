'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getDashboardList } from '@/api/dashboards.api';
import useAsync from '@/_hooks/useAsync';
import Link from 'next/link';
import CreateDashboardModal from './CreateDashboardModal';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const {
    data,
    excute: fetchDashboards,
    loading,
  } = useAsync(
    async ({ page }: { page: number }) =>
      await getDashboardList({
        navigationMethod: 'pagination',
        page,
        size: SIZE,
      }),
  );

  useEffect(() => {
    fetchDashboards({ page });
  }, [page]);

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / SIZE) : 0;

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleOpenCreateModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 pl-[5.5rem] pt-[5.25rem] tablet:pl-[12.5rem] tablet:pt-[6.875rem] pc:pl-[21.25rem] pc:pt-28">
      <div className="max-w-5xl">
        <div className="grid grid-cols-1 grid-rows-6 gap-4 tablet:grid-cols-2 tablet:grid-rows-3 pc:grid-cols-3 pc:grid-rows-2">
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="flex items-center justify-center gap-3 rounded-lg border border-gray-D9D9D9 px-14 py-5 hover:cursor-pointer"
          >
            <p className="font-pretendard text-md font-semibold text-black-333236 tablet:text-lg">
              새로운 대시보드
            </p>
            <Image
              src="/images/icon/ic-chip.svg"
              alt="Add Dashboard"
              width={22}
              height={22}
            />
          </button>
          {!loading &&
            data?.dashboards.map((dashboard: Dashboard) => (
              <Link
                href={`/dashboard/${dashboard.id}`}
                key={dashboard.id}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-D9D9D9 px-5 py-5"
              >
                <div className="flex w-11/12 items-center gap-3 pc:gap-4">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: dashboard.color }}
                  ></div>
                  <p className="truncate font-pretendard text-md font-semibold text-black-333236 tablet:text-base">
                    {dashboard.title}
                  </p>
                  {dashboard.createdByMe && (
                    <Image
                      width={18}
                      height={18}
                      src="/images/icon/ic-crown.svg"
                      alt="crown"
                    />
                  )}
                </div>
                <Image
                  width={18}
                  height={18}
                  src="/images/icon/ic-blackarrow.svg"
                  alt="arrow"
                />
              </Link>
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
      {isModalOpen && <CreateDashboardModal onClose={handleCloseCreateModal} />}
    </div>
  );
}
