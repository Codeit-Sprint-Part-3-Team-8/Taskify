import axios from './axios';

const ACCESSTOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDk5MCwidGVhbUlkIjoiMTEtNyIsImlhdCI6MTczNDYyNzI3NywiaXNzIjoic3AtdGFza2lmeSJ9.nbhS0t7R06O87WTKeISlNe-YjcBeRoeG7Rn-vovaFnI';

// :: 대시보드 상세조회
// 테스트 11-7 , 12890
async function detailDashboard(dashboardId: number) {
  const response = await axios.get(`/dashboards/${dashboardId}`, {
    headers: {
      Authorization: `Bearer ${ACCESSTOKEN}`, // Authorization 헤더 추가
      'Content-Type': 'application/json', // 필요시 Content-Type도 추가
    },
  });
  return response.data;
}

export interface UpdateDashboardIdReturn {
  id: number;
  title: string;
  color: string; // Hex 색상 코드로 저장된 문자열
  userId: number;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
  createdByMe: boolean; // 현재 사용자에 의해 생성되었는지 여부
}

export interface UpdateDashboardIdParams {
  title: string;
  color: string;
}

// :: 대시보드 수정 (생성자만 가능)

async function updateDashboardId(
  dashboardId: number,
  dashboardData: UpdateDashboardIdParams,
): Promise<UpdateDashboardIdReturn> {
  const response = await axios.put(
    `/dashboards/${dashboardId}`,
    dashboardData,
    {
      headers: {
        Authorization: `Bearer ${ACCESSTOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
}

export { updateDashboardId, detailDashboard };
