// src/components/pages/WelcomePage.tsx
'use client';

import { useRouter } from "next/navigation";
import { User } from 'firebase/auth';
import CircularText from '@/components/CircularText/CircularText';
import { MessageCircle, ArrowRight, CreditCard } from 'lucide-react';

interface WelcomePageProps {
  user: User;
}

export default function WelcomePage({ user }: WelcomePageProps) {
  const router = useRouter();

  return (
    <>
      {/* Header with Logo */}
      <header className="flex justify-between items-center p-4 sm:p-6">
        <div className="flex items-center space-x-2">
          <span className="text-lg sm:text-xl font-bold">Socratic AI</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-xs sm:text-sm text-gray-300 hidden sm:block truncate max-w-[120px] sm:max-w-none">
            {user.displayName || user.email}
          </span>
          <div className="relative">
            <CircularText 
              text="WELCOME•USER•" 
              spinDuration={5}
              onHover="slowDown"
              className="bg-gradient-to-r from-slate-400 via-gray-500 to-slate-400 bg-clip-text text-transparent"
            />
            <div className="absolute inset-0 flex items-center justify-center -z-50">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent p-2 sm:p-3 rounded-full">
                {user?.displayName?.[0] || user?.email?.[0] || 'U'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Welcome Back!
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl px-2">
            Ready to continue your learning journey? Dive into personalized AI tutoring sessions.
          </p>
        </div>

        {/* Enhanced Go to Chat Button */}
        <div className="text-center w-full max-w-sm sm:max-w-md">
          <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6 px-2">Start your personalized learning session</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => router.push('/chat')} 
              className="group relative w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-slate-700 via-gray-700 to-slate-700 hover:from-slate-600 hover:via-gray-600 hover:to-slate-600 rounded-xl text-lg sm:text-xl font-semibold text-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden min-w-[200px] border border-slate-600"
            >
              {/* Button Content */}
              <div className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Start Learning</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </div>
              
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600 via-gray-600 to-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
