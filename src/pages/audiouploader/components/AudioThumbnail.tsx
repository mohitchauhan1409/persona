import React, { useEffect, useRef, useState } from 'react';
import { FiX, FiPlay, FiPause, FiMusic } from 'react-icons/fi';

interface AudioThumbnailProps {
  file: File;
  title: string;
  onRemove: () => void;
}

const AudioThumbnail: React.FC<AudioThumbnailProps> = ({ file, title, onRemove }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    if (audioRef.current) {
      audioRef.current.src = url;
    }
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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

      <div className="flex items-center gap-6 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isPlaying ? 'bg-purple-600 animate-pulse' : 'bg-purple-500'
        }`}>
          {isPlaying ? <FiMusic className="text-white text-xl" /> : <FiMusic className="text-white text-xl" />}
        </div>

        <div className="flex-1">
          <h4 className="text-white font-medium mb-1">{title}</h4>
          <p className="text-gray-400 text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>

        <button
          onClick={togglePlayPause}
          className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors duration-300"
        >
          {isPlaying ? <FiPause size={18} /> : <FiPlay size={18} className="ml-1" />}
        </button>
      </div>

      <div 
        className="relative w-full h-2 bg-gray-700 rounded-full cursor-pointer overflow-hidden"
        onClick={handleProgressClick}
      >
        {/* Background progress */}
        <div 
          className="absolute h-full bg-purple-900/50 rounded-full transition-all duration-300"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        {/* Main progress */}
        <div 
          className="absolute h-full bg-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        {/* Hover effect */}
        <div className="absolute inset-0 bg-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default AudioThumbnail;