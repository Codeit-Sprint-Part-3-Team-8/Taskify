const FIELD_STYLES = 'w-full flex flex-col gap-2';
const FIELD_LABEL_STYLES = 'text-black-333236 select-none';
const FIELD_INPUT_STYLES =
  'h-10 rounded-xl border border-gray-D9D9D9 px-3 placeholder:select-none placeholder:text-gray-9FA6B2';

const MODAL_INPUT_TEXT: {
  [key: string]: {
    label: string;
    placeholder: string;
  };
} = {
  dashboard: {
    label: '대시보드 이름',
    placeholder: '대시보드 이름을 입력해주세요',
  },
  column: {
    label: '컬럼 이름',
    placeholder: '컬럼 이름을 입력해주세요',
  },
  invitation: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
  },
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  initialValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  disabled: boolean;
}

const ModalInput = ({
  name,
  label,
  placeholder,
  initialValue,
  onChange,
  onKeyDown,
  value,
  disabled,
}: InputProps) => {
  return (
    <fieldset className={FIELD_STYLES}>
      <label className={FIELD_LABEL_STYLES}>
        {label || MODAL_INPUT_TEXT[name].label}
      </label>
      <input
        className={FIELD_INPUT_STYLES}
        id={name}
        name={name}
        type="text"
        defaultValue={initialValue}
        value={value}
        placeholder={placeholder || MODAL_INPUT_TEXT[name].placeholder}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required
      />
    </fieldset>
  );
};

export default ModalInput;
