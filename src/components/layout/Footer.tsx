// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import DotGrid from '@/components/DotGrid/DotGrid';
import { FileText, Heart, Shield } from 'lucide-react';

interface ServiceHealth { 
  status: 'online' | 'slow' | 'offline'; 
  service: string; 
  chat_enabled: boolean;
}

interface FooterProps {
  serviceHealth?: ServiceHealth | null;
}

export default function Footer({ serviceHealth }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full h-32 sm:h-40 mt-6 sm:mt-8">
      <DotGrid 
        dotSize={2}
        gap={20}
        baseColor="#374151"
        activeColor="#3b82f6"
        proximity={50}
        className="w-full h-full"
      />
      <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6">
        {/* Top Row - Service Status and Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between my-2 sm:mb-4 space-y-2 sm:space-y-0">
          {/* Service Status Indicator - Left Side */}
          {serviceHealth && (
            <div className="flex items-center space-x-2 order-2 sm:order-1 my-3 sm:my-0">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                serviceHealth.status === 'online' ? 'bg-green-400' : 
                serviceHealth.status === 'slow' ? 'bg-yellow-400' : 'bg-red-400'
              }`}></div>
              <span className={`text-xs ${
                serviceHealth.status === 'online' ? 'text-green-400' : 
                serviceHealth.status === 'slow' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                AI {serviceHealth.status === 'online' ? 'Online' : 
                     serviceHealth.status === 'slow' ? 'Slow' : 'Offline'}
              </span>
            </div>
          )}
          
          {/* Navigation Links - Right Side */}
          <div className="flex items-center space-x-3 sm:space-x-6 order-1 sm:order-2">
            <Link 
              href="/terms" 
              className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm"
            >
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Terms & Conditions</span>
              <span className="sm:hidden">Terms</span>
            </Link>
            <Link 
              href="/support" 
              className="flex items-center space-x-1 text-gray-400 hover:text-pink-400 transition-colors text-xs sm:text-sm"
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Support Us</span>
              <span className="sm:hidden">Support</span>
            </Link>
          </div>
        </div>
        
        {/* Bottom Row - Copyright */}
        <div className="text-center pb-3 sm:pb-6">
          <p className="text-gray-400 text-xs sm:text-sm leading-tight">
            <span className="hidden sm:inline">{currentYear} Socratic AI - Empowering Learning Through Questions</span>
            <span className="sm:hidden">{currentYear} Socratic AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
