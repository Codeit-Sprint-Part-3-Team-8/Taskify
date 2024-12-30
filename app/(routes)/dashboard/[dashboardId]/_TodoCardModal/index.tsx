import { useEffect } from 'react';
import { deleteCard, getCard } from '@/api/cards.api';
import { ColumnData } from '../Dashboard';
import useAsync from '@/_hooks/useAsync';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalComment from './ModalComment';
import { createComment, getCommentList } from '@/api/comments.api';

interface TodoCardModalProps {
  cardId: number;
  column: ColumnData;
  dashboardId: number;
  onClose: () => void;
  onEditClick: () => void;
  onDeleteCard: (columnId: number, cardId: number) => void;
}

export default function TodoCardModal({
  cardId,
  column,
  dashboardId,
  onClose,
  onEditClick,
  onDeleteCard,
}: TodoCardModalProps) {
  const { excute: _getCard, data: card } = useAsync(getCard);
  const { excute: _getCommentList, data: commentList } =
    useAsync(getCommentList);
  const { excute: _createComment, data: createCommentData } =
    useAsync(createComment);

  // 카드 삭제 함수
  const handleDeleteCard = async () => {
    try {
      await deleteCard({ cardId });
      onDeleteCard(column.id, cardId);
      alert('카드가 삭제되었습니다.');
    } catch (error) {
      console.error('카드 삭제 오류:', error);
    }
  };

  const handleClickMenu = async (value: 'edit' | 'delete') => {
    onClose();
    if (value === 'edit') {
      onEditClick();
    } else if (value === 'delete') {
      await handleDeleteCard();
    }
  };

  const handleSubmitComment = (content: string) => {
    _createComment({ cardId, columnId: column.id, dashboardId, content });
  };

  useEffect(() => {
    _getCard({ cardId });
  }, [cardId, _getCard]);

  useEffect(() => {
    _getCommentList({ cardId });
  }, [cardId, _getCommentList, createCommentData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-000000/30">
      <div className="animate-fadeInUp h-[710px] w-[327px] rounded-lg bg-white p-4 shadow-lg transition-all tablet:h-[766px] tablet:w-[678px] tablet:pb-6 tablet:pl-8 tablet:pr-8 tablet:pt-6 pc:h-[763px] pc:w-[730px] pc:pl-[18px] pc:pt-[30px]">
        <ModalHeader
          title={card?.title || null}
          onClick={handleClickMenu}
          onClose={onClose}
        />
        <ModalContent columnTitle={column.title} card={card} />

        {commentList && (
          <ModalComment
            commentList={commentList}
            onSubmit={handleSubmitComment}
          />
        )}
      </div>
    </div>
  );
}
