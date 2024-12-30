import GenericModal from '@/_components/Modals/GenericModal';
import Button from '@/_components/Button/Button';
import ModalInput from '@/_components/Modals/ModalInput';
import { useState } from 'react';
import { updateColumn } from '@/api/columns.api';
import { deleteColumn } from '@/api/columns.api';
import { OnColumnHandlerType } from './[dashboardId]/Dashboard';

const BUTTON_SIZE =
  'tablet:w-[16rem] tablet:h-[3.375rem] mobile:w-[9rem] mobile:h-[3.375rem]';

interface EditColumnModalProps {
  onClose: () => Promise<void> | void;
  onColumnUpdated: OnColumnHandlerType;
  onColumnDeleted: OnColumnHandlerType;
  columnId: number;
  initialTitle?: string;
}

const EditColumnModal = ({
  onClose,
  onColumnUpdated,
  onColumnDeleted: onColumnDeleted,
  initialTitle = '',
  columnId,
}: EditColumnModalProps) => {
  const [editedColumnName, setEditedColumnName] = useState(initialTitle);
  const [isLoading, setIsLoading] = useState(false);

  // 컬럼 이름 유효성 검사
  const isNameValid = editedColumnName.trim().length > 0;

  // 컬럼 삭제
  const handleDeleteColumn = async () => {
    const isConfirmed = window.confirm(
      '칼럼의 모든 카드가 삭제됩니다. 계속하시겠습니까?',
    );

    if (!isConfirmed) {
      onClose();
      return;
    }
    setIsLoading(true);

    try {
      await deleteColumn({ columnId });
      onColumnDeleted({ id: columnId });
    } catch {
      alert('컬럼 삭제에 실패했습니다.');
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  // 컬럼 수정
  const handleUpdateColumn = async () => {
    if (!isNameValid) {
      alert('컬럼 이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await updateColumn({
        columnId: columnId,
        title: editedColumnName,
      });

      onColumnUpdated({ id: columnId, title: editedColumnName });
      onClose();
    } catch {
      alert('컬럼 수정에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const mainContent = (
    <ModalInput
      name="column"
      value={editedColumnName}
      onChange={(e) => setEditedColumnName(e.target.value)}
      disabled={isLoading}
    />
  );

  const footerContent = (
    <div className="mt-6 flex gap-4">
      <Button
        backgroundColor="white"
        className={BUTTON_SIZE}
        onClick={handleDeleteColumn}
        disabled={isLoading}
      >
        삭제
      </Button>
      <Button
        backgroundColor="purple"
        className={BUTTON_SIZE}
        onClick={handleUpdateColumn}
        disabled={
          isLoading || !isNameValid || editedColumnName === initialTitle
        }
      >
        수정
      </Button>
    </div>
  );

  return (
    <GenericModal
      title="컬럼 관리"
      onClose={onClose}
      mainContent={mainContent}
      footerContent={footerContent}
    />
  );
};

export default EditColumnModal;
