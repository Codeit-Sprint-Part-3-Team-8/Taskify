interface DashboardType {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

interface DashboardListType {
  cursorId: number | null;
  totalCount: number;
  dashboards: DashboardType[];
}

interface InvitationType {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean | null;
  createdAt: string;
  updatedAt: string;
}

interface InvitationListType {
  totalCount: number;
  invitations: InvitationType[];
}

interface CreateDashboardParams {
  title: string;
  color: string;
}

interface GetDashboardListParams {
  navigationMethod?: 'infiniteScroll' | 'pagination';
  cursorId?: number | undefined;
  page?: number;
  size?: number;
}

interface GetDashboardParams {
  dashboardId: number | string;
}

interface UpdateDashboardParams {
  dashboardId: number | string;
  title: string;
  color: string;
}

interface DeleteDashboardParams {
  dashboardId: number | string;
}

interface CreateInvitationParams {
  dashboardId: number | string;
  email: string;
}

interface GetInvitationListParams {
  dashboardId: number | string;
  page?: number;
  size?: number;
}

interface DeleteInvitationParams {
  dashboardId: number | string;
  invitationId: number | string;
}

export type {
  CreateDashboardParams,
  DashboardType,
  GetDashboardListParams,
  DashboardListType,
  GetDashboardParams,
  UpdateDashboardParams,
  DeleteDashboardParams,
  CreateInvitationParams,
  InvitationType,
  GetInvitationListParams,
  InvitationListType,
  DeleteInvitationParams,
};
