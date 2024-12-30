import { useState } from 'react';
import { CommentListType } from '@/_types/comments.type';
import {
  createComment,
  getCommentList,
  deleteComment,
  updateComment,
} from '@/api/comments.api';

export default function useCommentList(
  cardId: number,
  initialComments: CommentListType | null,
) {
  const [commentsResponse, setCommentsResponse] =
    useState<CommentListType | null>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 댓글 추가
  const addComment = async (
    content: string,
    dashboardId: number,
    columnId: number,
  ) => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const newComment = await createComment({
        content,
        cardId,
        columnId,
        dashboardId,
      });
      setCommentsResponse((prev) => ({
        ...prev,
        comments: [newComment, ...(prev?.comments || [])],
        cursorId: prev?.cursorId ?? null,
      }));
    } catch (error) {
      console.error('댓글 추가 에러:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 댓글 더 불러오기
  const loadMoreComments = async (cursorId?: number) => {
    setIsSubmitting(true);
    try {
      const newCommentsResponse = await getCommentList({ cardId, cursorId });
      setCommentsResponse((prev) => ({
        ...newCommentsResponse,
        comments: [...(prev?.comments || []), ...newCommentsResponse.comments],
      }));
    } catch (error) {
      console.error('댓글을 불러오는데 실패했습니다:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 댓글 삭제
  const removeComment = async (commentId: number) => {
    try {
      await deleteComment({ commentId });
      setCommentsResponse((prev) =>
        prev
          ? {
              comments: prev.comments.filter(
                (comment) => comment.id !== commentId,
              ),
              cursorId: prev.cursorId,
            }
          : null,
      );
    } catch (error) {
      console.error('댓글 삭제 에러:', error);
    }
  };

  // 댓글 수정
  const editComment = async (commentId: number, newContent: string) => {
    try {
      const updatedComment = await updateComment({
        commentId,
        content: newContent,
      });

      setCommentsResponse((prev) =>
        prev
          ? {
              comments: prev.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, content: updatedComment.content }
                  : comment,
              ),
              cursorId: prev.cursorId,
            }
          : null,
      );
    } catch (error) {
      console.error('댓글 수정 에러:', error);
    }
  };

  return {
    commentsResponse,
    addComment,
    loadMoreComments,
    removeComment,
    editComment,
    isSubmitting,
  };
}
