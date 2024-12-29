import Button from '@/_components/Button/Button';

interface TodoFormFooterProps {
  type: 'create' | 'edit';
  isValid: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

const BUTTON_SIZE =
  'tablet:w-[16rem] tablet:h-[3.375rem] mobile:w-[9rem] mobile:h-[3.375rem]';

export function TodoFormFooter({
  type,
  isValid,
  isLoading,
  onSubmit,
  onClose,
}: TodoFormFooterProps) {
  return (
    <div className="flex gap-3">
      <Button
        backgroundColor="white"
        className={BUTTON_SIZE}
        onClick={onClose}
        disabled={isLoading}
      >
        취소
      </Button>
      <Button
        backgroundColor="purple"
        className={BUTTON_SIZE}
        onClick={onSubmit}
        disabled={isLoading || !isValid}
      >
        {type === 'create' ? '생성' : '수정'}
      </Button>
    </div>
  );
}
