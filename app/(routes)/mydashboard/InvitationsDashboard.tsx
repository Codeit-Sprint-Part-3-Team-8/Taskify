'use client';

import Image from 'next/image';
import useAsync from '@/_hooks/useAsync';
import { InvitationType } from '@/_types/invitations.type';
import { getInvitationList } from '@/api/invitations.api';
import { useEffect } from 'react';

const INVITATION_SIZE = 10;

export default function InvitationsDashboard() {
  const {
    data,
    excute: fetchInvitationDashboards,
    loading,
  } = useAsync(
    async () =>
      await getInvitationList({
        cursorId: undefined,
        size: INVITATION_SIZE,
        title: undefined,
      }),
  );

  useEffect(() => {
    fetchInvitationDashboards({});
  }, []);

  return (
    <div className="mt-6 w-full py-6 pl-[5.5rem] tablet:mt-12 tablet:py-4 tablet:pl-[12.5rem] pc:mt-10 pc:py-8 pc:pl-[21.25rem]">
      <div className="max-w-5xl">
        <div className="tablet:pb-30 flex flex-col gap-[6.5625rem] px-5 pb-20 pt-6 tablet:gap-16 tablet:px-10 pc:gap-16 pc:pb-[7.5rem]">
          <h1 className="font-pretendard text-md font-bold text-black-333236 tablet:text-2xl">
            초대받은 대시보드
          </h1>
          {data?.invitations && data.invitations.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-F7F8FA text-left text-sm font-medium text-gray-787486 tablet:text-md">
                  <th className="px-6 py-3">이름</th>
                  <th className="px-6 py-3">초대자</th>
                  <th className="px-6 py-3 text-center" colSpan={2}>
                    수락 여부
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.invitations.map((invitation: InvitationType) => (
                  <tr
                    key={invitation.dashboard.id}
                    className="hover:bg-gray-F1EFFD border-b border-gray-EEEEEE text-md text-black-333236 tablet:text-lg"
                  >
                    <td className="px-6 py-4">{invitation.dashboard.title}</td>
                    <td className="px-6 py-4">{invitation.inviter.nickname}</td>
                    <td className="px-1.5 py-4 text-end">
                      <button className="rounded bg-violet-5534DA text-white tablet:px-6 tablet:py-1.5 pc:px-7 pc:py-2">
                        수락
                      </button>
                    </td>
                    <td className="px-1.5 py-4 text-start">
                      <button className="rounded border border-gray-D9D9D9 bg-white text-violet-5534DA tablet:px-6 tablet:py-1.5 pc:px-7 pc:py-2">
                        거절
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center">
              <Image
                width={100}
                height={100}
                src="/images/icon/ic-invite.svg"
                alt="invitations"
              />
              <p className="font-pretendard text-xs font-normal text-gray-9FA6B2 tablet:text-lg">
                아직 초대받은 대시보드가 없어요
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
