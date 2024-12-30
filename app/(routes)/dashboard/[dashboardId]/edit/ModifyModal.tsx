import Button from '@/_components/Button/Button';
import GenericModal from '@/_components/Modals/GenericModal';
import useAsync from '@/_hooks/useAsync';
import { deleteMember } from '@/api/member.api';

const BUTTON_SIZE =
  'tablet:w-[16rem] tablet:h-[3.375rem] mobile:w-[9rem] mobile:h-[3.375rem]';

interface ModifyModalProps {
  onClose: () => Promise<void> | void;
  onConfirm: () => Promise<void> | void;
  columnId: number;
  initialTitle?: string;
}

export default function ModifyModal({
  onClose,
  onConfirm,
  columnId,
}: ModifyModalProps) {
  const { loading, excute: deleteMemberAsync } = useAsync(deleteMember);

  const handleDeleteMebmer = async () => {
    await deleteMemberAsync({ memberId: columnId });
    onConfirm();
  };

  const footerContent = (
    <div className="mt-6 flex gap-4">
      <Button
        backgroundColor="white"
        className={BUTTON_SIZE}
        onClick={onClose}
        disabled={loading}
      >
        취소
      </Button>
      <Button
        backgroundColor="purple"
        className={BUTTON_SIZE}
        onClick={handleDeleteMebmer}
        disabled={loading}
      >
        삭제
      </Button>
    </div>
  );

  return (
    <GenericModal
      title="선택하신 구성원이 삭제됩니다."
      onClose={onClose}
      mainContent={<></>}
      footerContent={footerContent}
    />
  );
}
