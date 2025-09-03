import React from 'react';
import CameraFeed from './CameraFeed';
import './CameraLayout.css';

const CameraLayout: React.FC = () => {
  return (
    <div className="camera-layout">
      <div className="main-camera">
        <CameraFeed 
          id="main" 
          title="Camera chính" 
          isMain={true}
        />
      </div>
      <div className="side-cameras">
        <CameraFeed 
          id="camera-1" 
          title="Camera 1" 
          isMain={false}
        />
        <CameraFeed 
          id="camera-2" 
          title="Camera 2" 
          isMain={false}
        />
        <CameraFeed 
          id="camera-3" 
          title="Camera 3" 
          isMain={false}
        />
        <CameraFeed 
          id="camera-4" 
          title="Camera 4" 
          isMain={false}
        />
      </div>
    </div>
  );
};

export default CameraLayout;