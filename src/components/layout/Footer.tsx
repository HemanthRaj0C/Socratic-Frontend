// src/components/layout/Footer.tsx
'use client';

import DotGrid from '@/components/DotGrid/DotGrid';

export default function Footer() {
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
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-400 text-sm">{currentYear} Socratic AI - Empowering Learning Through Questions</p>
      </div>
    </footer>
  );
}
