import instance from './axios';

export interface ColumnType {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

const ACCESSTOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDk1OCwidGVhbUlkIjoiMTEtOCIsImlhdCI6MTczNDMzMTY1OSwiaXNzIjoic3AtdGFza2lmeSJ9.NUwX8wxDLIx4GWjslfJYQ-jaxA0AsSLSZXcmK9r0sog';

export async function getColumns({
  id,
}: {
  id: number;
}): Promise<ColumnType[]> {
  const response = await instance.get(`/columns`, {
    params: {
      dashboardId: id,
    },
    headers: {
      Authorization: `Bearer ${ACCESSTOKEN}`,
    },
  });

  console.log(response.data.data);

  return response.data.data;
}
