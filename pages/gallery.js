// index.js
import { useState } from 'react';
import ImageCard from '../components/ImageCard';
import EditModal from '../components/EditModal';
import RequestEditModal from '../components/RequestEditModal';

const getImageList = () => {
  let list = [];
  for (let i = 1; i <= 50; i ++) {
    list.push({
      "id": i,
      "url": `https://source.unsplash.com/random/200x200?sig=${i}`
    })
  }

  return list;
}

export default function Home() {
  const [images, setImages] = useState(getImageList());
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRequestEditModal, setShowRequestEditModal] = useState(false);

  const handleEdit = (image) => {
    setSelectedImage(image);
    setShowEditModal(true);
  };

  const handleRequestEdit = (image) => {
    setSelectedImage(image);
    setShowRequestEditModal(true);
  };

  const handleSave = (image) => {
    let updatedImages = images;
    updatedImages[image.id - 1] = image;
    setImages(updatedImages)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            image={image}
            onEdit={handleEdit}
            onRequestEdit={handleRequestEdit}
          />
        ))}
      </div>
      {showEditModal && (
        <EditModal
          image={selectedImage}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}
      {showRequestEditModal && (
        <RequestEditModal
          image={selectedImage}
          onClose={() => setShowRequestEditModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
