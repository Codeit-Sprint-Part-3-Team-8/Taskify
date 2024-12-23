interface ColumnType {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

interface ColumnListType {
  result: 'SUCCESS';
  data: ColumnType[] | [];
}

interface ColumnImageType {
  imageUrl: string;
}

interface CreateColumnParams {
  title: string;
  dashboardId: number;
}

interface GetColumnListParams {
  dashboardId: number;
}

interface UpdateColumnParams {
  columnId: number;
  title: string;
}

interface DeleteColumn {
  columnId: number;
}

interface CreateColumnImage {
  columnId: number;
  image: File;
}

export type {
  CreateColumnParams,
  ColumnType,
  GetColumnListParams,
  ColumnListType,
  UpdateColumnParams,
  DeleteColumn,
  CreateColumnImage,
  ColumnImageType,
};
