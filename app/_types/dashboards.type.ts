import { InvitationType } from './invitations.type';

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

interface DashboardInvitationListType {
  totalCount: number;
  invitations: InvitationType[];
}

interface CreateDashboardParams {
  title: string;
  color: string;
}

interface GetDashboardListParams {
  navigationMethod?: 'infiniteScroll' | 'pagination';
  cursorId?: number;
  page?: number;
  size?: number;
}

interface GetDashboardParams {
  dashboardId: number;
}

interface UpdateDashboardParams {
  dashboardId: number;
  title: string;
  color: string;
}

interface DeleteDashboardParams {
  dashboardId: number;
}

interface CreateInvitationParams {
  dashboardId: number;
  email: string;
}

interface GetInvitationListByDashboardIdParams {
  dashboardId: number;
  page?: number;
  size?: number;
}

interface DeleteInvitationParams {
  dashboardId: number;
  invitationId: number;
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
  GetInvitationListByDashboardIdParams,
  DashboardInvitationListType,
  DeleteInvitationParams,
};
