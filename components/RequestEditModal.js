import { useState } from 'react';
import ModalWrapper from './ModalWrapper';

const RequestEditModal = ({ image, onClose, onSave }) => {
  const [editRequest, setEditRequest] = useState('');

  const handleSave = () => {
    image.editRequest = editRequest;
    onSave(image);
    onClose();
  };

  return (
    <ModalWrapper isOpen={!!image} onRequestClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded">
          <h2 className="text-xl mb-2">Request Edit</h2>
          <textarea
            className="w-full h-20 border border-gray-300 p-2 mb-2"
            placeholder="Describe the edit you want to request"
            value={editRequest}
            onChange={(e) => setEditRequest(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-1 px-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white py-1 px-2 rounded ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default RequestEditModal;
