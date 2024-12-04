import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';

const CreatePersona = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !description) {
      setError('Please fill in all required fields');
      return;
    }
    navigate({ to: '/video-upload' });
  };

  const handleImageChange = (file: File) => {
    setProfileImage(file);
  };

  return (
    <div className="min-h-screen bg-gradient p-8">
      <div className="max-w-2xl mx-auto">
        <Header />
        
        <div className="mt-8 mb-12">
          <h2 className="text-white text-2xl font-medium text-center">
            Tell us about this Persona before continuing
          </h2>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-white text-lg mb-2">Name your Persona</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should this Persona be called?"
              className="w-full bg-[#2a2a2a] text-white border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-white text-lg mb-4">What does your Persona Look like?</label>
            <ImageUpload onImageChange={handleImageChange} />
          </div>

          <div>
            <label className="block text-white text-lg mb-2">Tell us about your Agent</label>
            <p className="text-gray-400 text-sm mb-2">
              Should be unique and use 4-20 characters, including letters, numbers, dashes, periods and underscores.
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what your Persona does and what to expect from it"
              className="w-full bg-[#2a2a2a] text-white border border-gray-700 rounded-lg p-3 h-32 focus:outline-none focus:border-purple-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePersona;