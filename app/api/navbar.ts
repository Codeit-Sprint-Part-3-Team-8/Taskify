import axios from './axios';

export type memberProps = [
  {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
    userId: number;
  },
];

export const getMember = async (id: number): Promise<memberProps> => {
  const response = await axios.get(`/members?dashboardId=${id}`);
  return response.data.members;
};

export const getDashboard = async (id: number) => {
  const response = await axios.get(`/dashboards/${id}`);
  return response.data;
};
