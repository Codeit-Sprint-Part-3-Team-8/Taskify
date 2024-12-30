interface GenericModalProps {
  modalSize?: string;
  title?: string | React.ReactNode;
  onClose: () => Promise<void> | void;
  mainContent: React.ReactNode;
  footerContent?: React.ReactNode;
  className?: string;
}

const GenericModal = ({
  title,
  onClose,
  mainContent,
  footerContent,
  className = '',
}: GenericModalProps) => {
  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-000000/30 text-black-333236"
      onClick={handleClose}
    >
      <div
        className={`rounded-xl bg-white p-8 shadow-xl mobile:w-[20rem] tablet:w-[32rem] ${className}`}
      >
        {title && (
          <header className="mb-6 w-full">
            <h1 className="text-[1.375rem] font-semibold leading-tight">
              {title}
            </h1>
          </header>
        )}
        <main className="mb-6 w-full">{mainContent}</main>
        {footerContent && <footer className="w-full">{footerContent}</footer>}
      </div>
    </div>
  );
};

export default GenericModal;
