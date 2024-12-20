export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface Member {
  email: string;
  id: string;
  username: string;
}

export interface Dashboard {
  id: string;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  dashboardId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDashboardRequest {
  title: string;
  color: string;
}

export interface CreateColumnRequest {
  title: string;
  dashboardId: string;
}

export interface UpdateColumnRequest {
  columnId: string;
  title: string;
}

export interface InviteMemberRequest {
  email: string;
  dashboardId: string;
}

export interface DeleteColumnData {
  confirmed: boolean;
}

export interface DashboardResponse {
  id: string;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: string;
}

export interface ColumnResponse {
  id: string;
  title: string;
  dashboardId: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationResponse {
  id: string;
  inviter: {
    id: string;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: string;
    title: string;
  };
  invitee: {
    id: string;
    email: string;
    nickname: string;
  };
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  createdAt: string;
  updatedAt: string;
}

export type CreateDashboardResponse = ApiResponse<DashboardResponse>;
export type CreateColumnResponse = ApiResponse<ColumnResponse>;
export type UpdateColumnResponse = ApiResponse<ColumnResponse>;
export type CreateInvitationResponse = ApiResponse<InvitationResponse>;
