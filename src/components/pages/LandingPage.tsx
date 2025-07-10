// src/components/pages/LandingPage.tsx
'use client';

import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import { HelpCircle, Target, Lightbulb, Mail, Link, Smartphone } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <>
      {/* Header with Logo */}
      <header className="flex justify-between items-center p-4 sm:p-6">
        <div className="flex items-center space-x-2">
          <span className="text-lg sm:text-xl font-bold">Socratic AI</span>
        </div>
      </header>

      {/* Main Landing Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 text-center">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Socratic AI Tutor
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl px-2">
            Experience the power of AI-driven education. Learn through guided questions, 
            personalized feedback, and interactive conversations.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 max-w-4xl w-full">
          <SpotlightCard 
            className="p-4 sm:p-6 rounded-lg"
            spotlightColor="rgba(59, 130, 246, 0.3)"
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Socratic Method</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Learn through guided questioning and critical thinking</p>
          </SpotlightCard>
          
          <SpotlightCard 
            className="p-4 sm:p-6 rounded-lg"
            spotlightColor="rgba(139, 92, 246, 0.3)"
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Personalized</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Tailored learning experience based on your needs</p>
          </SpotlightCard>
          
          <SpotlightCard 
            className="p-4 sm:p-6 rounded-lg sm:col-span-2 lg:col-span-1"
            spotlightColor="rgba(8, 145, 178, 0.3)"
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Interactive</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Engage in meaningful conversations with AI</p>
          </SpotlightCard>
        </div>

        {/* Call to Action */}
        <div className="text-center w-full max-w-sm sm:max-w-md">
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 px-2">Ready to revolutionize your learning experience?</p>
          
          {/* Enhanced Google Login Button */}
          <div className="space-y-4">
            <button 
              onClick={onLogin} 
              className="group relative w-full px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-50 text-gray-800 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-gray-200 flex items-center justify-center space-x-3 min-h-[52px] sm:min-h-[60px]"
            >
              {/* Google Logo SVG */}
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
              
              {/* Hover Effect Gradient Border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 p-[2px]">
                <div className="w-full h-full bg-white rounded-xl"></div>
              </div>
            </button>
          </div>
          
          {/* Alternative Login Options Placeholder */}
          <div className="my-6 sm:my-8 pt-4 sm:pt-6 border-t border-gray-700">
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">More options coming soon</p>
            <div className="flex justify-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-lg flex items-center justify-center opacity-50">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-lg flex items-center justify-center opacity-50">
                <Link className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-lg flex items-center justify-center opacity-50">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
