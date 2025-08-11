import Header from "@/components/Header";
import Link from "next/link";
import {
  Youtube,
  ArrowRight,
  Download,
  Clock,
  Highlighter,
  Shield,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header title="YouTube Downloader" />

      <main className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Fast YouTube Downloads
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-red-700 to-red-600 bg-clip-text text-transparent mb-6 leading-tight">
            Download YouTube Videos <br className="hidden md:block" />
            in Seconds
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Get videos in HD quality or extract audio as MP3 - no registration,
            no limits.
          </p>
        </div>

        {/* YouTube Card - Center aligned since it's the only one */}
        <div className="max-w-md mx-auto mb-20">
          <Link
            href="/youtube"
            className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* YouTube gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white opacity-30 -z-0"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500 rounded-full opacity-10 -z-0"></div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg mb-6 group-hover:rotate-6 transition-transform">
                <Youtube className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                YouTube Downloader
              </h2>
              <p className="text-gray-600 mb-6">
                Download videos in MP4 or extract audio as high-quality MP3
              </p>

              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-full group-hover:from-red-700 group-hover:to-red-800 transition-all shadow-md">
                <span>Start Downloading</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section - YouTube specific */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/30 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Save Time
            </h3>
            <p className="text-gray-600 text-center">
              Download videos in seconds without watching ads or logging in
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/30 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Highlighter className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Multiple Qualities
            </h3>
            <p className="text-gray-600 text-center">
              Choose from 144p to 4K resolution or extract audio only
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/30 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Privacy Focused
            </h3>
            <p className="text-gray-600 text-center">
              We don't store your downloads or track your activity
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How to Download YouTube Videos
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Copy YouTube URL
                </h3>
                <p className="text-gray-600">
                  Find the video you want on YouTube and copy its link from the
                  address bar
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Paste the Link
                </h3>
                <p className="text-gray-600">
                  Paste the YouTube URL into our downloader and choose your
                  format
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Download & Enjoy
                </h3>
                <p className="text-gray-600">
                  Get your video or audio file instantly and enjoy it offline
                  anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
