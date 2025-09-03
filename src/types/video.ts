export interface VideoItem {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  size?: string;
  duration?: number;
  thumbnail?: string;
}

export interface VideoUploadResponse {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  size: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}