import GenericModal from '@/_components/Modals/GenericModal';
import Button from '@/_components/Button/Button';
import ModalInput from '@/_components/Modals/ModalInput';
import { createColumn } from '@/api/columns.api';
import { useState } from 'react';

const BUTTON_SIZE =
  'tablet:w-[16rem] tablet:h-[3.375rem] mobile:w-[9rem] mobile:h-[3.375rem]';

const CreateColumnModal = ({
  onClose,
  dashboardId,
}: {
  onClose: () => Promise<void> | void;
  dashboardId: number;
}) => {
  const [newColumnName, setNewColumnName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 컬럼 이름 유효성 검사
  const isNameValid = newColumnName.trim().length > 0;

  // 모달 닫기 & state 초기화
  const handleClosingModal = () => {
    onClose();
    setNewColumnName('');
  };

  // 컬럼 생성
  const handleCreateColumn = async () => {
    if (!isNameValid) {
      alert('컬럼 이름을 입력해주세요.');
      return;
    }
    setIsLoading(true);

    try {
      await createColumn({
        title: newColumnName,
        dashboardId: dashboardId,
      });
    } catch (error) {
      alert('컬럼 생성에 실패했습니다.');
      console.error(error);
    } finally {
      handleClosingModal();
      setIsLoading(false);
    }
  };

  const mainContent = (
    <ModalInput
      name="column"
      value={newColumnName}
      onChange={(e) => setNewColumnName(e.target.value)}
      disabled={isLoading}
    />
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
        onClick={handleCreateColumn}
        disabled={isLoading || !isNameValid}
      >
        생성
      </Button>
    </div>
  );

  return (
    <GenericModal
      title="새 컬럼 생성"
      onClose={handleClosingModal}
      mainContent={mainContent}
      footerContent={footerContent}
    />
  );
};

export default CreateColumnModal;
