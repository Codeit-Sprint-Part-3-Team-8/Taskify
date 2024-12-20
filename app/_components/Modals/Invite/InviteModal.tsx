import GenericModal from '@/_components/Modals/GenericModal';
import Button from '@/_components/Button/Button';
import Input from '@/_components/Input/Input';
import { ModalApi } from '@/api/modalApi';
import { useState } from 'react';

const BUTTON_SIZE =
  'tablet:w-[16rem] tablet:h-[3.375rem] mobile:w-[9rem] mobile:h-[3.375rem]';

interface InviteModalProps {
  onClose: () => Promise<void> | void;
  dashboardId: string;
}

const InviteModal = ({ onClose, dashboardId }: InviteModalProps) => {
  const [invitationEmail, setInvitationEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 이메일 유효성 검사
  const isEmailValid = invitationEmail.trim().length > 0;

  const handleClosingModal = () => {
    onClose();
    setInvitationEmail('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await ModalApi.createInvitation(invitationEmail, dashboardId);
      handleClosingModal();
    } catch (error) {
      alert('초대에 실패했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const mainContent = (
    <Input
      value={invitationEmail}
      onChange={(e) => setInvitationEmail(e.target.value)}
      placeholder="초대할 이메일을 입력해주세요."
      customStyle="w-full h-10"
      disabled={isLoading}
    />
  );

  const footerContent = (
    <div className="mt-6 flex gap-4">
      <Button
        backgroundColor="white"
        customStyle={BUTTON_SIZE}
        onClick={handleClosingModal}
        disabled={isLoading}
      >
        취소
      </Button>
      <Button
        backgroundColor="purple"
        customStyle={BUTTON_SIZE}
        onClick={handleSubmit}
        disabled={isLoading || !isEmailValid}
      >
        초대
      </Button>
    </div>
  );

  return (
    <GenericModal
      title="멤버 초대"
      onClose={handleClosingModal}
      mainContent={mainContent}
      footerContent={footerContent}
    />
  );
};

export default InviteModal;
