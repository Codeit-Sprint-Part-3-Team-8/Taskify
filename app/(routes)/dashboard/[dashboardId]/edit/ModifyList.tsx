import Button from '@/_components/Button/Button';
import Profile from '@/_components/Navbar/Profile';
import Pagenation from './Pagenation';
import { MemberListType } from '@/_types/members.type';

interface ModifyListProps {
  memberData: MemberListType | null;
  onClickRemoveMember: (id: number) => void;
}

export default function ModifyList({
  memberData,
  onClickRemoveMember,
}: ModifyListProps) {
  if (!memberData || !memberData.members) {
    return (
      <div className="mx-3 bg-white px-4 py-5 tablet:w-[34rem] tablet:py-8 pc:w-[38rem]">
        <div className="text-center text-lg text-gray-600">
          구성원 데이터가 없습니다.
        </div>
      </div>
    );
  }

  const { members } = memberData;

  if (members.length === 0) {
    return (
      <div className="mx-3 bg-white px-4 py-5 tablet:w-[34rem] tablet:py-8 pc:w-[38rem]">
        <div className="text-center text-lg text-gray-600">
          등록된 구성원이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-3 bg-white px-4 py-5 tablet:w-[34rem] tablet:py-8 pc:w-[38rem]">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">구성원</div>
        <Pagenation />
      </div>
      <div className="pb-3 pt-6 text-md font-normal text-gray-9FA6B2">이름</div>
      {members.map((member) => (
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
              onClick={() => onClickRemoveMember(member.id)}
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
