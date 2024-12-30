import { CommentListType, CommentType } from '@/_types/comments.type';
import { ChangeEvent, useState } from 'react';

interface ModalCommentProps {
  commentList: CommentListType;
  onSubmit: (content: string) => void;
}

export default function ModalComment({
  commentList,
  onSubmit,
}: ModalCommentProps) {
  const [content, setContent] = useState('');
  const { comments } = commentList;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(content);
  };

  return (
    <div className="flex h-[180px] flex-col">
      <div className="relative mb-2 w-full">
        <label className="text-black-323236 mb-[6px] block text-md font-medium">
          댓글
        </label>
        <textarea
          name="comment"
          placeholder="댓글 작성하기"
          className="h-[70px] w-full resize-none rounded-xl border border-gray-D9D9D9 p-4 text-xs placeholder:text-xs placeholder:text-gray-9FA6B2 focus-visible:outline-violet-5534DA"
          onChange={handleChange}
          value={content}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="absolute bottom-[1.25rem] right-[1.3rem] h-[28px] w-[84px] rounded-lg border border-gray-D9D9D9 bg-white px-4 text-xs font-medium text-violet-5534DA"
        >
          입력
        </button>
      </div>

      <div className="max-h-[80px] flex-1 overflow-y-auto">
        <div className="space-y-4">
          {comments.map((comment: CommentType) => (
            <div key={'comment-' + comment.id}>{comment.content}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// <CommentList
//   key={`comment_${comment.id}`}
//   userId={comment}
//   commentId={comment.id}
//   authorId={comment.authorId}
//   nickname={comment.nickname}
//   profileImageUrl={comment.profileImageUrl}
//   createdAt={comment.createdAt}
//   content={content}
//   removeComment={removeComment}
//   updateComment={editComment}
// />
