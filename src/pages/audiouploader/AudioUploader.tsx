import React, { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FiUpload } from 'react-icons/fi';
import Header from '../../components/Header';
import ProgressBar from '../videouploader/components/ProgressBar';
import AudioThumbnail from './components/AudioThumbnail';
import VoiceRecorder from './components/VoiceRecorder';

const AudioUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [recordedFiles, setRecordedFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const validateFile = (file: File) => {
    if (!file.type.startsWith('audio/')) {
      setError('Only audio files are allowed');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return false;
    }
    return true;
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError('');
    const droppedFiles = Array.from(e.dataTransfer.files).filter(validateFile);
    setUploadedFiles([...uploadedFiles, ...droppedFiles]);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(validateFile);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleRemoveUploadedAudio = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const handleRemoveRecordedAudio = (index: number) => {
    const newFiles = [...recordedFiles];
    newFiles.splice(index, 1);
    setRecordedFiles(newFiles);
  };

  const handleRecordingComplete = (audioFile: File) => {
    setRecordedFiles([...recordedFiles, audioFile]);
  };

  return (
    <div className="min-h-screen bg-gradient p-8">
      <div className="max-w-3xl mx-auto">
        <Header />

        <ProgressBar steps={['Videos', 'Images', 'Audios', 'Documents']} currentStep={2} />

        <div className="mt-12">
          <h2 className="text-white text-2xl font-medium mb-4">Add Audio Files</h2>
          <div className="space-y-2 text-gray-400 text-sm mb-4">
            <p>1. Audio should be clear and high quality</p>
            <p>2. Supported formats: MP3, WAV, OGG</p>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="bg-purple-900/30 text-purple-300 p-4 rounded-lg mb-6 flex items-center gap-2">
            <span className="text-purple-400">ⓘ</span>
            You can upload more files or continue with the Persona Creation. Audio files will keep getting uploaded and analyzed in the Background
          </div>

          <div className="mb-8">
            <h3 className="text-white text-lg mb-4">Upload Audio Files</h3>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <FiUpload className="text-4xl text-blue-400" />
                <div>
                  <p className="text-gray-400">Drag your audio file(s) or <button onClick={handleBrowseClick} className="text-purple-400 hover:underline">browse</button></p>
                  <p className="text-gray-500 text-sm">Max 10 MB per file</p>
                  <p className="text-gray-500 text-sm">Supports MP3, WAV, OGG</p>
                </div>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept="audio/*"
            />

            {uploadedFiles.length > 0 && (
              <div className="space-y-4 mt-4">
                {uploadedFiles.map((file, index) => (
                  <AudioThumbnail 
                    key={index} 
                    file={file}
                    title={`Uploaded Audio ${index + 1}`}
                    onRemove={() => handleRemoveUploadedAudio(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-white text-lg mb-4">Record Voice</h3>
            <VoiceRecorder onRecordingComplete={handleRecordingComplete} />

            {recordedFiles.length > 0 && (
              <div className="space-y-4 mt-4">
                {recordedFiles.map((file, index) => (
                  <AudioThumbnail 
                    key={index} 
                    file={file}
                    title={`Recorded Audio ${index + 1}`}
                    onRemove={() => handleRemoveRecordedAudio(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between mt-12">
            <button className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              Save as Draft
            </button>
            <button 
              onClick={() => navigate({ to: '/document-upload' })}
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

export default AudioUploader;