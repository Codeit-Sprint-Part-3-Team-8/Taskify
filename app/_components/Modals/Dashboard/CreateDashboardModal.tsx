import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GenericModal from '@/_components/Modals/GenericModal';
import Button from '@/_components/Button/Button';
import Input from '@/_components/Input/Input';
import CheckIcon from '@images/icon/check.svg';
import { ModalApi } from '@/api/modalApi';
import { useState } from 'react';

const BUTTON_SIZE =
  'tablet:w-[16rem] tablet:h-[3.375rem] mobile:w-[9rem] mobile:h-[3.375rem]';

interface ColorOption {
  label: string;
  value: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { label: 'green', value: '#7ac555' },
  { label: 'purple', value: '#760dde' },
  { label: 'orange', value: '#ffa500' },
  { label: 'lightblue', value: '#76a5ea' },
  { label: 'pink', value: '#e876ea' },
];

const CreateDashboardModal = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const [newDashboardName, setNewDashboardName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].value);
  const [isLoading, setIsLoading] = useState(false);

  // 대시보드 이름의 빈 값 여부를 boolean으로 반환
  const isNameValid = newDashboardName.trim().length > 0;

  // 모달 닫기 & state 초기화
  const handleClosingModal = () => {
    onClose();
    setNewDashboardName('');
    setSelectedColor(COLOR_OPTIONS[0].value);
  };

  // 대시보드 생성 후 대시보드 페이지로 이동
  const handleCreateDashboard = async () => {
    if (!isNameValid) {
      alert('대시보드 이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await ModalApi.createDashboard({
        title: newDashboardName,
        color: selectedColor,
      });

      handleClosingModal();
      router.push(`/dashboard/${response.id.toString()}`);
    } catch (error) {
      alert('대시보드 생성에 실패했습니다.');
      console.error('대시보드 생성 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const mainContent = (
    <div className="flex flex-col gap-3">
      <Input
        value={newDashboardName}
        onChange={(e) => setNewDashboardName(e.target.value)}
        placeholder="새로운 대시보드 이름을 입력해주세요."
        customStyle="w-full h-10"
        disabled={isLoading}
      />

      <div className="flex gap-3">
        {COLOR_OPTIONS.map((color) => (
          <button
            key={color.label}
            type="button"
            className="focus:ring-primary flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={() => setSelectedColor(color.value)}
            style={{ backgroundColor: color.value }}
            aria-label={`${color.label} 색상 선택`}
            disabled={isLoading}
          >
            {selectedColor === color.value && (
              <Image src={CheckIcon} alt="선택된 색상" width={20} height={20} />
            )}
          </button>
        ))}
      </div>
    </div>
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
        onClick={handleCreateDashboard}
        disabled={isLoading || !isNameValid}
      >
        생성
      </Button>
    </div>
  );

  return (
    <GenericModal
      title="새로운 대시보드"
      onClose={handleClosingModal}
      mainContent={mainContent}
      footerContent={footerContent}
    />
  );
};

export default CreateDashboardModal;
