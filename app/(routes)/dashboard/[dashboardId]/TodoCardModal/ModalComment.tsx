import CommentList from '@/_components/Modals/DashboardModal/CommentList';
import useCommentList from '@/_hooks/useCommentList';
import useIntersectionObserver from '@/_hooks/useIntersectionObserver';
import { CardType } from '@/_types/cards.type';
import { useCallback, useState } from 'react';

interface ModalCommentProps {
  card: CardType | null;
  userId: number;
  cardId: number;
  dashboardId: number;
}

export default function ModalComment({
  userId,
  cardId,
  dashboardId,
  card,
}: ModalCommentProps) {
  const {
    commentsResponse,
    addComment,
    loadMoreComments,
    removeComment,
    editComment,
    isSubmitting,
  } = useCommentList(cardId, null);
  const [newComment, setNewComment] = useState('');

  const hanndleClickSubmit = () => {
    if (!card) return;
    addComment(newComment, dashboardId, card.columnId);
    setNewComment('');
  };

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry?.isIntersecting && commentsResponse?.cursorId) {
        loadMoreComments(commentsResponse.cursorId);
      }
    },
    [commentsResponse?.cursorId, loadMoreComments],
  );

  const endPoint = useIntersectionObserver(handleObserver);

  return (
    <div className="flex h-[180px] flex-col">
      <div className="relative mb-2 w-full">
        <label className="text-black-323236 mb-[6px] block text-md font-medium">
          댓글
        </label>
        <textarea
          name="comment"
          placeholder="댓글 작성하기"
          className="h-[70px] w-full resize-none rounded-xl border border-gray-D9D9D9 p-4 placeholder:text-xs placeholder:text-gray-9FA6B2 focus:border-gray-D9D9D9 focus:outline-none"
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              hanndleClickSubmit();
            }
          }}
          value={newComment}
          disabled={isSubmitting}
        />
        <button
          onClick={hanndleClickSubmit}
          disabled={isSubmitting || !newComment.trim()}
          className="absolute bottom-[1.25rem] right-[1.3rem] h-[28px] w-[84px] rounded-lg border border-gray-D9D9D9 bg-white px-4 text-xs font-medium text-violet-5534DA"
        >
          입력
        </button>
      </div>

      <div className="max-h-[80px] flex-1 overflow-y-auto">
        <div className="space-y-4">
          {commentsResponse?.comments.map(
            ({
              id: commentId,
              author: { id: authorId, nickname, profileImageUrl },
              createdAt,
              content,
            }) => (
              <CommentList
                key={`comment_${commentId}`}
                userId={userId}
                commentId={commentId}
                authorId={authorId}
                nickname={nickname}
                profileImageUrl={profileImageUrl}
                createdAt={createdAt}
                content={content}
                removeComment={removeComment}
                updateComment={editComment}
              />
            ),
          )}
          {commentsResponse?.cursorId && <div ref={endPoint} />}
        </div>
      </div>
    </div>
  );
}
