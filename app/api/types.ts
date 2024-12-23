export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface Member {
  email: string;
  id: number;
  nickname: string;
}

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDashboardRequest {
  title: string;
  color: string;
}

export interface CreateColumnRequest {
  title: string;
  dashboardId: number;
}

export interface UpdateColumnRequest {
  title: string;
  columnId: string;
}

export interface InviteMemberRequest {
  email: string;
  dashboardId: number;
}

export interface DeleteColumnData {
  columnId: number;
}

export interface DashboardResponse {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface ColumnResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationResponse {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type CreateDashboardResponse = ApiResponse<DashboardResponse>;
export type CreateColumnResponse = ApiResponse<ColumnResponse>;
export type UpdateColumnResponse = ApiResponse<ColumnResponse>;
export type CreateInvitationResponse = ApiResponse<InvitationResponse>;
