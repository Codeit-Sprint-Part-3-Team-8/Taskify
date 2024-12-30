import Button from '@/_components/Button/Button';
import Pagenation from './Pagenation';
import { MemberListType, MemberType } from '@/_types/members.type';
import useAsync from '@/_hooks/useAsync';
import { getMemberList } from '@/api/member.api';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import ModifyModal from './ModifyModal';

const MEMBER_PAGE_SIZE = 4;

export default function ModifyList({ dashboardId }: { dashboardId: number }) {
  const {
    data: memberData,
    excute: getMemberData,
    // loading: memberLoading,
    // error: memberError,
  } = useAsync(getMemberList);

  const [memberDataState, setMemberDataState] = useState<MemberListType | null>(
    memberData,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const fetchMemberData = useCallback(async () => {
    await getMemberData({ dashboardId, size: MEMBER_PAGE_SIZE });
  }, [dashboardId, getMemberData]);

  const handleClickPage = async (page: number) => {
    await getMemberData({ dashboardId, page, size: MEMBER_PAGE_SIZE });
  };

  const handleDeleteMember = async (memberId: number) => {
    setIsModalOpen(true);
    setDeleteId(memberId);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    fetchMemberData();
  };

  useEffect(() => {
    setMemberDataState(memberData);
  }, [memberData]);

  useEffect(() => {
    fetchMemberData();
  }, [fetchMemberData]);

  if (!memberDataState?.members) {
    return (
      <div className="mx-3 h-80 bg-white px-4 py-5 tablet:h-96 tablet:w-[34rem] tablet:py-8 pc:w-[38rem]">
        <div className="text-center text-lg text-gray-600">
          구성원 데이터가 없습니다.
        </div>
      </div>
    );
  }

  if (memberDataState.members.length === 0) {
    return (
      <div className="mx-3 h-80 bg-white px-4 py-5 tablet:h-96 tablet:w-[34rem] tablet:py-8 pc:w-[38rem]">
        <div className="text-center text-lg text-gray-600">
          등록된 구성원이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-3 h-[27rem] rounded-2xl bg-white px-4 py-5 tablet:w-[34rem] tablet:py-8 pc:w-[38rem]">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">구성원</div>
        <Pagenation
          onClickPage={handleClickPage}
          totalCount={memberData?.totalCount || 1}
          pageSize={4}
        />
      </div>
      <div className="pb-3 pt-6 text-md font-normal text-gray-9FA6B2">이름</div>
      {memberDataState.members.map((member: MemberType, index: number) => (
        <div className="pb-4" key={member.id}>
          <div className="flex justify-between pb-4">
            <div className="flex items-center gap-2 rounded-full p-1 tablet:gap-3">
              <Image
                width={32}
                height={32}
                src={
                  member.profileImageUrl! ||
                  '/images/contents/default-profile.svg'
                }
                alt={member.nickname || '사용자'}
                className="rounded-full"
              />
              <div
                className={`block font-pretendard text-lg font-medium text-black-333236`}
              >
                {member.nickname || '사용자'}
              </div>
            </div>
            <Button
              disabled={member.isOwner === true}
              backgroundColor="white"
              className="px-4 py-2 text-purple-760DDE"
              type="submit"
              onClick={() => handleDeleteMember(member.id)}
            >
              삭제
            </Button>
          </div>
          {index !== memberDataState.members.length - 1 && (
            <hr className="bg-gray-EEEEEE" />
          )}
        </div>
      ))}
      {isModalOpen && (
        <ModifyModal
          columnId={deleteId!}
          initialTitle="dd"
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
