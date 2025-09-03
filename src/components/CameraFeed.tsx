import React, { useState } from 'react';
import { Play, Pause, Settings, Maximize2 } from 'lucide-react';
import './CameraFeed.css';

interface CameraFeedProps {
  id: string;
  title: string;
  isMain: boolean;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ id, title, isMain }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className={`camera-feed ${isMain ? 'main' : 'small'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="camera-header">
        <h3 className="camera-title">{title}</h3>
        <div className={`status-indicator ${isPlaying ? 'live' : 'paused'}`}>
          {isPlaying ? 'LIVE' : 'PAUSED'}
        </div>
      </div>
      
      <div className="camera-content">
        <div className="video-placeholder">
          <div className="video-overlay">
            {!isPlaying && (
              <div className="paused-overlay">
                <Play size={isMain ? 48 : 24} />
              </div>
            )}
          </div>
        </div>
        
        <div className={`camera-controls ${isHovered ? 'visible' : ''}`}>
          <button 
            className="control-btn"
            onClick={togglePlayback}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button 
            className="control-btn"
            title="Settings"
          >
            <Settings size={16} />
          </button>
          {!isMain && (
            <button 
              className="control-btn"
              title="Fullscreen"
            >
              <Maximize2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;