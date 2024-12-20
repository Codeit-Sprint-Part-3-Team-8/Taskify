import instance from './axios';
import { handleApiError } from '@/utils/error';
import type {
  CreateDashboardRequest,
  CreateColumnRequest,
  UpdateColumnRequest,
  DashboardResponse,
  ColumnResponse,
  InvitationResponse,
  CreateDashboardResponse,
  CreateColumnResponse,
  UpdateColumnResponse,
  CreateInvitationResponse,
} from './types';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const createAuthHeader = () => ({
  Authorization: `Bearer ${ACCESS_TOKEN}`,
});

export class ModalApi {
  static async createDashboard(
    newDashboardData: CreateDashboardRequest,
  ): Promise<DashboardResponse> {
    const { title, color } = newDashboardData;

    try {
      const response = await instance.post<CreateDashboardResponse>(
        '/dashboards',
        { title, color },
        { headers: createAuthHeader() },
      );
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async createColumn(
    columnData: CreateColumnRequest,
  ): Promise<ColumnResponse> {
    const { title, dashboardId } = columnData;

    try {
      const response = await instance.post<CreateColumnResponse>(
        '/columns',
        { title, dashboardId },
        { headers: createAuthHeader() },
      );
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async updateColumn(
    updatedColumnData: UpdateColumnRequest,
  ): Promise<ColumnResponse> {
    const { columnId, title } = updatedColumnData;

    try {
      const response = await instance.put<UpdateColumnResponse>(
        `/columns/${columnId}`,
        { title },
        { headers: createAuthHeader() },
      );
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async deleteColumn(columnId: string): Promise<void> {
    try {
      await instance.delete(`/columns/${columnId}`, {
        headers: createAuthHeader(),
      });
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async createInvitation(
    email: string,
    dashboardId: string,
  ): Promise<InvitationResponse> {
    try {
      const response = await instance.post<CreateInvitationResponse>(
        `/dashboards/${dashboardId}/invitations`,
        { email },
        { headers: createAuthHeader() },
      );
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}
