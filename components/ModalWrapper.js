// components/ModalWrapper.js
import ReactModal from 'react-modal';

ReactModal.setAppElement('#__next');

const ModalWrapper = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'static',
          padding: '2rem',
          background: '#fff',
          borderRadius: '8px',
          maxWidth: '500px',
          margin: 'auto',
          border: 'none',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default ModalWrapper;
