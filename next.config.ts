/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'fluent-ffmpeg', 
      '@distube/ytdl-core',
      '@ffmpeg-installer/ffmpeg'
    ],
  },
  webpack: (config: { externals: { 'fluent-ffmpeg': string; '@distube/ytdl-core': string; '@ffmpeg-installer/ffmpeg': string; }[]; resolve: { fallback: any; }; }, { isServer }: any) => {
    if (isServer) {
      config.externals.push({
        'fluent-ffmpeg': 'fluent-ffmpeg',
        '@distube/ytdl-core': '@distube/ytdl-core',
        '@ffmpeg-installer/ffmpeg': '@ffmpeg-installer/ffmpeg',
      });
    }
    
    // Ignore problematic modules in client-side builds
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };
    
    return config;
  },
};

module.exports = nextConfig;