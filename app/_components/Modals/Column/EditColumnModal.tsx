import GenericModal from '@/_components/Modals/GenericModal';
import Button from '@/_components/Button/Button';
import Input from '@/_components/Input/Input';
import { ModalApi } from '@/api/modalApi';
import { useState } from 'react';

const BUTTON_SIZE =
  'tablet:w-[16rem] tablet:h-[3.375rem] mobile:w-[9rem] mobile:h-[3.375rem]';

interface EditColumnModalProps {
  onClose: () => Promise<void> | void;
  columnId: string;
  selectedColumnName: string;
  initialTitle?: string;
}

const EditColumnModal = ({ onClose }: EditColumnModalProps) => {
  const initialTitle = 'initialTitle'; // 제거하시고 불러온 초기 컬럼 이름 사용하시면 됩니다
  const columnId = 'columnId'; // 제거하시고 불러온 컬럼 ID 사용하시면 됩니다

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
      await ModalApi.deleteColumn(columnId);
    } catch (error) {
      alert('컬럼 삭제에 실패했습니다.');
      console.error(error);
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

    try {
      await ModalApi.updateColumn({
        columnId: columnId,
        title: editedColumnName,
      });
    } catch (error) {
      alert('컬럼 수정에 실패했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const mainContent = (
    <Input
      value={editedColumnName}
      onChange={(e) => setEditedColumnName(e.target.value)}
      placeholder="컬럼 이름을 입력해주세요."
      customStyle="w-full h-10"
      disabled={isLoading}
      initialvalue={initialTitle}
    />
  );

  const footerContent = (
    <div className="mt-6 flex gap-4">
      <Button
        backgroundColor="white"
        customStyle={BUTTON_SIZE}
        onClick={handleDeleteColumn}
        disabled={isLoading}
      >
        삭제
      </Button>
      <Button
        backgroundColor="purple"
        customStyle={BUTTON_SIZE}
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
