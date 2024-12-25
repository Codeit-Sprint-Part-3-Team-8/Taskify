'use client';

import Image from 'next/image';
import useAsync from '@/_hooks/useAsync';
import { InvitationType } from '@/_types/invitations.type';
import { getInvitationList, updateInvitation } from '@/api/invitations.api';
import InvitationsTable from './InvitationTable';
import { useEffect, useRef, useState } from 'react';

const INVITATION_SIZE = 10;

export default function InvitationsDashboard() {
  const [offset, setOffset] = useState(0);
  const [invitations, setInvitations] = useState<InvitationType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    excute: fetchInvitationDashboards,
    loading,
  } = useAsync(
    async () =>
      await getInvitationList({
        cursorId: invitations.length
          ? invitations[invitations.length - 1].id
          : undefined,
        size: INVITATION_SIZE,
        title: undefined,
      }),
  );

  const { excute: handleInvitationResponse } = useAsync(
    async ({
      invitationId,
      inviteAccepted,
    }: {
      invitationId: number;
      inviteAccepted: boolean;
    }) => await updateInvitation({ invitationId, inviteAccepted }),
  );

  useEffect(() => {
    const fetchData = async () => {
      fetchInvitationDashboards({});
      if (data?.invitations) {
        setInvitations((prev) => {
          const newInvitations = data.invitations.filter(
            (newItem: InvitationType) =>
              !prev.some((existingItem) => existingItem.id === newItem.id),
          );
          return [...prev, ...newInvitations];
        });
        setHasMore(data.invitations.length === INVITATION_SIZE);
      }
    };

    fetchData();
  }, [offset]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMore && !loading) {
          setOffset((prevOffset) => prevOffset + INVITATION_SIZE);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const currentRef = loadMoreRef.current;

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, loading]);

  const handleClickAccept = async (invitationId: number) => {
    await handleInvitationResponse({ invitationId, inviteAccepted: true });
    setInvitations((prev) =>
      prev.filter((invitation) => invitation.id !== invitationId),
    );
  };

  const handleClickReject = async (invitationId: number) => {
    await handleInvitationResponse({ invitationId, inviteAccepted: false });
    setInvitations((prev) =>
      prev.filter((invitation) => invitation.id !== invitationId),
    );
  };

  return (
    <div className="mt-6 w-full py-6 pl-[5.5rem] tablet:mt-12 tablet:py-4 tablet:pl-[12.5rem] pc:mt-10 pc:py-8 pc:pl-[21.25rem]">
      <div className="max-w-5xl">
        <div className="tablet:pb-30 flex flex-col gap-[6.5625rem] px-5 pb-20 pt-6 tablet:gap-16 tablet:px-10 pc:gap-16 pc:pb-[7.5rem]">
          <h1 className="font-pretendard text-md font-bold text-black-333236 tablet:text-2xl">
            초대받은 대시보드
          </h1>
          {invitations.length > 0 ? (
            <InvitationsTable
              invitations={invitations}
              onAccept={handleClickAccept}
              onReject={handleClickReject}
            />
          ) : (
            !loading && (
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
            )
          )}
          <div ref={loadMoreRef} className="h-10" />
        </div>
      </div>
    </div>
  );
}
