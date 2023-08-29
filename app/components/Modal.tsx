interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { isModalOpen, setIsModalOpen, children } = props;
  return (
    <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
      <div className='modal-box'>
        <button
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          onClick={() => setIsModalOpen(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
