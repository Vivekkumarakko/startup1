import React, { useState } from 'react';
import { X, Play, AlertCircle } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleVideoLoad = () => {
    setVideoLoading(false);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoLoading(false);
    setVideoError(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-800">
          <h2 className="text-xl font-bold text-white">How Problinx Works</h2>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Close video"
          >
            <X size={24} />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative bg-black">
          {videoError ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Video Unavailable
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                The video is currently unavailable. Please check back later or contact support if this issue persists.
              </p>
              <div className="bg-gray-100 rounded-lg p-6 max-w-md">
                <h4 className="font-semibold text-gray-800 mb-3">How Problinx Works:</h4>
                <ul className="text-left text-gray-600 space-y-2">
                  <li>• Companies post real-world problems and challenges</li>
                  <li>• Developers submit solutions and earn tokens</li>
                  <li>• Top performers get hired directly by companies</li>
                  <li>• Build your portfolio while earning rewards</li>
                </ul>
              </div>
            </div>
          ) : (
            <video
              className="w-full h-auto max-h-[70vh] object-contain"
              controls
              autoPlay
              muted
              playsInline
              poster="/logo.png"
              onLoadStart={() => setVideoLoading(true)}
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
            >
              <source src="/invideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          
          {videoLoading && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white">Loading video...</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Ready to Start Solving Problems?
            </h3>
            <p className="text-gray-600 mb-4">
              Join thousands of developers who are already earning tokens and getting hired through Problinx.
            </p>
            <button
              onClick={() => {
                onClose();
                // Scroll to problem board
                const element = document.getElementById('problems');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal; 