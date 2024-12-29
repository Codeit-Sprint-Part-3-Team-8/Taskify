import { useCallback, useEffect, useState } from 'react';
import GenericModal from '@/_components/Modals/GenericModal';
import ModalInput from '@/_components/Modals/ModalInput';
import { MoreVertical, X } from 'lucide-react';
import Image from 'next/image';
import { deleteCard, getCard } from '@/api/cards.api';
import Dropdown from '@/_components/Dropdown/Dropdown';
import useCommentList from '@/_hooks/useCommentList';
import CommentList from '@/_components/Modals/DashboardModal/CommentList';
import useIntersectionObserver from '@/_hooks/useIntersectionObserver';
import { CardType } from '@/_types/cards.type';
import UserProfile from '@/_components/UserProfile/UserProfile';

interface TodoCardModalProps {
  userId: number;
  cardId: number;
  columnTitle: string;
  dashboardId: number;
  onClose: () => void;
  onEditClick: () => void;
}

export default function TodoCardModal({
  userId,
  cardId,
  columnTitle,
  dashboardId,
  onClose,
  onEditClick,
}: TodoCardModalProps) {
  const [cardInfo, setCardInfo] = useState<CardType | null>(null);
  const {
    commentsResponse,
    addComment,
    loadMoreComments,
    removeComment,
    editComment,
    isSubmitting,
  } = useCommentList(cardId, null);
  const [newComment, setNewComment] = useState('');
  // 카드 삭제 함수
  const handleDeleteCard = async () => {
    try {
      await deleteCard({ cardId });
      alert('카드가 삭제되었습니다.');
    } catch (error) {
      console.error('카드 삭제 오류:', error);
    }
  };

  const handleClickMenu = async (value: string) => {
    onClose();
    if (value === 'edit') {
      console.log('clickEdit');
      onEditClick();
    } else if (value === 'delete') {
      await handleDeleteCard();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CARD_INFO = await getCard({ cardId });
        setCardInfo(CARD_INFO);
      } catch (error) {
        console.error('데이터 요청 실패:', error);
      }
    };

    fetchData();
  }, [cardId]);

  const hanndleClickSubmit = () => {
    if (!cardInfo) return;
    addComment(newComment, dashboardId, cardInfo.columnId);
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

  const title = (
    <div className="relative flex items-center justify-between">
      <h1 className="text-3xl font-bold">새로운 일정 관리 Taskify</h1>
      <div className="absolute right-0 flex items-center gap-4">
        <div className="relative">
          <Dropdown
            buttonClassName="rounded-full"
            menuClassName="absolute flex flex-col items-center right-[-10px] pt-2 w-[93px] rounded-[6px] border border-gray-D9D9D9 bg-white"
            trigger={<MoreVertical className="h-6 w-6" />}
          >
            <button
              onClick={() => handleClickMenu('edit')}
              className="h-[32px] w-[81px] rounded-sm text-[14px] font-normal hover:bg-violet-8 hover:text-violet-5534DA"
            >
              수정하기
            </button>
            <button
              onClick={() => handleClickMenu('delete')}
              className="h-[32px] w-[81px] rounded-sm text-[14px] font-normal hover:bg-violet-8 hover:text-violet-5534DA"
            >
              삭제하기
            </button>
          </Dropdown>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );

  const mainContent = (
    <div className="flex h-full gap-10">
      <div className="relative flex h-[43.25rem] w-[28.125rem] flex-col">
        <div className="mb-4 flex w-full items-center gap-2">
          <div className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600">
            {columnTitle}
          </div>
          <div className="flex gap-2">
            {cardInfo?.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-4 text-sm font-normal text-black-000000">
            {cardInfo?.description}
          </p>
          {cardInfo?.imageUrl && (
            <Image
              src={cardInfo.imageUrl}
              alt="Task illustration"
              className="mb-4 rounded-lg"
              width={100}
              height={100}
            />
          )}
        </div>

        <div className="absolute bottom-2 left-0 mb-[1.5rem] flex h-[16.0625rem] w-full flex-col">
          <div className="relative flex w-full">
            <div className="w-full">
              <ModalInput
                name="comment"
                label="댓글"
                placeholder="댓글 작성하기"
                labelClassName="text-base font-semibold text-black-323236"
                inputClassName="w-full h-[110px] placeholder:absolute placeholder:top-0 placeholder:left-4 placeholder:top-4"
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    hanndleClickSubmit();
                  }
                }}
                value={newComment}
                disabled={isSubmitting}
              />
            </div>
            <button
              onClick={hanndleClickSubmit}
              disabled={isSubmitting || !newComment.trim()}
              className="absolute bottom-[0.75rem] right-[0.6875rem] mt-8 h-[2rem] w-[5.1875rem] rounded bg-purple-600 px-4 text-white disabled:bg-gray-300"
            >
              입력
            </button>
          </div>

          <div className="mt-4 flex-1 space-y-4 overflow-y-auto">
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

      <div className="relative h-[9.6875rem] w-[12.5rem] rounded-xl border border-gray-D9D9D9 pl-6 pt-4">
        <div className="absolute left-4 top-4">
          <label className="block text-sm font-semibold text-black-000000">
            담당자
          </label>
          <div className="flex items-center gap-2">
            <UserProfile
              profileImageUrl={cardInfo?.assignee?.profileImageUrl}
              onlyImg
              nickname={cardInfo?.assignee?.nickname || ''}
            />
            <span className="font-medium">
              {cardInfo?.assignee?.nickname || ''}
            </span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <label className="block text-sm font-semibold text-black-000000">
            마감일
          </label>
          <div className="font-medium">{cardInfo?.dueDate}</div>
        </div>
      </div>
    </div>
  );

  return (
    <GenericModal
      title={title}
      mainContent={mainContent}
      footerContent={null}
      onClose={onClose}
      className="flex h-[47.6875rem] w-[45.625rem] flex-col"
    />
  );
}
