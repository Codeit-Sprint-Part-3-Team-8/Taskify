import {
  ColumnImageType,
  ColumnListType,
  ColumnType,
  CreateColumnImageParams,
  CreateColumnParams,
  DeleteColumn,
  GetColumnListParams,
  UpdateColumnParams,
} from '@/_types/columns.type';
import axios from './axios';

async function createColumn({
  title,
  dashboardId,
}: CreateColumnParams): Promise<ColumnType> {
  const response = await axios.post('/columns', {
    title,
    dashboardId,
  });
  return response.data;
}

async function getColumnList({
  dashboardId,
}: GetColumnListParams): Promise<ColumnListType> {
  const response = await axios.get('/columns', {
    params: {
      dashboardId,
    },
  });
  return response.data;
}

async function updateColumn({
  columnId,
  title,
}: UpdateColumnParams): Promise<ColumnType> {
  const response = await axios.put(`/columns/${columnId}`, {
    title,
  });
  return response.data;
}

async function deleteColumn({ columnId }: DeleteColumn) {
  const response = await axios.delete(`/columns/${columnId}`);
  return !!response;
}

async function createColumnImage({
  columnId,
  image,
}: CreateColumnImageParams): Promise<ColumnImageType> {
  const response = await axios.post(`/columns/${columnId}/card-image`, image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export {
  createColumn,
  getColumnList,
  updateColumn,
  deleteColumn,
  createColumnImage,
};
