import Dropdown from '@/_components/Dropdown/Dropdown';
import { MoreVertical, X } from 'lucide-react';
import { useCallback } from 'react';

interface ModalHeaderProps {
  title: string | null;
  onClick: (value: 'edit' | 'delete') => void;
  onClose: () => void;
}

export default function ModalHeader({
  title,
  onClick,
  onClose,
}: ModalHeaderProps) {
  const handleClickEdit = useCallback(() => onClick('edit'), [onClick]);
  const handleClickDelete = useCallback(() => onClick('delete'), [onClick]);

  return (
    <div className="mb-6 flex flex-col-reverse items-center justify-between gap-4 tablet:flex-row">
      <h1 className="w-full text-start text-xl font-bold tablet:w-auto">
        {title}
      </h1>
      <div className="flex w-full items-center justify-end gap-4">
        <Dropdown
          buttonClassName="rounded-full"
          menuClassName="absolute right-2 flex z-50 flex-col items-center p-2 w-[93px] rounded-[6px] border border-gray-D9D9D9 bg-white"
          trigger={<MoreVertical className="h-4 w-4 tablet:h-6 tablet:w-6" />}
        >
          <button
            onClick={handleClickEdit}
            className="h-[32px] w-[81px] rounded-sm text-[14px] font-normal hover:bg-violet-8 hover:text-violet-5534DA"
          >
            수정하기
          </button>
          <button
            onClick={handleClickDelete}
            className="h-[32px] w-[81px] rounded-sm text-[14px] font-normal hover:bg-violet-8 hover:text-violet-5534DA"
          >
            삭제하기
          </button>
        </Dropdown>
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          <X className="h-5 w-5 tablet:h-7 tablet:w-7" />
        </button>
      </div>
    </div>
  );
}
