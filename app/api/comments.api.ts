import {
  CommentListType,
  CommentType,
  CreateCommentParams,
  DeleteCommentParams,
  GetCommentListParams,
  UpdateCommentParams,
} from '@/_types/comments.type';
import axios from './axios';

async function createComment({
  content,
  cardId,
  columnId,
  dashboardId,
}: CreateCommentParams): Promise<CommentType> {
  const response = await axios.post('/comments', {
    content,
    cardId,
    columnId,
    dashboardId,
  });
  return response.data;
}

async function getCommentList({
  size = 10,
  cursorId,
  cardId,
}: GetCommentListParams): Promise<CommentListType> {
  const response = await axios.get('/comments', {
    params: {
      size,
      cursorId,
      cardId,
    },
  });
  return response.data;
}

async function updateComment({
  commentId,
  content,
}: UpdateCommentParams): Promise<CommentType> {
  const response = await axios.put(`/comments/${commentId}`, {
    content,
  });
  return response.data;
}

async function deleteComment({ commentId }: DeleteCommentParams) {
  const response = await axios.delete(`/comments/${commentId}`);
  return response.data;
}

export { createComment, getCommentList, updateComment, deleteComment };
