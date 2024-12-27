import React, { useCallback, useEffect, useState } from 'react';
import Pagenation from './Pagenation';
import Button from '@/_components/Button/Button';
import Image from 'next/image';
import iconPlusBtn from '@images/icon/ic-plusbtn-white.svg';
import {
  DashboardInvitationListType,
  InvitationType,
} from '@/_types/dashboards.type';
import useAsync from '@/_hooks/useAsync';
import { deleteMember } from '@/api/member.api';
import { getInvitationListByDashboardId } from '@/api/dashboards.api';

const INVITATION_PAGE_SIZE = 4;

interface InviteListProps {
  onClickModal: () => void;
  dashboardId: number;
}

export default function InviteList({
  onClickModal,
  dashboardId,
}: InviteListProps) {
  const {
    data: invitationData,
    excute: getInvitationData,
    // loading: memberLoading,
    // error: memberError,
  } = useAsync(getInvitationListByDashboardId);

  const {
    excute: deleteMemberData,
    // loading: memberLoading,
    // error: memberError,
  } = useAsync(deleteMember);

  const [inviteDataState, setInviteDataState] =
    useState<DashboardInvitationListType | null>(invitationData);

  const fetchInviteData = useCallback(async () => {
    await getInvitationData({ dashboardId, size: INVITATION_PAGE_SIZE });
  }, [dashboardId, getInvitationData]);

  const handleClickInvitePage = async (page: number) => {
    await getInvitationData({ dashboardId, page, size: INVITATION_PAGE_SIZE });
  };

  const handleRemoveMember = async (id: number) => {
    await deleteMemberData({ memberId: id });
  };

  useEffect(() => {
    if (invitationData) {
      setInviteDataState(invitationData);
    }
  }, [invitationData]);

  useEffect(() => {
    fetchInviteData();
  }, [fetchInviteData]);

  return (
    <div className="mx-3 h-[27rem] rounded-2xl bg-white px-5 py-5 tablet:w-[34rem] tablet:py-8 pc:w-[38rem]">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">초대 내역</div>
        <div className="relative flex gap-4">
          <Pagenation
            onClickPage={handleClickInvitePage}
            totalCount={inviteDataState?.totalCount || 0}
            pageSize={4}
          />
          <Button
            backgroundColor="purple"
            className="absolute right-0 top-12 flex items-center justify-center gap-1 rounded-md border px-3 py-1.5 font-pretendard text-md font-medium tablet:static tablet:gap-2 tablet:rounded-lg tablet:py-2 pc:px-4 pc:py-2.5 pc:text-lg"
            onClick={onClickModal}
          >
            <Image width={16} height={16} src={iconPlusBtn} alt="plus" />
            초대하기
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="pb-3 pt-6 text-md font-normal text-gray-9FA6B2">
          이메일
        </div>
      </div>
      {inviteDataState?.invitations.map((invitation: InvitationType, index) => (
        <div key={invitation.id}>
          <div className="pb-4">
            <div className="flex items-center justify-between pb-4">
              <div>{invitation.invitee.email}</div>
              <Button
                backgroundColor="white"
                className="px-4 py-2 text-violet-5534DA"
                type="submit"
                onClick={() => handleRemoveMember(invitation.id)}
              >
                취소
              </Button>
            </div>
            {index !== inviteDataState.invitations.length - 1 && (
              <hr className="bg-gray-EEEEEE" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}