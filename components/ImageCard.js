// ImageCard.js
import { useState } from 'react';

const ImageCard = ({ image, onEdit, onRequestEdit }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={image.url} alt="" className="w-full h-32 object-cover" />
      <button
        className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
        onClick={() => onEdit(image)}
      >
        Edit
      </button>
      <button
        className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
        onClick={() => onRequestEdit(image)}
      >
        Request Edit
      </button>
      {image.editRequest && (
        <div className="bg-yellow-200 p-2 text-xs text-gray-700 mt-2 w-full">
          Edit Request: {image.editRequest}
        </div>
      )}
    </div>
  );
};

export default ImageCard;
