interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: 'purple' | 'white';
  children: React.ReactNode;
  customStyle?: string;
}

const BUTTON_COMMON_STYLES = 'font-medium text-base rounded-lg';

const BUTTON_VARIANT_STYLES = {
  purple: 'bg-violet-5534DA text-white',
  white: 'bg-white text-gray-787486 border border-gray-D9D9D9',
};

const Button = ({
  backgroundColor,
  children,
  customStyle,
}: ButtonProps) => {
  return (
    <button
      className={`${BUTTON_VARIANT_STYLES[backgroundColor]} ${BUTTON_COMMON_STYLES} ${customStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
