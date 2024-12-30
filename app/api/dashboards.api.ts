import {
  CreateDashboardParams,
  CreateInvitationParams,
  DashboardListType,
  DashboardType,
  DeleteDashboardParams,
  GetDashboardParams,
  GetDashboardListParams,
  InvitationType,
  UpdateDashboardParams,
  DeleteInvitationParams,
  GetInvitationListByDashboardIdParams,
  DashboardInvitationListType,
} from '@/_types/dashboards.type';
import axios from './axios';

async function createDashboard({
  title,
  color,
}: CreateDashboardParams): Promise<DashboardType> {
  const response = await axios.post('/dashboards', {
    title,
    color,
  });
  return response.data;
}

async function getDashboardList({
  navigationMethod = 'infiniteScroll',
  cursorId,
  page = 1,
  size = 10,
}: GetDashboardListParams = {}): Promise<DashboardListType> {
  const response = await axios.get('/dashboards', {
    params: {
      navigationMethod,
      cursorId,
      page,
      size,
    },
  });
  return response.data;
}

async function getDashboard({
  dashboardId,
}: GetDashboardParams): Promise<DashboardType> {
  const response = await axios.get(`/dashboards/${dashboardId}`);
  return response.data;
}

async function updateDashboard({
  dashboardId,
  title,
  color,
}: UpdateDashboardParams): Promise<DashboardType> {
  const response = await axios.put(`/dashboards/${dashboardId}`, {
    title,
    color,
  });
  return response.data;
}

async function deleteDashboard({ dashboardId }: DeleteDashboardParams) {
  const response = await axios.delete(`/dashboards/${dashboardId}`);
  return !!response;
}

async function createInvitation({
  dashboardId,
  email,
}: CreateInvitationParams): Promise<InvitationType> {
  const response = await axios.post(`/dashboards/${dashboardId}/invitations`, {
    email,
  });
  return response.data;
}

async function getInvitationListByDashboardId({
  dashboardId,
  page = 1,
  size = 10,
}: GetInvitationListByDashboardIdParams): Promise<DashboardInvitationListType> {
  const response = await axios.get(`/dashboards/${dashboardId}/invitations`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
}

async function deleteInvitation({
  dashboardId,
  invitationId,
}: DeleteInvitationParams) {
  const response = await axios.delete(
    `/dashboards/${dashboardId}/invitations/${invitationId}`,
  );
  return !!response;
}

export {
  createDashboard,
  getDashboardList,
  getDashboard,
  updateDashboard,
  deleteDashboard,
  createInvitation,
  getInvitationListByDashboardId,
  deleteInvitation,
};
