import { dashBoardType } from '@/(routes)/dashboard//[id]/page';
import instance from './axios';

const ACCESSTOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDk1OCwidGVhbUlkIjoiMTEtOCIsImlhdCI6MTczNDMzMTY1OSwiaXNzIjoic3AtdGFza2lmeSJ9.NUwX8wxDLIx4GWjslfJYQ-jaxA0AsSLSZXcmK9r0sog';

export async function getDashBoardById({
  id,
}: {
  id: string | string[] | undefined;
}): Promise<dashBoardType> {
  const response = await instance.get(`/dashboards/${id}`, {
    headers: {
      Authorization: `Bearer ${ACCESSTOKEN}`,
    },
  });

  console.log(response.data);

  return response.data;
}
