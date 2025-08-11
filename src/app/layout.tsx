import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
<meta
  name="google-site-verification"
  content="SlYicriOGjhbQ2lVLvD7K8voFcfPfWnCd21NGyQn0ho"
/>;
export const metadata: Metadata = {
  // Primary SEO
  title: "Super YouTube Downloader | Free YouTube Video & Audio Downloader",
  description:
    "Download YouTube videos and audio in high quality MP4 and MP3 formats. Fast, free, and secure YouTube downloader with no registration required. Convert YouTube to MP3/MP4 instantly.",

  // Keywords for search engines
  keywords: [
    "YouTube downloader",
    "YouTube to MP3",
    "YouTube to MP4",
    "video downloader",
    "audio downloader",
    "free YouTube converter",
    "download YouTube videos",
    "YouTube audio extractor",
    "HD video downloader",
    "online video converter",
  ],

  // Author and creator info
  authors: [{ name: "Aslan" }],
  creator: "Aslan the leader",
  publisher: "Super YouTube Downloader",

  // Site configuration
  applicationName: "Super YouTube Downloader",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Additional metadata
  category: "Technology",
  classification: "Video Downloader Tool",

  // Verification tags (add your actual verification codes)
  verification: {
    google: "your-google-verification-code", // Replace with actual code
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },

  // Alternate languages (if you support multiple languages)
  alternates: {
    canonical: "https://greatdownloader.vercel.app/youtube", // Replace with your actual domain
    languages: {
      "en-US": "https://greatdownloader.vercel.app/youtube",
      // Add more languages if needed
      // 'es-ES': 'https://your-domain.com/es',
    },
  },

  // App-specific metadata
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Super YouTube Downloader",
  },

  // Additional meta tags
  other: {
    // Schema.org structured data
    "application-name": "Super YouTube Downloader",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#3b82f6",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-navbutton-color": "#3b82f6",
    "msapplication-starturl": "/",

    // Additional SEO tags
    "revisit-after": "7 days",
    rating: "general",
    distribution: "global",
    coverage: "worldwide",
    target: "all",
    audience: "everyone",
    "resource-type": "document",
    "doc-type": "web page",
    "doc-class": "published",
    "doc-rights": "public",

    // Performance and caching hints
    "Cache-Control": "public, max-age=31536000, immutable",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* DNS prefetch for faster loading */}
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//youtu.be" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
