"use client";
import Link from "next/link";
import { Download, Home, Youtube, Coffee } from "lucide-react";
import { useEffect } from "react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  useEffect(() => {
    // Load Buy Me a Coffee script dynamically
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
    script.setAttribute("data-name", "bmc-button");
    script.setAttribute("data-slug", "theaslan");
    script.setAttribute("data-color", "#FFDD00");
    script.setAttribute("data-emoji", "☕");
    script.setAttribute("data-font", "Inter");
    script.setAttribute("data-text", "Buy me a coffee");
    script.setAttribute("data-outline-color", "#000000");
    script.setAttribute("data-font-color", "#000000");
    script.setAttribute("data-coffee-color", "#ffffff");

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[data-name="bmc-button"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/30 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>

          <nav className="flex items-center space-x-2">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              href="/youtube"
              className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50/80 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
            >
              <Youtube className="w-4 h-4" />
              <span className="hidden sm:inline">YouTube</span>
            </Link>

            {/* Custom styled Buy Me a Coffee button */}
            <div className="relative">
              <a
                href="https://buymeacoffee.com/theaslan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
              >
                <Coffee className="w-4 h-4" />
                <span className="hidden md:inline">Buy me a coffee</span>
                <span className="md:hidden">☕</span>
              </a>
            </div>

            {/* Alternative: Use the official Buy Me a Coffee widget (uncomment to use) */}
            {/*
            <div className="bmcButton-container" style={{ transform: 'scale(0.9)' }}>
              <div id="bmc-button"></div>
            </div>
            */}
          </nav>
        </div>
      </div>

      <style jsx global>{`
        /* Custom styles for Buy Me a Coffee button if using the official widget */
        .bmcButton-container {
          display: flex;
          align-items: center;
        }

        #bmc-button iframe {
          border-radius: 12px !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
            0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
        }

        /* Enhanced backdrop blur support */
        @supports (backdrop-filter: blur(16px)) {
          header {
            backdrop-filter: blur(16px);
          }
        }

        /* Smooth scrolling enhancement */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </header>
  );
}
