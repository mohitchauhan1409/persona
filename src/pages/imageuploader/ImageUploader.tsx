import React, { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FiUpload } from 'react-icons/fi';
import Header from '../../components/Header';
import ProgressBar from '../videouploader/components/ProgressBar';
import ImageThumbnail from './components/ImageThumbnail';
import WebcamCapture from './components/WebcamCapture';

const ImageUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const validateFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return false;
    }
    return true;
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError('');
    const droppedFiles = Array.from(e.dataTransfer.files).filter(validateFile);
    setFiles([...files, ...droppedFiles]);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(validateFile);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleWebcamCapture = (imageFile: File) => {
    setFiles([...files, imageFile]);
  };

  const handleImageUrlFetch = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Create a File object from the blob
      const file = new File([blob], 'fetched-image.jpg', { type: blob.type });
      
      if (validateFile(file)) {
        setFiles([...files, file]);
        setImageUrl('');
      }
    } catch (err) {
      setError('Failed to fetch image from URL. Please check the URL and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient p-8">
      <div className="max-w-3xl mx-auto">
        <Header />

        <ProgressBar steps={['Videos', 'Images', 'Audios', 'Documents']} currentStep={1} />

        <div className="mt-12">
          <h2 className="text-white text-2xl font-medium mb-4">Add Images</h2>
          <div className="space-y-2 text-gray-400 text-sm mb-4">
            <p>1. Images should be clear and high quality</p>
            <p>2. Supported formats: JPG, PNG, GIF</p>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="bg-purple-900/30 text-purple-300 p-4 rounded-lg mb-6 flex items-center gap-2">
            <span className="text-purple-400">ⓘ</span>
            You can upload more files or continue with the Persona Creation. Images will keep getting uploaded and analyzed in the Background
          </div>

          <div className="mb-8">
            <h3 className="text-white text-lg mb-4">Upload Images</h3>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <FiUpload className="text-4xl text-blue-400" />
                <div>
                  <p className="text-gray-400">Drag your image(s) or <button onClick={handleBrowseClick} className="text-purple-400 hover:underline">browse</button></p>
                  <p className="text-gray-500 text-sm">Max 5 MB per file</p>
                  <p className="text-gray-500 text-sm">Supports JPG, PNG, GIF</p>
                </div>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept="image/*"
            />
          </div>

          {files.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mb-8">
              {files.map((file, index) => (
                <ImageThumbnail 
                  key={index} 
                  file={file}
                  title={`Image ${index + 1}`}
                  onRemove={() => handleRemoveImage(index)}
                />
              ))}
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-white text-lg mb-4">Add Image by Link</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste Image URL Here"
                className="flex-1 bg-[#2a2a2a] text-white border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleImageUrlFetch}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg transition-colors duration-300"
              >
                Fetch
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-white text-lg mb-4">Capture Image through Webcam</h3>
            <WebcamCapture onCapture={handleWebcamCapture} />
          </div>

          <div className="flex justify-between mt-12">
            <button className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              Save as Draft
            </button>
            <button 
              onClick={() => navigate({ to: '/audio-upload' })}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;