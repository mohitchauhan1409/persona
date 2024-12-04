import React, { useState, useRef } from 'react';
import { FiMic, FiX, FiStopCircle } from 'react-icons/fi';

interface VoiceRecorderProps {
  onRecordingComplete: (file: File) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], `recording-${Date.now()}.wav`, {
          type: 'audio/wav',
        });
        onRecordingComplete(audioFile);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  if (!showRecorder) {
    return (
      <div 
        onClick={() => setShowRecorder(true)}
        className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-gray-700 transition-colors duration-300"
      >
        <FiMic className="text-4xl text-purple-400" />
        <p className="text-gray-400">Click to Start Recording</p>
      </div>
    );
  }

  return (
    <div className="relative bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
      <button 
        onClick={() => setShowRecorder(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <FiX size={24} />
      </button>

      <div className="flex flex-col items-center gap-6">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isRecording ? 'bg-red-500 animate-pulse' : 'bg-purple-600'
        }`}>
          <FiMic className="text-white text-2xl" />
        </div>

        <div className="text-center">
          <p className="text-white text-lg mb-2">
            {isRecording ? 'Recording in progress...' : 'Ready to record'}
          </p>
          <p className="text-gray-400 text-sm">
            {isRecording ? 'Click stop when finished' : 'Click start when ready'}
          </p>
        </div>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-colors duration-300 ${
            isRecording 
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isRecording ? (
            <>
              <FiStopCircle size={20} />
              Stop Recording
            </>
          ) : (
            <>
              <FiMic size={20} />
              Start Recording
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;