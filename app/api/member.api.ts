import {
  DeleteMemberParams,
  GetMemberListParams,
  MemberListType,
} from '@/_types/members.type';
import axios from './axios';

async function getMemberList({
  page = 1,
  size = 20,
  dashboardId,
}: GetMemberListParams): Promise<MemberListType> {
  const response = await axios.get('/members', {
    params: {
      page,
      size,
      dashboardId,
    },
  });
  return response.data;
}

async function deleteMember({ memberId }: DeleteMemberParams) {
  const response = await axios.delete(`/members/${memberId}`);
  return !!response;
}

export { getMemberList, deleteMember };
