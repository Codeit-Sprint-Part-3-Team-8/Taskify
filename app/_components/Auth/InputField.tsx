import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const INPUT_FIELD_TEXT: {
  [key: string]: {
    label: string;
    placeholder: string;
  };
} = {
  email: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
  },
  nickname: {
    label: '닉네임',
    placeholder: '닉네임을 입력해주세요',
  },
  password: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
  },
  repeat: {
    label: '비밀번호 확인',
    placeholder: '비밀번호를 한 번 더 입력해주세요',
  },
};

interface InputFieldProps {
  name: string;
  type?: 'text' | 'password';
  value: string;
  validation: { isValid: boolean; message: string };
  label?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputField({
  name,
  type = 'text',
  value,
  validation,
  label,
  placeholder,
  onChange,
  onBlur,
}: InputFieldProps) {
  const [isVisible, setIsVisible] = useState(type !== 'password');
  const { isValid, message } = validation;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleType = () => {
    setIsVisible((prev) => !prev);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const INVALID_STYLES = ['outline', 'outline-1', 'outline-red-D6173A'];
    INVALID_STYLES.forEach((style) => {
      inputRef.current?.classList.toggle(style, !isValid && !!message);
    });
    /**
     * @todo focus 되었을 때 유효하지 않아고 보라색 아웃라인을 보여줄지 여부
     */
    inputRef.current?.classList.toggle(
      'focus-visible:outline-violet-5534DA',
      isValid || !message,
    );
  }, [isValid, message]);

  return (
    <fieldset className="relative flex w-full flex-col gap-2">
      <label className="select-none text-black-333236" htmlFor={name}>
        {label || INPUT_FIELD_TEXT[name].label}
      </label>
      <input
        ref={inputRef}
        className="rounded-lg border border-gray-D9D9D9 px-4 py-3.5 placeholder:select-none placeholder:text-gray-9FA6B2 focus-visible:outline-1 focus-visible:outline-violet-5534DA"
        id={name}
        name={name}
        type={isVisible ? 'text' : 'password'}
        value={value || ''}
        placeholder={placeholder || INPUT_FIELD_TEXT[name].placeholder}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      {type === 'password' && (
        <Image
          className="absolute right-3 top-12"
          width={24}
          height={24}
          priority={true}
          src={
            isVisible
              ? '/images/icon/icon-visibility-on.svg'
              : '/images/icon/icon-visibility-off.svg'
          }
          alt={type === 'password' ? '비밀번호 숨기기' : '비밀번호 표기'}
          onClick={handleToggleType}
        />
      )}
      <div className="h-4 text-sm text-red-D6173A">{message}</div>
    </fieldset>
  );
}
