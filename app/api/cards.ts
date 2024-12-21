import instance from './axios';
import { cardType } from '@/(routes)/dashboard/[id]/Dashboard';

const ACCESSTOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDk1OCwidGVhbUlkIjoiMTEtOCIsImlhdCI6MTczNDMzMTY1OSwiaXNzIjoic3AtdGFza2lmeSJ9.NUwX8wxDLIx4GWjslfJYQ-jaxA0AsSLSZXcmK9r0sog';

interface getCardsByColumnParams {
  columnId: number;
  size: number;
  cursorId?: number | null;
}

export async function getCardsByColumn({
  columnId,
  size,
  cursorId = 0,
}: getCardsByColumnParams): Promise<cardType[]> {
  const response = await instance.get(`/cards/`, {
    params: {
      columnId: columnId,
      cursorId: cursorId,
      size: size,
    },
    headers: {
      Authorization: `Bearer ${ACCESSTOKEN}`,
    },
  });

  console.log(response.data);

  return response.data;
}
