import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

interface VideoThumbnailProps {
  file: File;
  title: string;
  onRemove: () => void;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ file, title, onRemove }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(file);
    }
    return () => {
      if (videoRef.current?.src) {
        URL.revokeObjectURL(videoRef.current.src);
      }
    };
  }, [file]);

  return (
    <div className="relative group">
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <FiX size={16} />
      </button>
      
      <div className="bg-[#2a2a2a] rounded-lg overflow-hidden aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
        />
      </div>
      <div className="mt-2">
        <p className="text-white text-sm truncate">{title}</p>
      </div>
    </div>
  );
};

export default VideoThumbnail;