import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { FiCamera, FiX } from 'react-icons/fi';

interface WebcamCaptureProps {
  onCapture: (imageFile: File) => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture }) => {
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Convert base64 to blob
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
          onCapture(file);
        });
    }
  }, [webcamRef, onCapture]);

  if (!showWebcam) {
    return (
      <div 
        onClick={() => setShowWebcam(true)}
        className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-gray-700 transition-colors duration-300"
      >
        <FiCamera className="text-4xl text-purple-400" />
        <p className="text-gray-400">Open Webcam to Capture Image</p>
      </div>
    );
  }

  return (
    <div className="relative bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
      <button 
        onClick={() => setShowWebcam(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
      >
        <FiX size={24} />
      </button>
      
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        className="w-full rounded-lg"
      />
      
      <div className="mt-4 flex justify-center">
        <button
          onClick={capture}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
        >
          Capture Photo
        </button>
      </div>
    </div>
  );
};

export default WebcamCapture;