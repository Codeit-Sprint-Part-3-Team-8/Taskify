import React from 'react';
import { InvitationType } from '@/_types/invitations.type';

interface InvitationsTableProps {
  invitations: InvitationType[];
  onAccept: (invitationId: number) => void;
  onReject: (invitationId: number) => void;
}

const InvitationsTable: React.FC<InvitationsTableProps> = ({
  invitations,
  onAccept,
  onReject,
}) => {
  return (
    <>
      <div className="hidden tablet:block">
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
            {invitations.map((invitation) => (
              <tr
                key={invitation.id}
                className="hover:bg-gray-F1EFFD border-b border-gray-EEEEEE text-md text-black-333236 tablet:text-lg"
              >
                <td className="px-6 py-4">{invitation.dashboard.title}</td>
                <td className="px-6 py-4">{invitation.inviter.nickname}</td>
                <td className="px-1.5 py-4 text-end">
                  <button
                    className="rounded bg-violet-5534DA text-white tablet:px-6 tablet:py-1.5 pc:px-7 pc:py-2"
                    onClick={() => onAccept(invitation.id)}
                  >
                    수락
                  </button>
                </td>
                <td className="px-1.5 py-4 text-start">
                  <button
                    className="rounded border border-gray-D9D9D9 bg-white text-violet-5534DA tablet:px-6 tablet:py-1.5 pc:px-7 pc:py-2"
                    onClick={() => onReject(invitation.id)}
                  >
                    거절
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3.5 px-3.5 py-3.5 tablet:hidden">
        {invitations.map((invitation) => (
          <div
            key={invitation.id}
            className="flex flex-col gap-3.5 border-b border-gray-EEEEEE bg-white p-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex gap-6">
                <span className="font-pretendard text-md font-normal text-gray-9FA6B2">
                  이름
                </span>
                <p className="font-pretendard text-md font-normal text-black-333236">
                  {invitation.dashboard.title}
                </p>
              </div>
              <div className="flex gap-6">
                <span className="font-pretendard text-md font-normal text-gray-9FA6B2">
                  초대자
                </span>
                <p className="font-pretendard text-md font-normal text-black-333236">
                  {invitation.inviter.nickname}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="w-1/2 rounded bg-violet-5534DA px-4 py-2 text-sm text-white"
                onClick={() => onAccept(invitation.id)}
              >
                수락
              </button>
              <button
                className="ml-2 w-1/2 rounded border border-gray-D9D9D9 bg-white px-4 py-2 text-sm text-violet-5534DA"
                onClick={() => onReject(invitation.id)}
              >
                거절
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InvitationsTable;
