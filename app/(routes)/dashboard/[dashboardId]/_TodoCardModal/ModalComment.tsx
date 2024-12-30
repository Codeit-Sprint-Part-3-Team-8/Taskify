import UserProfile from '@/_components/UserProfile/UserProfile';
import { CommentListType, CommentType } from '@/_types/comments.type';
import { UserType } from '@/_types/users.type';
import { formatDate } from 'date-fns';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface ModalCommentProps {
  user: UserType;
  commentList: CommentListType;
  onSubmit: (content: string) => void;
  onUpdate: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  disabled: boolean;
}

export default function ModalComment({
  user,
  commentList,
  onSubmit,
  onUpdate,
  onDelete,
  disabled,
}: ModalCommentProps) {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const { comments } = commentList;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(content);
  };

  const handleEditChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(event.target.value);
  };

  const handleClickEdit = (commentId: number, initContent: string) => {
    setIsEditing(commentId);
    setEditedContent(initContent);
  };

  const handleUpdate = (commentId: number) => {
    onUpdate(commentId, editedContent);
    setIsEditing(null);
    setEditedContent('');
  };

  const handleCancel = () => {
    setEditedContent('');
    setIsEditing(null);
  };

  const handleDelete = (commentId: number) => {
    onDelete(commentId);
  };

  useEffect(() => {
    setContent('');
  }, [commentList]);

  return (
    <div className="flex flex-col">
      <form className="relative mb-2 w-full" onSubmit={handleSubmit}>
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
          className="absolute bottom-[1.25rem] right-[1.3rem] h-[28px] w-[84px] rounded-lg border border-gray-D9D9D9 bg-white px-4 text-xs font-medium text-violet-5534DA disabled:text-gray-787486"
          disabled={disabled}
        >
          입력
        </button>
      </form>

      <div className="max-h-[120px] flex-1">
        <div className="space-y-4">
          {comments.map((comment: CommentType) => (
            <div key={'comment-' + comment.id} className="flex gap-4">
              <UserProfile
                profileImageUrl={comment.author.profileImageUrl}
                onlyImg
                nickname={comment.author.nickname}
              />
              <div className="flex flex-col">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-black-323236 text-xs font-semibold">
                    {comment.author.nickname}
                  </span>
                  <span className="text-[0.625rem] font-normal text-gray-9FA6B2">
                    {formatDate(comment.createdAt, 'yyyy.MM.dd HH:mm')}
                  </span>
                </div>
                {isEditing === comment.id ? (
                  <div className="flex flex-col">
                    <textarea
                      className="w-full rounded-md border border-gray-9FA6B2 p-2"
                      value={editedContent}
                      onChange={handleEditChange}
                    />
                    <button
                      type="button"
                      className="text-sm text-gray-787486"
                      onClick={handleCancel}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="text-sm text-gray-787486"
                      onClick={() => handleUpdate(comment.id)}
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <div className="text-black-323236 mb-1 text-xs font-normal">
                    {comment.content}
                  </div>
                )}
                {isEditing !== comment.id && user.id === comment.author.id && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-[0.75rem] font-normal text-gray-787486"
                      onClick={() =>
                        handleClickEdit(comment.id, comment.content)
                      }
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className="text-[0.75rem] font-normal text-gray-787486"
                      onClick={() => handleDelete(comment.id)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
