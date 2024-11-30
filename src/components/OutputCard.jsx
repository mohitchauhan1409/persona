import React from 'react';
import CheckIcon from './icons/CheckIcon';

const OutputCard = ({ icon, title, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative w-[250px] h-[180px] rounded-lg cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'bg-[#2a2a2a] border-[1px] border-purple-500' 
          : 'bg-[#2a2a2a] hover:border-[1px] hover:border-purple-500'
      }`}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
          <CheckIcon />
        </div>
      )}
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-white text-lg font-medium">{title}</span>
      </div>
    </div>
  );
};

export default OutputCard;