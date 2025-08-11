"use client";

import { useState } from "react";
import { DownloadFormData, ServiceConfig } from "@/types";
import Button from "@/components/UI/Button";
import Input from "./UI/Input";
import { Download, Settings, Zap } from 'lucide-react';

interface DownloadFormProps {
  service: ServiceConfig;
  onDownload: (data: DownloadFormData) => void;
}

export default function DownloadForm({
  service,
  onDownload,
}: DownloadFormProps) {
  const [formData, setFormData] = useState<DownloadFormData>({
    url: "",
    format: "mp4",
    quality: service.qualities[0]?.value || "high",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.url.trim()) {
      setIsSubmitting(true);
      try {
        await onDownload(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label={`${service.name} URL`}
          type="url"
          placeholder={`Paste your ${service.name} URL here...`}
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
          icon={<Zap className="w-5 h-5" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <Settings className="w-4 h-4 inline mr-2" />
              Format
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                value={formData.format}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    format: e.target.value as "mp3" | "mp4",
                  })
                }
              >
                {service.formats.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <Settings className="w-4 h-4 inline mr-2" />
              Quality
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer"
                value={formData.quality}
                onChange={(e) =>
                  setFormData({ ...formData, quality: e.target.value })
                }
              >
                {service.qualities.map((quality) => (
                  <option key={quality.value} value={quality.value}>
                    {quality.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full py-4 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl group"
          loading={isSubmitting}
        >
          <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Download {service.name} {formData.format.toUpperCase()}
        </Button>
      </form>
    </div>
  );
}
