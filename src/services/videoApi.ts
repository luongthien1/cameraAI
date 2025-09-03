import { VideoItem, VideoUploadResponse, ApiResponse } from '../types/video';

export class VideoApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Lấy danh sách video
  async getVideos(): Promise<VideoItem[]> {
    try {
      const response = await fetch(`${this.baseUrl}/videos`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse<VideoItem[]> = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw new Error('Không thể tải danh sách video');
    }
  }

  // Upload video
  async uploadVideo(
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<VideoUploadResponse> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('name', file.name);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100;
          onProgress(progress);
        }
      });

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          try {
            const response: ApiResponse<VideoUploadResponse> = JSON.parse(xhr.responseText);
            if (response.success) {
              resolve(response.data);
            } else {
              reject(new Error(response.error || 'Upload thất bại'));
            }
          } catch (error) {
            reject(new Error('Lỗi parse response'));
          }
        } else {
          reject(new Error(`Upload thất bại: ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Lỗi kết nối khi upload'));
      };

      xhr.open('POST', `${this.baseUrl}/videos/upload`);
      xhr.send(formData);
    });
  }

  // Xóa video
  async deleteVideo(videoId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/videos/${videoId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<null> = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Không thể xóa video');
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      throw new Error('Lỗi khi xóa video');
    }
  }

  // Lấy thông tin chi tiết video
  async getVideoDetails(videoId: string): Promise<VideoItem> {
    try {
      const response = await fetch(`${this.baseUrl}/videos/${videoId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse<VideoItem> = await response.json();
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.error || 'Không thể lấy thông tin video');
      }
    } catch (error) {
      console.error('Error fetching video details:', error);
      throw new Error('Lỗi khi lấy thông tin video');
    }
  }
}