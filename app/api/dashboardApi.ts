import axios from './axios';

interface getDashBoardByIdParams {
  id: number;
}

export async function getDashBoardById({ id }: getDashBoardByIdParams) {
  const response = await axios.get(`/dashboard/${id}`);
  return response.data;
}
