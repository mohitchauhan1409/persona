import React, { useState } from 'react';
import { FiX, FiFile, FiEye } from 'react-icons/fi';

interface DocumentThumbnailProps {
  file: File;
  title: string;
  onRemove: () => void;
}

const DocumentThumbnail: React.FC<DocumentThumbnailProps> = ({ file, title, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePreview = () => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  const getFileIcon = () => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'text-red-500';
      case 'doc':
      case 'docx':
        return 'text-blue-500';
      case 'xls':
      case 'xlsx':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div 
      className="relative bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] p-6 rounded-lg group transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onRemove}
        className={`absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full z-10 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <FiX size={14} />
      </button>

      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFileIcon()}`}>
          <FiFile size={24} />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium mb-1 truncate">{title}</h4>
          <p className="text-gray-400 text-sm">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>

        <button
          onClick={handlePreview}
          className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors duration-300"
        >
          <FiEye size={18} />
        </button>
      </div>
    </div>
  );
};

export default DocumentThumbnail;