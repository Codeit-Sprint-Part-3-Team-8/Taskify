'use client';

import Image from 'next/image';
import useAsync from '@/_hooks/useAsync';
import { InvitationType } from '@/_types/invitations.type';
import { getInvitationList, updateInvitation } from '@/api/invitations.api';
import InvitationsTable from './InvitationTable';
import { useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';

const INVITATION_SIZE = 10;

interface InvitationsDashboardProps {
  onAcceptInvitation: () => void;
}

export default function InvitationsDashboard({
  onAcceptInvitation,
}: InvitationsDashboardProps) {
  const [offset, setOffset] = useState(0);
  const [invitations, setInvitations] = useState<InvitationType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    loading,
    excute: fetchInvitationDashboards,
  } = useAsync(
    async () =>
      await getInvitationList({
        cursorId:
          offset === 0 ? undefined : invitations[invitations.length - 1]?.id,
        size: INVITATION_SIZE,
        title: searchKeyword || undefined,
      }),
  );

  const { excute: handleInvitationResponse } = useAsync(
    async (params: { invitationId: number; inviteAccepted: boolean }) =>
      await updateInvitation(params),
  );

  useEffect(() => {
    const fetchData = async () => {
      await fetchInvitationDashboards({});
    };
    fetchData();
  }, [offset, searchKeyword]);

  useEffect(() => {
    setOffset(0);
    setInvitations([]);
    setHasMore(true);
  }, [searchKeyword]);

  useEffect(() => {
    if (data?.invitations) {
      setInvitations((prev) => {
        const newInvitations = data.invitations.filter(
          (newItem: InvitationType) =>
            !prev.some((existingItem) => existingItem.id === newItem.id),
        );
        return offset === 0 ? newInvitations : [...prev, ...newInvitations];
      });
      setHasMore(data.invitations.length === INVITATION_SIZE);
    }
  }, [data]);

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

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleClickAccept = async (invitationId: number) => {
    await handleInvitationResponse({ invitationId, inviteAccepted: true });
    alert('초대를 수락했습니다.');
    setInvitations((prev) =>
      prev.filter((invitation) => invitation.id !== invitationId),
    );
    onAcceptInvitation();
  };

  const handleClickReject = async (invitationId: number) => {
    await handleInvitationResponse({ invitationId, inviteAccepted: false });
    alert('초대를 거절했습니다.');
    setInvitations((prev) =>
      prev.filter((invitation) => invitation.id !== invitationId),
    );
  };

  return (
    <div className="mt-6 w-full py-6 pl-[5.5rem] tablet:mt-12 tablet:py-4 tablet:pl-[12.5rem] pc:mt-10 pc:py-8 pc:pl-[21.25rem]">
      <div className="max-w-5xl">
        <div className="flex flex-col gap-3 px-5 pt-6 tablet:gap-6 tablet:px-10">
          <div className="flex flex-col gap-4 pc:gap-8">
            <h1 className="font-pretendard text-md font-bold text-black-333236 tablet:text-2xl">
              초대받은 대시보드
            </h1>
            <SearchBar onSearch={handleSearch} placeholder="검색" />
          </div>
          {loading && offset === 0 ? (
            <div className="flex justify-center">로딩 중...</div>
          ) : invitations.length > 0 ? (
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
          {loading && offset > 0 && (
            <div className="flex justify-center">더 불러오는 중...</div>
          )}
          <div ref={loadMoreRef} className="h-10" />
        </div>
      </div>
    </div>
  );
}
