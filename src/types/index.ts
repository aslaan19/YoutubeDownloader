export interface DownloadOption {
  value: string;
  label: string;
}

export interface DownloadFormData {
  url: string;
  format: 'mp3' | 'mp4';
  quality?: string;
}

export interface ServiceConfig {
  name: string;
  formats: DownloadOption[];
  qualities: DownloadOption[];
}

// YouTube-specific interfaces
export interface VideoDetails {
  type: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
}

export interface DownloadResponse {
  success: boolean;
  error?: string;
  filename?: string;
}

// Extended download options for different services
export interface DownloadRequest {
  url: string;
  format: 'mp3' | 'mp4' | 'webm' | 'm4a';
  quality: 'high' | 'medium' | 'low' | 'highest' | 'lowest';
}
