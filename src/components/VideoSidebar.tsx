import React, { useState, useRef, useEffect } from 'react';
import { Upload, Video, Trash2, Play, X } from 'lucide-react';
import './VideoSidebar.css';

interface VideoItem {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  size?: string;
}

interface VideoSidebarProps {
  onVideoSelect: (videoUrl: string) => void;
  apiBaseUrl: string;
}

const VideoSidebar: React.FC<VideoSidebarProps> = ({ onVideoSelect, apiBaseUrl }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch videos from API
  const fetchVideos = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/videos`);
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      } else {
        setError('Không thể tải danh sách video');
      }
    } catch (err) {
      setError('Lỗi kết nối API');
      console.error('Error fetching videos:', err);
    }
  };

  // Upload video to API
  const uploadVideo = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('video', file);

    try {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setUploadProgress(progress);
        }
      });

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setVideos(prev => [response, ...prev]);
          setUploadProgress(100);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
          }, 1000);
        } else {
          setError('Upload thất bại');
          setIsUploading(false);
        }
      };

      xhr.onerror = () => {
        setError('Lỗi upload video');
        setIsUploading(false);
      };

      xhr.open('POST', `${apiBaseUrl}/videos/upload`);
      xhr.send(formData);
    } catch (err) {
      setError('Lỗi upload video');
      setIsUploading(false);
      console.error('Upload error:', err);
    }
  };

  // Delete video
  const deleteVideo = async (videoId: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/videos/${videoId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setVideos(prev => prev.filter(video => video.id !== videoId));
      } else {
        setError('Không thể xóa video');
      }
    } catch (err) {
      setError('Lỗi khi xóa video');
      console.error('Delete error:', err);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        uploadVideo(file);
      } else {
        setError('Vui lòng chọn file video');
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchVideos();
  }, [apiBaseUrl]);

  return (
    <div className="video-sidebar">
      <div className="sidebar-header">
        <h2>Quản lý Video</h2>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        <button
          className="upload-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Upload size={20} />
          {isUploading ? 'Đang upload...' : 'Upload Video'}
        </button>

        {isUploading && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="progress-text">{Math.round(uploadProgress)}%</span>
          </div>
        )}

        {error && (
          <div className="error-message">
            <X size={16} />
            {error}
            <button onClick={() => setError(null)} className="error-close">
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Video List */}
      <div className="video-list">
        <h3>Video đã upload ({videos.length})</h3>
        
        {videos.length === 0 ? (
          <div className="empty-state">
            <Video size={48} />
            <p>Chưa có video nào</p>
            <span>Upload video đầu tiên của bạn</span>
          </div>
        ) : (
          <div className="video-items">
            {videos.map((video) => (
              <div key={video.id} className="video-item">
                <div className="video-thumbnail">
                  <Video size={24} />
                </div>
                
                <div className="video-info">
                  <h4 className="video-name">{video.name}</h4>
                  <div className="video-meta">
                    <span className="video-date">{formatDate(video.uploadDate)}</span>
                    {video.size && (
                      <span className="video-size">{video.size}</span>
                    )}
                  </div>
                </div>

                <div className="video-actions">
                  <button
                    className="action-btn play-btn"
                    onClick={() => onVideoSelect(video.url)}
                    title="Phát video"
                  >
                    <Play size={16} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteVideo(video.id)}
                    title="Xóa video"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSidebar;