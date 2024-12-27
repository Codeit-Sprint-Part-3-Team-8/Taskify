'use client';

import React from 'react';

export default function InvitationSkeleton() {
  return (
    <>
      <div className="hidden animate-pulse tablet:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-F7F8FA text-left text-sm font-medium text-gray-787486 tablet:text-md">
              <th className="bg-gray-300 px-6 py-3"></th>
              <th className="bg-gray-300 px-6 py-3"></th>
              <th
                className="bg-gray-300 px-6 py-3 text-center"
                colSpan={2}
              ></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr
                key={index}
                className="animate-pulse border-b border-gray-EEEEEE text-md"
              >
                <td className="px-6 py-4">
                  <div className="h-4 w-3/4 rounded bg-gray-300"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-1/2 rounded bg-gray-300"></div>
                </td>
                <td className="px-6 py-4 text-center" colSpan={2}>
                  <div className="flex justify-center gap-2">
                    <div className="h-8 w-16 rounded bg-gray-300"></div>
                    <div className="h-8 w-16 rounded bg-gray-300"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3.5 px-3.5 py-3.5 tablet:hidden">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3.5 border-b border-gray-EEEEEE bg-white p-4"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-6">
                <div className="h-4 w-12 rounded bg-gray-300"></div>
                <div className="h-4 w-32 rounded bg-gray-300"></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-4 w-12 rounded bg-gray-300"></div>
                <div className="h-4 w-32 rounded bg-gray-300"></div>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="h-8 w-1/2 rounded bg-gray-300"></div>
              <div className="h-8 w-1/2 rounded bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
