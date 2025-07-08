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
    <footer className="relative w-full h-40 mt-8">
      <DotGrid 
        dotSize={2}
        gap={20}
        baseColor="#374151"
        activeColor="#3b82f6"
        proximity={50}
        className="w-full h-full"
      />
      <div className="absolute inset-0 flex flex-col justify-center px-6">
        {/* Top Row - Service Status and Links */}
        <div className="flex items-center justify-between mb-4">
          {/* Service Status Indicator - Left Side */}
          {serviceHealth && (
            <div className="flex items-center space-x-2">
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
          <div className="flex items-center space-x-6">
            <Link 
              href="/terms" 
              className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors text-sm"
            >
              <Shield className="w-4 h-4" />
              <span>Terms & Conditions</span>
            </Link>
            <Link 
              href="/support" 
              className="flex items-center space-x-1 text-gray-400 hover:text-pink-400 transition-colors text-sm"
            >
              <Heart className="w-4 h-4" />
              <span>Support Us</span>
            </Link>
          </div>
        </div>
        
        {/* Bottom Row - Copyright */}
        <div className="text-center pb-6">
          <p className="text-gray-400 text-sm">{currentYear} Socratic AI - Empowering Learning Through Questions</p>
        </div>
      </div>
    </footer>
  );
}
