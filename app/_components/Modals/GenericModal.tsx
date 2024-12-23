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
      className="z-1 fixed inset-0 flex items-center justify-center bg-black-000000/30"
      onClick={handleClose}
    >
      <div className={`rounded-lg bg-white p-6 shadow-lg ${className}`}>
        {title && (
          <header className="mb-4">
            <h1 className="text-xl font-semibold">{title}</h1>
          </header>
        )}
        <main className="mb-4">{mainContent}</main>
        <footer>{footerContent}</footer>
      </div>
    </div>
  );
};

export default GenericModal;
