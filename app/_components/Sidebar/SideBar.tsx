'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CreateDashboardModal from '@/(routes)/mydashboard/CreateDashboardModal';
import useAsync from '@/_hooks/useAsync';
import { getDashboardList } from '@/api/dashboards.api';
import { useParams } from 'next/navigation';
import SidebarSkeleton from './SideBarSkeleton';

const SIZE = 10;

export default function SideBar() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const params = useParams();
  const selectedDashboardId = Number(params.dashboardId);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);

  const { data, excute: fetchDashboards, loading } = useAsync(getDashboardList);

  useEffect(() => {
    fetchDashboards({
      navigationMethod: 'pagination',
      page,
      size: SIZE,
    });
  }, [page, fetchDashboards]);

  useEffect(() => {
    if (!loading) {
      setShowSkeleton(false);
    }
  }, [loading]);

  const handleOpenCreateModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsModalOpen(false);
  };

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

  return (
    <div className="fixed left-0 top-0 z-20 flex h-dvh w-16 flex-col gap-10 border border-r-gray-D9D9D9 bg-white px-3 py-5 tablet:w-40 tablet:gap-14 pc:w-72 pc:px-2">
      <Link
        className="flex justify-center tablet:justify-start"
        href={'/mydashboard'}
      >
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
      <div className="flex h-full w-full flex-col gap-8">
        <div className='gap-4" flex w-full flex-col gap-4'>
          <button
            onClick={handleOpenCreateModal}
            className="flex w-full items-center justify-center tablet:justify-between"
          >
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
          <div className="flex w-full flex-col gap-3.5 tablet:gap-0.5 pc:gap-2">
            {!loading && data?.dashboards?.length ? (
              data.dashboards.map((dashboard) => (
                <Link
                  href={`/dashboard/${dashboard.id}`}
                  key={dashboard.id}
                  className="flex w-full items-center justify-center gap-4 rounded p-4 tablet:justify-start tablet:gap-2.5 tablet:px-3 tablet:py-2"
                  style={{
                    backgroundColor:
                      dashboard.id === selectedDashboardId
                        ? '#F1EFFD'
                        : 'transparent',
                  }}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
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
                </Link>
              ))
            ) : (
              <div></div>
            )}
            {showSkeleton && <SidebarSkeleton />}
          </div>
        </div>
        <div className="hidden tablet:block">
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
        {isModalOpen && (
          <CreateDashboardModal onClose={handleCloseCreateModal} />
        )}
      </div>
    </div>
  );
}
