import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { FiVideo, FiX } from 'react-icons/fi';

const WebcamRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [recordedVideos, setRecordedVideos] = useState<{ blob: Blob; url: string }[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleStartRecording = () => {
    if (webcamRef.current?.stream) {
      chunksRef.current = [];
      const stream = webcamRef.current.stream;
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideos(prev => [...prev, { blob, url }]);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleCloseWebcam = () => {
    setShowWebcam(false);
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleRemoveVideo = (index: number) => {
    const newVideos = [...recordedVideos];
    URL.revokeObjectURL(newVideos[index].url);
    newVideos.splice(index, 1);
    setRecordedVideos(newVideos);
  };

  if (!showWebcam) {
    return (
      <div 
        onClick={() => setShowWebcam(true)}
        className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-gray-700 transition-colors duration-300"
      >
        <FiVideo className="text-4xl text-purple-400" />
        <p className="text-gray-400">Open Webcam to Capture Video</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 mb-4">
        <button 
          onClick={handleCloseWebcam}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <FiX size={24} />
        </button>
        
        <Webcam
          ref={webcamRef}
          audio={true}
          className="w-full rounded-lg"
        />
        
        <div className="mt-4 flex justify-center">
          {!isRecording ? (
            <button
              onClick={handleStartRecording}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={handleStopRecording}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
            >
              Stop Recording
            </button>
          )}
        </div>
      </div>

      {recordedVideos.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {recordedVideos.map((video, index) => (
            <div key={index} className="relative">
              <video
                src={video.url}
                className="w-full h-full rounded-lg"
                controls
              />
              <button
                onClick={() => handleRemoveVideo(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <FiX size={16} />
              </button>
              <p className="text-white text-sm mt-2">Recorded Video {index + 1}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebcamRecorder;