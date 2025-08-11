"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import DownloadForm from "@/components/DownloadForm";
import { DownloadFormData, ServiceConfig, VideoDetails } from "@/types";
import {
  Download,
  Play,
  Music,
  Video,
  Sparkles,
  Clock,
  User,
  Eye,
  Coffee,
  Heart,
} from "lucide-react";

const youtubeConfig: ServiceConfig = {
  name: "YouTube",
  formats: [
    { value: "mp3", label: "MP3 (Audio Only)" },
    { value: "mp4", label: "MP4 (Video)" },
  ],
  qualities: [
    { value: "high", label: "High Quality" },
    { value: "medium", label: "Medium Quality" },
    { value: "low", label: "Low Quality" },
  ],
};

export default function YouTubePage() {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fetchVideoInfo = async (videoUrl: string) => {
    if (!videoUrl.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/youtube/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: videoUrl }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch video info");
      }
      setVideoInfo(data.videoDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setVideoInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDownload = async (format: "mp3" | "mp4") => {
    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    if (!videoInfo) {
      await fetchVideoInfo(url);
    }

    setIsDownloading(true);
    setError("");
    try {
      const response = await fetch("/api/youtube/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          format,
          quality: "high",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Download failed");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;

      const extension = format === "mp3" ? "webm" : "mp4";
      link.download = `${videoInfo?.title || "youtube-download"}.${extension}`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAdvancedDownload = async (data: DownloadFormData) => {
    setUrl(data.url);

    if (!videoInfo) {
      await fetchVideoInfo(data.url);
    }

    setIsDownloading(true);
    setError("");
    try {
      const response = await fetch("/api/youtube/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: data.url,
          format: data.format,
          quality: data.quality,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Download failed");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;

      const extension = data.format === "mp3" ? "webm" : "mp4";
      link.download = `${videoInfo?.title || "youtube-download"}.${extension}`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header title="YouTube Downloader" />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Fast & High Quality Downloads
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Download YouTube Videos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Convert and download your favorite YouTube videos in high quality
            MP4 or MP3 format
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pb-16 -mt-8">
        {/* Buy Me a Coffee Section */}
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl border border-amber-200/50 p-6 mb-8 relative overflow-hidden shadow-lg">
          {/* Floating coffee bean animations */}
          <div className="absolute top-2 right-4 w-2 h-2 bg-amber-500 rounded-full opacity-40 animate-bounce delay-1000"></div>
          <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-30 animate-bounce delay-2000"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl shadow-md">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <Heart className="w-1.5 h-1.5 text-white" />
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Love this tool? ☕
                </h3>
                <p className="text-amber-700 text-sm">
                  Help keep it running with a small donation
                </p>
              </div>
            </div>

            <a
              href="https://buymeacoffee.com/theaslan"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:from-yellow-500 hover:via-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Coffee className="w-4 h-4 group-hover:animate-pulse" />
              <span className="hidden sm:inline">Buy Me a Coffee</span>
              <span className="sm:hidden">☕</span>
              <div className="w-0 group-hover:w-1 h-1 bg-white rounded-full transition-all duration-300"></div>
            </a>
          </div>
        </div>

        {/* Quick Download Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Quick Download
              </h2>
            </div>

            <div className="space-y-6">
              <Input
                label="YouTube URL"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                icon={<Play className="w-5 h-5" />}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => fetchVideoInfo(url)}
                  disabled={isLoading || !url.trim()}
                  variant="secondary"
                  className="group"
                >
                  <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {isLoading ? "Loading..." : "Preview"}
                </Button>

                <Button
                  onClick={() => handleQuickDownload("mp3")}
                  disabled={isDownloading || !url.trim()}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 group"
                >
                  <Music className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {isDownloading ? "Downloading..." : "Audio"}
                </Button>

                <Button
                  onClick={() => handleQuickDownload("mp4")}
                  disabled={isDownloading || !url.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 group"
                >
                  <Video className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {isDownloading ? "Downloading..." : "Video"}
                </Button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Video Info Display */}
            {videoInfo && (
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative group">
                    <img
                      src={videoInfo.thumbnail || "/placeholder.svg"}
                      alt={videoInfo.title}
                      className="w-full md:w-48 h-32 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                      {videoInfo.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{videoInfo.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {Math.floor(parseInt(videoInfo.duration) / 60)}:
                          {(parseInt(videoInfo.duration) % 60)
                            .toString()
                            .padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowAdvanced(!showAdvanced)}
            variant="secondary"
            className="group px-8 py-3 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            {showAdvanced ? "Hide" : "Show"} Advanced Options
          </Button>
        </div>

        {/* Advanced Download Section */}
        {showAdvanced && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Advanced Download
              </h2>
            </div>
            <DownloadForm
              service={youtubeConfig}
              onDownload={handleAdvancedDownload}
            />
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            How to use
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Paste a YouTube URL in the input field</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Click "Preview" to see video details (optional)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Choose "Audio" for music or "Video" for full video</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <span>Use "Advanced Options" for quality control</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-100 rounded-xl">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> Audio downloads will be in WebM or M4A
              format (high quality). Video downloads will be in MP4 format.
              Download quality depends on the original video.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
