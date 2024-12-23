import instance from './axios';

interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

interface DashboardResponse {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: number | null;
}

async function getMyDashBoardList(
  navigationMethod: string,
  page: number,
  size: number,
): Promise<DashboardResponse> {
  try {
    const response = await instance.get<DashboardResponse>(
      `/dashboards?navigationMethod=${navigationMethod}&page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error('내 대시보드를 불러오는데 실패했습니다.', error);
    throw error;
  }
}

export { getMyDashBoardList };
