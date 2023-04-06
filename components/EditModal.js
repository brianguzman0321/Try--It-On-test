import { useEffect, useRef, useState, forwardRef  } from 'react';
import ModalWrapper from './ModalWrapper';

const EditModal = forwardRef(({ image, onClose, onSave }) => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      contextRef.current = ctx;
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Add this line to allow cross-origin access
      img.src = image.url;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
  
      canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        ctx.clearRect(x - 10, y - 10, 20, 20);
      });
    }
  }, [canvas, image]);
  

  const startDrawing = ({ nativeEvent }) => {
    if (!contextRef.current) return;
  
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    contextRef.current.globalCompositeOperation = 'destination-out';
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;
    const radius = 10;

    
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.lineWidth = radius * 2;
    contextRef.current.lineCap = 'round';
    contextRef.current.lineJoin = 'round';
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const handleSave = () => {
    const newImage = canvasRef.current.toDataURL();
    // Replace the original image URL with the edited image
    image.url = newImage;
    onSave(image);
    onClose();
  };

  useEffect(() => {
    if (!canvasRef.current || !contextRef.current) return;

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [startDrawing, draw, stopDrawing]);


  return (
    // <ModalWrapper isOpen={!!image} onRequestClose={onClose} >
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ position: 'fixed', top: '30%', left: '50%'}}>
        <div className="bg-white p-4 rounded">
          <h2 className="text-xl mb-2">Edit Image</h2>
          <canvas
            ref={canvasRef}
            className="border border-gray-300"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            width="200"
            height="200"
          ></canvas>
          <button
            className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    // </ModalWrapper>
  );
});

export default EditModal;
