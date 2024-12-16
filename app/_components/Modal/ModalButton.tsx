interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: 'purple' | 'white';
  children: React.ReactNode;
}

const BUTTON_BASE_STYLES = 
  'mobile:w-[144px] mobile:h-[54px] tablet:w-[256px] tablet:h-[54px] font-medium text-base rounded-lg';

const BUTTON_VARIANT_STYLES = {
  purple: 'bg-violet-5534DA text-white-FFFFFF',
  white: 'bg-white-FFFFFF text-gray-787486 border border-gray-D9D9D9'
};

const ModalButton = ({
  backgroundColor,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${BUTTON_VARIANT_STYLES[backgroundColor]} ${BUTTON_BASE_STYLES}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default ModalButton;