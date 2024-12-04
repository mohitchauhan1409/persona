import React from 'react';
import { FiX } from 'react-icons/fi';

interface ImageThumbnailProps {
  file: File;
  title: string;
  onRemove: () => void;
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({ file, title, onRemove }) => {
  return (
    <div className="relative group">
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <FiX size={16} />
      </button>
      
      <div className="bg-[#2a2a2a] rounded-lg overflow-hidden aspect-video">
        <img
          src={URL.createObjectURL(file)}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2">
        <p className="text-white text-sm truncate">{title}</p>
      </div>
    </div>
  );
};

export default ImageThumbnail;