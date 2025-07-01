// src/components/MobileWrapper/MobileWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import MobileNotSupported from '@/components/MobileNotSupported/MobileNotSupported';

interface MobileWrapperProps {
  children: React.ReactNode;
}

export default function MobileWrapper({ children }: MobileWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Less than lg breakpoint
      setIsLoading(false);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show loading or nothing while checking screen size to prevent hydration mismatch
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If mobile, show mobile-not-supported page
  if (isMobile) {
    return <MobileNotSupported />;
  }

  // Otherwise, render children normally
  return <>{children}</>;
}
