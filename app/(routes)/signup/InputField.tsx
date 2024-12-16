const FIELD_STYLE = 'w-full flex flex-col gap-2';
const FIEDL_LABEL_STYLE = 'text-black-333236 select-none';
const FIELD_INPUT_STYLE =
  'rounded-lg border border-gray-D9D9D9 px-4 py-3.5 placeholder:select-none placeholder:text-gray-9FA6B2';

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
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ name, value, onChange }: InputFieldProps) {
  return (
    <fieldset className={FIELD_STYLE}>
      <label className={FIEDL_LABEL_STYLE} htmlFor={name}>
        {INPUT_FIELD_TEXT[name].label}
      </label>
      <input
        className={FIELD_INPUT_STYLE}
        id={name}
        name={name}
        type="text"
        value={value}
        placeholder={INPUT_FIELD_TEXT[name].placeholder}
        onChange={onChange}
        required
      />
    </fieldset>
  );
}
