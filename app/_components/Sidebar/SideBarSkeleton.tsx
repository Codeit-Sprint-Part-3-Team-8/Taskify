import React from 'react';

export default function SidebarSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3.5 tablet:gap-0.5 pc:gap-2">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="flex w-full animate-pulse items-center justify-center gap-4 rounded p-4 tablet:justify-start tablet:gap-2.5 tablet:px-3 tablet:py-2"
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-gray-300" />
          <div className="hidden w-full tablet:flex tablet:gap-1 tablet:text-base pc:gap-1.5">
            <div className="h-4 w-full flex-1 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
