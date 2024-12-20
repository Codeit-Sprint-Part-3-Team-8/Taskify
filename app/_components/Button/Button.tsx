interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: 'purple' | 'white';
  children: React.ReactNode;
  customStyle?: string;
  disabled?: boolean;
}

const BUTTON_STYLES = {
  base: 'rounded-lg text-base font-medium transition-opacity',
  variant: {
    purple: 'bg-violet-5534DA text-white',
    white: 'bg-white text-gray-787486 border border-gray-D9D9D9',
  },
  state: {
    enabled: 'hover:opacity-80',
    disabled: 'opacity-50 cursor-not-allowed'
  }
} as const;

const Button = ({
  backgroundColor,
  children,
  customStyle,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        ${BUTTON_STYLES.variant[backgroundColor]}
        ${BUTTON_STYLES.base}
        ${disabled ? BUTTON_STYLES.state.disabled : BUTTON_STYLES.state.enabled}
        ${customStyle}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
