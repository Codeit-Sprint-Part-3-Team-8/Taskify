interface MemberType {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updateAt: string;
  isOwner: boolean;
}

interface MemberListType {
  totalCount: number;
  members: MemberType[];
}

interface GetMemberListParams {
  page?: number;
  size?: number;
  dashboardId: number;
}

interface DeleteMemberParams {
  memberId: number;
}

export type {
  GetMemberListParams,
  MemberType,
  MemberListType,
  DeleteMemberParams,
};
