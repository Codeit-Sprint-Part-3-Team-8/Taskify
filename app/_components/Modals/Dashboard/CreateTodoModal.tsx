import GenericModal from '@/_components/Modals/GenericModal';
import ModalInput from '@/_components/Modals/ModalInput';
import DropdownMenu from '@/_components/Dropdown/Dropdown';
import icDropdownArrow from '@images/icon/ic-dropdown-arrow.svg';
import Image from 'next/image';
import { CalendarIcon, X } from 'lucide-react';
import { Calendar } from '@/_components/Calendar/Calendar';
import { format } from 'date-fns';
import { useState, KeyboardEvent } from 'react';
import Button from '@/_components/Button/Button';
import { ko } from 'date-fns/locale';
import { createCard } from '@/api/cards.api';
import ImageUpload from '@/_components/Modals/ImageUpload';

const BUTTON_SIZE =
  'tablet:w-[16rem] tablet:h-[3.375rem] mobile:w-[9rem] mobile:h-[3.375rem]';

interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export default function CreateTodoModal({
  onClose,
  dashboardId,
  columnId,
  members,
}: {
  onClose: () => void;
  dashboardId: number;
  columnId: number;
  members: Member[];
}) {
  const [assigneeUserId, setAssigneeUserId] = useState<Member['id']>(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [deadline, setDeadline] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState('');

  const IS_INPUT_VALID =
    title.trim().length > 0 && description.trim().length > 0;

  const handleClosingModal = () => {
    onClose();
  };

  // api test용 함수, dev merge 시 제거 예정
  // const handleSubmitTest = () => {
  //   const apiData = {
  //     assigneeUserId: assigneeUserId,
  //     dashboardId: dashboardId,
  //     columnId: columnId,
  //     title: title,
  //     description: description,
  //     dueDate: deadline,
  //     tags: tags,
  //     imageUrl: imageUrl,
  //   };
  //   console.log(apiData);
  // };

  const handleCreateTodo = async () => {
    setIsLoading(true);
    try {
      await createCard({
        assigneeUserId: assigneeUserId,
        dashboardId: dashboardId,
        columnId: columnId,
        title: title,
        description: description,
        dueDate: deadline,
        tags: tags,
        imageUrl: imageUrl,
      });

      handleClosingModal();
    } catch (error) {
      alert('할 일 생성에 실패했습니다.');
      console.error('할 일 생성 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const mainContent = (
    <div className="flex flex-col gap-2">
      {/* 담당자 섹션 */}
      <div className="flex flex-col gap-2">
        <label className="select-none text-black-333236">담당자</label>
        <DropdownMenu
          buttonClassName="flex h-10 w-full items-center justify-between rounded-xl border border-gray-D9D9D9 px-3 text-left"
          menuClassName="w-36 absolute left-0 z-10"
          trigger={
            <>
              <span className="text-gray-9FA6B2">
                {assigneeUserId
                  ? 'members.find((member) => member.id === assigneeUserId)?.nickname' //
                  : '이름을 입력해 주세요'}
              </span>
              <div>
                <Image
                  src={icDropdownArrow}
                  alt="dropdown arrow"
                  width={16}
                  height={16}
                />
              </div>
            </>
          }
        >
          {/* 현재 page에서 members를 받아오고 있지 않아 오류가 
             발생함으로 주석 처리 dev merge 시 주석 해제 예정 */}

          {members.map((member) => (
            <button
              onClick={() => setAssigneeUserId(member.id)}
              className="flex items-center gap-8 px-4 py-2"
              key={member.id}
            >
              <div>{member.profileImageUrl}</div>
              <div>{member.nickname}</div>
            </button>
          ))}
        </DropdownMenu>
      </div>

      {/* 제목 섹션 */}
      <ModalInput
        name="제목"
        label="제목 *"
        placeholder="제목을 입력해 주세요"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        disabled={isLoading}
      />

      {/* 설명 섹션 */}
      <ModalInput
        name="설명"
        label="설명 *"
        placeholder="설명을 입력해 주세요"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        disabled={isLoading}
      />

      {/* 마감일 섹션 */}
      <div className="flex w-full flex-col gap-2">
        <label className="select-none text-black-333236">마감일</label>
        <DropdownMenu
          buttonClassName="flex h-10 w-full items-center rounded-xl border border-gray-D9D9D9 px-3 text-left"
          menuClassName="w-72 absolute left-0 z-10"
          trigger={
            <>
              <CalendarIcon className="h-5 w-5 text-gray-9FA6B2" />
              <span className="text-gray-9FA6B2">
                {deadline
                  ? format(deadline, 'PPP', { locale: ko })
                  : '날짜를 선택해 주세요'}
              </span>
            </>
          }
        >
          <div className="w-full p-3">
            <Calendar
              mode="single"
              selected={deadline ? new Date(deadline) : undefined}
              onSelect={(date) =>
                setDeadline(date ? date.toISOString() : undefined)
              }
              initialFocus
            />
          </div>
        </DropdownMenu>
      </div>

      {/* 태그 섹션 */}
      <div className="flex flex-col gap-2">
        <ModalInput
          name="태그"
          label="태그"
          placeholder="입력 후 Enter를 눌러주세요"
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          value={tagInput}
          disabled={isLoading}
        />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 rounded-xl bg-gray-100 px-3 py-1"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 이미지 섹션 */}
      <ImageUpload
        imageUrl={imageUrl}
        onImageChange={setImageUrl}
        isLoading={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-6 flex gap-4">
      <Button
        backgroundColor="white"
        className={BUTTON_SIZE}
        onClick={handleClosingModal}
        disabled={isLoading}
      >
        취소
      </Button>
      <Button
        backgroundColor="purple"
        className={BUTTON_SIZE}
        onClick={handleCreateTodo}
        disabled={isLoading || !IS_INPUT_VALID}
      >
        생성
      </Button>
    </div>
  );

  return (
    <GenericModal
      title="할 일 생성"
      mainContent={mainContent}
      footerContent={footerContent}
      onClose={handleClosingModal}
    />
  );
}
