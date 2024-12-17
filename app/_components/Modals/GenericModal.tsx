interface GenericModalProps {
  title?: string;
  onClose?: () => void;
  mainContent: React.ReactNode;
  footerContent: React.ReactNode;
}

const GenericModal = ({
  title,
  onClose,
  mainContent,
  footerContent,
}: GenericModalProps) => {
  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black-000000/30"
      onClick={handleClose}
    >
      <div className="rounded-lg bg-white p-4">
        {title && (
          <header>
            <div>{title}</div>
          </header>
        )}
        <main>{mainContent}</main>
        <footer>{footerContent}</footer>
      </div>
    </div>
  );
};

export default GenericModal;
