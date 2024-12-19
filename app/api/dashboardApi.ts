import axios from './axios';

export async function getDashBoardById(id: number) {
  const response = await axios.get(`/dashboard/${id}`);

  return response.data;
}
