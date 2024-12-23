import Button from '@/_components/Button/Button';
import Profile from '@/_components/Navbar/Profile';
import Pagenation from './Pagenation';
import { MemberListType, MemberType } from '@/_types/members.type';
import useAsync from '@/_hooks/useAsync';
import { deleteMember } from '@/api/member.api';
import { useEffect, useState } from 'react';

interface ModifyListProps {
  memberData: MemberListType | null;
  onClickPage: (page: number) => void;
}

export default function ModifyList({
  memberData,
  onClickPage,
}: ModifyListProps) {
  const { excute: deleteMemberAsync } = useAsync(deleteMember);

  const [memberDataState, setMemberDataState] = useState<MemberListType | null>(
    memberData,
  );

  const handleRemoveMember = async (memberId: number) => {
    await deleteMemberAsync({ memberId });

    if (memberDataState && memberDataState.members) {
      const updatedMembers = memberDataState.members.filter(
        (member) => member.userId !== memberId,
      );

      setMemberDataState((prevState) => ({
        ...prevState,
        members: updatedMembers,
        totalCount: prevState?.totalCount ?? 0,
      }));
    }
  };

  useEffect(() => {
    if (memberData) {
      setMemberDataState(memberData);
    }
  }, [memberData]);

  if (!memberDataState || !memberDataState.members) {
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
    <div className="mx-3 h-80 rounded-2xl bg-white px-4 py-5 tablet:h-96 tablet:w-[34rem] tablet:py-8 pc:w-[38rem]">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">구성원</div>
        <Pagenation
          onClickPage={onClickPage}
          totalCount={memberData?.totalCount}
          pageSize={4}
        />
      </div>
      <div className="pb-3 pt-6 text-md font-normal text-gray-9FA6B2">이름</div>
      {memberDataState.members.map((member: MemberType) => (
        <div className="pb-4" key={member.id}>
          <div className="flex justify-between pb-4">
            <Profile
              profileImageUrl={member.profileImageUrl!}
              nickname={member.nickname}
            />
            <Button
              backgroundColor="white"
              className="px-7 text-purple-760DDE"
              type="submit"
              onClick={() => handleRemoveMember(member.userId)}
            >
              삭제
            </Button>
          </div>
          <hr className="bg-gray-EEEEEE"></hr>
        </div>
      ))}
    </div>
  );
}
