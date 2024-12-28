'use client';

import { DashboardType } from '@/_types/dashboards.type';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DashboardListProps {
  dashboardList: DashboardType[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onOpenCreateModal: () => void;
  isLoading: boolean;
}

export default function DashboardList({
  dashboardList,
  totalPages,
  currentPage,
  onPageChange,
  onOpenCreateModal,
  isLoading,
}: DashboardListProps) {
  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  return (
    <div className="p-4 pl-[5.5rem] pt-[5.25rem] tablet:pl-[12.5rem] tablet:pt-[6.875rem] pc:pl-[21.25rem] pc:pt-28">
      <div className="max-w-5xl">
        <div className="pc:rows-2 grid grid-cols-1 grid-rows-6 gap-4 tablet:grid-cols-2 tablet:grid-rows-3 pc:grid-cols-3">
          <button
            type="button"
            onClick={onOpenCreateModal}
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
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full animate-pulse items-center gap-3 rounded-lg border border-gray-D9D9D9 px-5 py-5"
              >
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                <div className="flex w-full flex-col gap-3 pc:gap-4">
                  <div className="h-2 w-3/4 rounded bg-gray-300"></div>
                </div>
              </div>
            ))}

          {!isLoading &&
            dashboardList.map((dashboard) => (
              <Link
                href={`/dashboard/${dashboard.id}`}
                key={dashboard.id}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-D9D9D9 px-5 py-5"
              >
                <div className="flex w-11/12 items-center gap-3 pc:gap-4">
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
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
        </div>
        <div className="mt-4 flex items-center justify-end gap-4 pc:mt-3">
          <div className="font-pretendard text-xs font-normal text-black-333236 tablet:text-md">
            {`${totalPages} 페이지 중 ${currentPage}`}
          </div>
          <div>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
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
              disabled={currentPage === totalPages}
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
