import {
  GetInvitationListParams,
  InvitationListType,
  InvitationType,
  UpdateInvitationParams,
} from '@/_types/invitations.type';
import axios from './axios';

async function getInvitationList({
  size = 10,
  cursorId,
  title,
}: GetInvitationListParams = {}): Promise<InvitationListType> {
  const response = await axios.get('/invitations', {
    params: {
      size,
      cursorId,
      title,
    },
  });
  return response.data;
}

async function updateInvitation({
  invitationId,
  inviteAccepted,
}: UpdateInvitationParams): Promise<InvitationType> {
  const response = await axios.put(`/invitations/${invitationId}`, {
    inviteAccepted,
  });
  return response.data;
}

export { getInvitationList, updateInvitation };
