"use client";
import Link from "next/link";
import { Download, Home, Youtube, Coffee, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <Download className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              {title}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              href="/youtube"
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube</span>
            </Link>

            <a
              href="https://buymeacoffee.com/theaslan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-all duration-200 ml-2"
            >
              <Coffee className="w-4 h-4" />
              <span>Buy me a coffee</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 pt-4">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>

              <Link
                href="/youtube"
                className="flex items-center gap-3 px-3 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube</span>
              </Link>

              <a
                href="https://buymeacoffee.com/theaslan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Coffee className="w-4 h-4" />
                <span>Buy me a coffee</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
