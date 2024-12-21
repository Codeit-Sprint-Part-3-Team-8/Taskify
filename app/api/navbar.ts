import axios from './axios';

export interface Member {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string; // 또는 Date로 변경 가능
  updatedAt: string; // 또는 Date로 변경 가능
  isOwner: boolean;
  userId: number;
}

export type MemberProps = Member[];

export const getMember = async (id: number): Promise<MemberProps> => {
  const response = await axios.get(`/members?dashboardId=${id}`);
  return response.data.members;
};

export const getDashboard = async (id: number) => {
  const response = await axios.get(`/dashboards/${id}`);
  return response.data;
};
