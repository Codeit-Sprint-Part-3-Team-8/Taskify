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
  );
};

export default InvitationsTable;
