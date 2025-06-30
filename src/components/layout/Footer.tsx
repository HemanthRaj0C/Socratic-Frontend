// src/components/layout/Footer.tsx
'use client';

import DotGrid from '@/components/DotGrid/DotGrid';

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
    <footer className="relative w-full h-35 mt-8">
      <DotGrid 
        dotSize={2}
        gap={20}
        baseColor="#374151"
        activeColor="#3b82f6"
        proximity={50}
        className="w-full h-full"
      />
      <div className="absolute inset-0 flex items-center px-6">
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
        
        {/* Centered Text */}
        <p className="text-gray-400 text-sm flex-1 text-center">{currentYear} Socratic AI - Empowering Learning Through Questions</p>
      </div>
    </footer>
  );
}
