interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string | null;
    nickname: string;
    id: number;
  };
}

interface CommentListType {
  cursorId: number | null;
  comments: CommentType[];
}

interface CreateCommentParams {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

interface GetCommentListParams {
  size?: number;
  cursorId?: number;
  cardId: number;
}

interface UpdateCommentParams {
  commentId: number;
  content: string;
}

interface DeleteCommentParams {
  commentId: number;
}

export type {
  CreateCommentParams,
  CommentType,
  GetCommentListParams,
  CommentListType,
  UpdateCommentParams,
  DeleteCommentParams,
};
