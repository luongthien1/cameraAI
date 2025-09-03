import React from 'react';
import CameraFeed from './CameraFeed';
import VideoSidebar from './VideoSidebar';
import './CameraLayout.css';

const CameraLayout: React.FC = () => {
  const handleVideoSelect = (videoUrl: string) => {
    // Bạn có thể cập nhật logic này để set video cho camera nào đó
    console.log('Selected video:', videoUrl);
    // Ví dụ: có thể set video cho camera chính
  };

  return (
    <div className="camera-layout">
      <div className="camera-content">
        <div className="main-camera">
          <CameraFeed 
            id="main" 
            title="Camera chính" 
            isMain={true}
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />
        </div>
        <div className="side-cameras">
          <CameraFeed 
            id="camera-1" 
            title="Camera 1" 
            isMain={false}
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          />
          <CameraFeed 
            id="camera-2" 
            title="Camera 2" 
            isMain={false}
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          />
          <CameraFeed 
            id="camera-3" 
            title="Camera 3" 
            isMain={false}
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          />
          <CameraFeed 
            id="camera-4" 
            title="Camera 4" 
            isMain={false}
          />
        </div>
      </div>
      
      <VideoSidebar 
        onVideoSelect={handleVideoSelect}
        apiBaseUrl="https://your-api-domain.com/api"
      />
    </div>
  );
};

export default CameraLayout;