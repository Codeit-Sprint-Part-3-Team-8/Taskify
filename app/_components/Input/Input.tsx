const INPUT_COMMON_STYLES =
  'rounded-lg border border-gray-D9D9D9 placeholder:select-none placeholder:text-gray-9FA6B2';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  customStyle?: string;
  initialvalue?: string;
}

const Input = ({ customStyle, ...props }: InputProps) => {
  return (
    <input className={`${INPUT_COMMON_STYLES} ${customStyle}`} {...props} />
  );
};

export default Input;
