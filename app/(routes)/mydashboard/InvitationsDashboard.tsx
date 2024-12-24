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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-6 w-full py-6 pl-[5.5rem] tablet:mt-12 tablet:py-4 tablet:pl-[12.5rem] pc:mt-10 pc:py-8 pc:pl-[21.25rem]">
      <div className="max-w-5xl">
        <div className="tablet:pb-30 flex flex-col gap-[6.5625rem] px-5 pb-20 pt-6 tablet:gap-16 tablet:px-10 pc:gap-16 pc:pb-[7.5rem]">
          <h1 className="font-pretendard text-md font-bold text-black-333236 tablet:text-2xl">
            초대받은 대시보드
          </h1>
          {data?.invitations && data.invitations.length > 0 ? (
            <div className="flex flex-col gap-4">
              {data.invitations.map((invitation: InvitationType) => (
                <div
                  key={invitation.dashboard.id}
                  className="flex items-center gap-4 rounded-lg border border-gray-D9D9D9 p-4"
                >
                  <p className="truncate font-pretendard text-sm font-medium text-black-333236">
                    {invitation.dashboard.title}
                  </p>
                </div>
              ))}
            </div>
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
