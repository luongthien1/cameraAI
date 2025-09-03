import React, { useState } from 'react';
import { Play, Pause, Settings, Maximize2 } from 'lucide-react';
import './CameraFeed.css';

interface CameraFeedProps {
  id: string;
  title: string;
  isMain: boolean;
  videoUrl?: string;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ id, title, isMain, videoUrl }) => {
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
        {videoUrl ? (
          <video
            className="video-stream"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            style={{ display: isPlaying ? 'block' : 'none' }}
          />
        ) : (
          <div className="video-placeholder">
            <div className="no-signal">No Signal</div>
          </div>
        )}
        {!isPlaying && videoUrl && (
          <div className="video-overlay">
            <div className="paused-overlay">
              <Play size={isMain ? 48 : 24} />
            </div>
          </div>
        )}
        
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