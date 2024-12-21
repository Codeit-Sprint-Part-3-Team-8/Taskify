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

interface GetInvitationListByDashboardIdParams {
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
  GetInvitationListByDashboardIdParams,
  DashboardInvitationListType,
  DeleteInvitationParams,
};
