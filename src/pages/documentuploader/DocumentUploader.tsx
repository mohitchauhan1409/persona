import React, { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FiUpload } from 'react-icons/fi';
import Header from '../../components/Header';
import ProgressBar from '../videouploader/components/ProgressBar';
import DocumentThumbnail from './components/DocumentThumbnail';

const DocumentUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [documentUrl, setDocumentUrl] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const validateFile = (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF, DOC, DOCX, XLS, and XLSX files are allowed');
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

  const handleRemoveDocument = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleDocumentUrlFetch = async () => {
    if (!documentUrl) return;

    try {
      const response = await fetch(documentUrl);
      const blob = await response.blob();
      
      // Extract filename from URL or use a default name
      const filename = documentUrl.split('/').pop() || 'downloaded-document.pdf';
      
      // Create a File object from the blob
      const file = new File([blob], filename, { type: blob.type });
      
      if (validateFile(file)) {
        setFiles([...files, file]);
        setDocumentUrl('');
      }
    } catch (err) {
      setError('Failed to fetch document from URL. Please check the URL and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient p-8">
      <div className="max-w-3xl mx-auto">
        <Header />

        <ProgressBar steps={['Videos', 'Images', 'Audios', 'Documents']} currentStep={3} />

        <div className="mt-12">
          <h2 className="text-white text-2xl font-medium mb-4">Add Documents</h2>
          <div className="space-y-2 text-gray-400 text-sm mb-4">
            <p>1. Documents should be clear and properly formatted</p>
            <p>2. Supported formats: PDF, DOC, DOCX, XLS, XLSX</p>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="bg-purple-900/30 text-purple-300 p-4 rounded-lg mb-6 flex items-center gap-2">
            <span className="text-purple-400">ⓘ</span>
            You can upload more files or finish the Persona Creation. Documents will keep getting uploaded and analyzed in the Background
          </div>

          <div className="mb-8">
            <h3 className="text-white text-lg mb-4">Upload Documents</h3>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <FiUpload className="text-4xl text-blue-400" />
                <div>
                  <p className="text-gray-400">Drag your document(s) or <button onClick={handleBrowseClick} className="text-purple-400 hover:underline">browse</button></p>
                  <p className="text-gray-500 text-sm">Max 10 MB per file</p>
                  <p className="text-gray-500 text-sm">Supports PDF, DOC, DOCX, XLS, XLSX</p>
                </div>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-white text-lg mb-4">Add Document by Link</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={documentUrl}
                onChange={(e) => setDocumentUrl(e.target.value)}
                placeholder="Paste Document URL Here"
                className="flex-1 bg-[#2a2a2a] text-white border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleDocumentUrlFetch}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg transition-colors duration-300"
              >
                Fetch
              </button>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-4 mb-8">
              {files.map((file, index) => (
                <DocumentThumbnail 
                  key={index} 
                  file={file}
                  title={file.name}
                  onRemove={() => handleRemoveDocument(index)}
                />
              ))}
            </div>
          )}

          <div className="flex justify-between mt-12">
            <button className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              Save as Draft
            </button>
            <button 
              onClick={() => navigate({ to: '/' })}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Finish Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploader;