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
  cursorId: number;
  invitations: InvitationType[];
}

interface GetInvitationListParams {
  size?: number;
  cursorId?: number;
  title?: string;
}

interface UpdateInvitationParams {
  invitationId: number;
  inviteAccepted: boolean;
}

export type {
  GetInvitationListParams,
  InvitationType,
  InvitationListType,
  UpdateInvitationParams,
};
