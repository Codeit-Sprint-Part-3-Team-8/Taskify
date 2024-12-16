import ModalButton from '@/_components/Modals/ModalButton'

interface GenericModalProps {
  children: React.ReactNode
  leftButtonText: string
  rightButtonText: string
  onClose: () => void
  onSubmit?: () => void
}

const GenericModal = ({ children, leftButtonText, rightButtonText, onClose, onSubmit }: GenericModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4">
        {children}
        <footer>
          <div className="flex items-center justify-between tablet:gap-2 mobile:gap-[7px]">
            <ModalButton backgroundColor="white" onClick={onClose}>
              {leftButtonText}
            </ModalButton>
            <ModalButton backgroundColor="purple" onClick={onSubmit}>
              {rightButtonText}
            </ModalButton>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default GenericModal
