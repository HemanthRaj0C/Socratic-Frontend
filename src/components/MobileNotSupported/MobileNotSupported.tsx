// src/components/MobileNotSupported/MobileNotSupported.tsx
'use client';

import { useState, useEffect } from 'react';
import Aurora from '@/components/Aurora/Aurora';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import { 
  Laptop,
  Smartphone,
  ArrowRight,
  Monitor,
  Tablet,
  Brain,
  Rocket,
  Zap,
  GraduationCap
} from 'lucide-react';

export default function MobileNotSupported() {
  return (
    <div className="min-h-screen relative text-white overflow-hidden flex items-center justify-center">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora 
          colorStops={["#1e3a8a", "#7c3aed", "#0891b2"]}
          amplitude={2.0}
          blend={0.6}
        />
      </div>
      
      <div className="relative z-10 px-6 py-8 max-w-md mx-auto text-center">
        {/* Animated Device Icons */}
        <div className="mb-8 relative">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="animate-bounce delay-100">
              <Smartphone className="w-12 h-12 text-red-400" />
            </div>
            <div className="animate-pulse">
              <ArrowRight className="w-8 h-8 text-gray-400" />
            </div>
            <div className="animate-bounce delay-300">
              <Laptop className="w-16 h-16 text-green-400" />
            </div>
          </div>
          
          {/* Floating secondary devices */}
          <div className="absolute -top-4 -left-4 animate-float">
            <Tablet className="w-8 h-8 text-yellow-400 opacity-60" />
          </div>
          <div className="absolute -top-2 -right-6 animate-float delay-500">
            <Monitor className="w-10 h-10 text-blue-400 opacity-60" />
          </div>
        </div>

        {/* Main Content */}
        <SpotlightCard 
          className="p-8 bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl"
          spotlightColor="rgba(59, 130, 246, 0.4)"
        >
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
                Oops! 
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded mx-auto mb-4"></div>
            </div>

            {/* Brain Icon with Animation */}
            <div className="relative">
              <div className="animate-pulse">
                <Brain className="w-20 h-20 text-purple-400 mx-auto" />
              </div>
              <div className="absolute inset-0 animate-ping">
                <Brain className="w-20 h-20 text-purple-400 mx-auto opacity-20" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white flex items-center justify-center gap-2">
                Big Ideas Need Big Screens!
              </h2>
              
              <p className="text-gray-300 leading-relaxed">
                Our <a className="text-blue-400 font-semibold" href='/'>Socratic AI</a> experience is designed for desktop computers to give you the full immersive learning environment you deserve.
              </p>
              
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-sm text-gray-200 flex items-center gap-2">
                  <span className="text-yellow-400"></span> Switch to your laptop or desktop for the complete AI tutoring experience with interactive features, real-time conversations, and advanced learning tools.
                </p>
              </div>
            </div>

            {/* Device Requirements */}
            <div className="space-y-3">
              <p className="text-sm text-gray-400 font-medium">Recommended Devices:</p>
              <div className="flex justify-center space-x-6">
                <div className="text-center">
                  <Laptop className="w-8 h-8 text-green-400 mx-auto mb-1" />
                  <span className="text-xs text-green-300">Laptop</span>
                </div>
                <div className="text-center">
                  <Monitor className="w-8 h-8 text-blue-400 mx-auto mb-1" />
                  <span className="text-xs text-blue-300">Desktop</span>
                </div>
              </div>
            </div>

            {/* Fun Message */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-400/30">
              <p className="text-sm text-purple-200 flex items-center gap-2">
                <span className="text-purple-400"></span> Great minds think big - and so should your screen! We're working on mobile support for future updates.
              </p>
            </div>

            {/* Call to Action */}
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 text-blue-400 text-sm animate-bounce">
                <span>Fire up that laptop and let's learn!</span>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Socratic AI - Transforming Education Through Intelligent Conversations
          </p>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
