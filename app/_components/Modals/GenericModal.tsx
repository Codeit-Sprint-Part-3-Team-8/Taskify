interface GenericModalProps {
  title?: string;
  onClose: () => Promise<void> | void;
  mainContent: React.ReactNode;
  footerContent: React.ReactNode;
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
      className="fixed inset-0 flex items-center justify-center bg-black-000000/30 text-black-333236"
      onClick={handleClose}
    >
      <div
        className={`w-[32rem] rounded-[1.25rem] bg-white p-8 shadow-xl ${className}`}
      >
        {title && (
          <header className="mb-6">
            <h1 className="text-[1.375rem] font-semibold leading-tight">
              {title}
            </h1>
          </header>
        )}
        <main className="mb-6">{mainContent}</main>
        <footer>{footerContent}</footer>
      </div>
    </div>
  );
};

export default GenericModal;
