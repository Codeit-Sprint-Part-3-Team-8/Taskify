import { useCallback, useState } from 'react';
import UserProfile from '@/_components/UserProfile/UserProfile';
import { formatDate } from 'date-fns';

interface CommentProps {
  userId: number;
  commentId: number;
  authorId: number;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  content: string;
  removeComment: (commentId: number) => void;
  updateComment: (commentId: number, newContent: string) => void;
}

export default function CommentList({
  userId,
  commentId,
  authorId,
  nickname,
  profileImageUrl,
  createdAt,
  content,
  removeComment,
  updateComment,
}: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    if (editedContent.trim() !== content) {
      updateComment(commentId, editedContent);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleDelete = useCallback(() => {
    removeComment(commentId);
  }, [removeComment, commentId]);

  return (
    <div className="flex gap-4">
      <div>
        <UserProfile
          profileImageUrl={profileImageUrl}
          onlyImg
          nickname={nickname}
        />
      </div>
      <div className="flex flex-col">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-black-323236 text-xs font-semibold">
            {nickname}
          </span>
          <span className="text-[0.625rem] font-normal text-gray-9FA6B2">
            {formatDate(createdAt, 'yyyy.MM.dd HH:mm')}
          </span>
        </div>
        {isEditing ? (
          <div className="flex flex-col">
            <textarea
              className="w-full rounded-md border border-gray-9FA6B2 p-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
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
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        ) : (
          <div className="text-black-323236 mb-1 text-xs font-normal">
            {content}
          </div>
        )}
        {!isEditing && userId === authorId && (
          <div className="flex gap-2">
            <button
              type="button"
              className="text-[0.75rem] font-normal text-gray-787486"
              onClick={() => setIsEditing(true)}
            >
              수정
            </button>
            <button
              type="button"
              className="text-[0.75rem] font-normal text-gray-787486"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
