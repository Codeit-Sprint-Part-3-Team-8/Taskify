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
      <div className="h-[710px] w-[327px] rounded-lg bg-white p-4 shadow-lg transition-all tablet:h-[766px] tablet:w-[678px] tablet:pb-6 tablet:pl-8 tablet:pr-8 tablet:pt-6 pc:h-[763px] pc:w-[730px] pc:pl-[18px] pc:pt-[30px]">
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

// <div className="relative h-[710px] w-[327px] rounded-lg bg-white p-4 shadow-lg tablet:h-[766px] tablet:w-[678px] tablet:pb-6 tablet:pl-8 tablet:pr-8 tablet:pt-6 pc:h-[763px] pc:w-[730px] pc:pl-[18px] pc:pt-[30px]">
//   <h1 className="text-xl font-bold tablet:mb-6 tablet:text-2xl pc:mb-8">
//     {cardData?.title}
//   </h1>
//   <div className="absolute right-4 top-4 flex items-center gap-4 tablet:right-8 tablet:top-6 tablet:gap-6 pc:right-[30px] pc:top-[30px]">
//     <Dropdown
//       buttonClassName="rounded-full"
//       menuClassName="absolute z-50 flex flex-col items-center p-2 w-[93px] rounded-[6px] border border-gray-D9D9D9 bg-white"
//       trigger={
//         <MoreVertical className="h-4 w-4 tablet:h-6 tablet:w-6" />
//       }
//     >
//       <button
//         onClick={() => handleClickMenu('edit')}
//         className="h-[32px] w-[81px] rounded-sm text-[14px] font-normal hover:bg-violet-8 hover:text-violet-5534DA"
//       >
//         수정하기
//       </button>
//       <button
//         onClick={() => handleClickMenu('delete')}
//         className="h-[32px] w-[81px] rounded-sm text-[14px] font-normal hover:bg-violet-8 hover:text-violet-5534DA"
//       >
//         삭제하기
//       </button>
//     </Dropdown>
//     <button
//       onClick={onClose}
//       className="rounded-full p-1 hover:bg-gray-100"
//     >
//       <X className="h-5 w-5 tablet:h-7 tablet:w-7" />
//     </button>
//   </div>

//   <div className="absolute flex flex-col rounded-xl border border-gray-D9D9D9 tablet:right-8 tablet:top-20 tablet:h-[155px] tablet:w-[181px] tablet:gap-4 tablet:pl-4 tablet:pt-[14.5px] pc:right-7 pc:top-20 pc:h-[9.6875rem] pc:w-[12.5rem]">
//     <div>
//       <label className="text-black-323236 mb-[6px] block text-sm font-semibold">
//         담당자
//       </label>
//       <div className="flex items-center gap-2">
//         <UserProfile
//           profileImageUrl={cardData?.assignee?.profileImageUrl}
//           onlyImg
//           nickname={cardData?.assignee?.nickname || ''}
//         />
//         <span className="text-md font-normal">
//           {cardData?.assignee?.nickname || ''}
//         </span>
//       </div>
//     </div>
//     <div className="">
//       <label className="text-black-323236 block text-sm font-semibold">
//         마감일
//       </label>
//       <div className="text-md font-normal">{cardData?.dueDate}</div>
//     </div>
//   </div>

//   <div className="flex h-full gap-10">
//     <div className="relative flex h-[43.25rem] w-[420px] flex-col">
//       <div className="mb-4 flex w-full items-center gap-2">
//         <div className="flex items-center gap-1 rounded-full bg-violet-8 tablet:h-7 tablet:w-16">
//           <span className="ml-[6px] text-3xl text-violet-5534DA">
//             •
//           </span>
//           <span className="mt-1 text-xs text-violet-5534DA">
//             {column.title}
//           </span>
//         </div>
//         <div className="flex gap-2">
//           {cardData?.tags.map((tag) => (
//             <span
//               key={tag}
//               className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="mb-6">
//         <p className="mb-4 text-md font-normal text-black-000000">
//           {cardData?.description}
//         </p>
//         {cardData?.imageUrl && (
//           <Image
//             src={cardData.imageUrl}
//             alt="Task illustration"
//             className="mb-6 h-auto w-full rounded-lg object-contain"
//             width={445}
//             height={260}
//           />
//         )}
//       </div>

//       <div className="absolute bottom-2 left-0 mb-[1.5rem] flex h-[16.0625rem] w-full flex-col">
//         <div className="relative mb-6 flex w-full">
//           <div className="w-full">
//             <label className="text-black-323236 text-noraml mb-[6px] block font-medium">
//               댓글
//             </label>
//             <textarea
//               name="comment"
//               placeholder="댓글 작성하기"
//               className="h-[110px] w-full resize-none rounded-xl border border-gray-D9D9D9 p-4 focus:border-gray-D9D9D9 focus:outline-none"
//               onChange={(e) => setNewComment(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   hanndleClickSubmit();
//                 }
//               }}
//               value={newComment}
//               disabled={isSubmitting}
//             />
//           </div>
//           <button
//             onClick={hanndleClickSubmit}
//             disabled={isSubmitting || !newComment.trim()}
//             className="absolute bottom-[0.75rem] right-[0.6875rem] rounded-lg border border-gray-D9D9D9 bg-white px-4 text-xs font-medium text-violet-5534DA tablet:h-8 tablet:w-[77px] pc:h-[2rem] pc:w-[5.1875rem]"
//           >
//             입력
//           </button>
//         </div>

//         <div className="flex-1 space-y-4 overflow-y-auto">
//           {commentsResponse?.comments.map(
//             ({
//               id: commentId,
//               author: { id: authorId, nickname, profileImageUrl },
//               createdAt,
//               content,
//             }) => (
//               <CommentList
//                 key={`comment_${commentId}`}
//                 userId={userId}
//                 commentId={commentId}
//                 authorId={authorId}
//                 nickname={nickname}
//                 profileImageUrl={profileImageUrl}
//                 createdAt={createdAt}
//                 content={content}
//                 removeComment={removeComment}
//                 updateComment={editComment}
//               />
//             ),
//           )}
//           {commentsResponse?.cursorId && <div ref={endPoint} />}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
