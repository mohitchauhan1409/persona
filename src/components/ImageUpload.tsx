import React, { useState, useRef } from 'react';
import { FiUpload } from 'react-icons/fi';
import { FaGoogleDrive } from 'react-icons/fa';

interface ImageUploadProps {
  onImageChange: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      return;
    }

    // Check file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Only JPEG and PNG files are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageChange(file);
  };

  const handleGoogleDrive = () => {
    // Handle Google Drive integration
    console.log('Google Drive integration not implemented yet');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 bg-[#2a2a2a] rounded-full mb-4 flex items-center justify-center overflow-hidden">
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-3xl text-gray-400">😊</span>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png"
        className="hidden"
      />
      
      <div className="flex gap-4">
        <button
          onClick={handleUpload}
          className="flex items-center gap-2 bg-[#2a2a2a] text-white px-4 py-2 rounded-lg hover:bg-[#3a3a3a] transition-colors duration-300"
        >
          <FiUpload />
          Upload Image
        </button>
        
        <button
          onClick={handleGoogleDrive}
          className="flex items-center gap-2 bg-[#2a2a2a] text-white px-4 py-2 rounded-lg hover:bg-[#3a3a3a] transition-colors duration-300"
        >
          <FaGoogleDrive />
          Add from Google Drive
        </button>
      </div>
      
      <p className="text-gray-400 text-sm mt-2">
        JPEG or PNG, Max size 2MB
      </p>
    </div>
  );
};

export default ImageUpload;