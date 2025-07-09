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
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">Socratic AI</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-300">{user.displayName || user.email}</span>
          <div className="relative">
            <CircularText 
              text="WELCOME•USER•" 
              spinDuration={5}
              onHover="slowDown"
              className="bg-gradient-to-r from-slate-400 via-gray-500 to-slate-400 bg-clip-text text-transparent"
            />
            <div className="absolute inset-0 flex items-center justify-center -z-50">
              <span className="text-3xl font-bold bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent p-3 rounded-full">
                {user?.displayName?.[0] || user?.email?.[0] || 'U'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Ready to continue your learning journey? Dive into personalized AI tutoring sessions.
          </p>
        </div>

        {/* Enhanced Go to Chat Button */}
        <div className="text-center">
          <p className="text-lg text-gray-400 mb-6">Start your personalized learning session</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => router.push('/chat')} 
              className="group relative px-10 py-4 bg-gradient-to-r from-slate-700 via-gray-700 to-slate-700 hover:from-slate-600 hover:via-gray-600 hover:to-slate-600 rounded-xl text-xl font-semibold text-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden min-w-[200px] border border-slate-600"
            >
              {/* Button Content */}
              <div className="relative z-10 flex items-center justify-center space-x-3">
                <MessageCircle className="w-5 h-5" />
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600 via-gray-600 to-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>

            <button 
              onClick={() => router.push('/payment')} 
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-500 hover:to-blue-600 rounded-xl text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden min-w-[180px] border border-blue-600"
            >
              {/* Button Content */}
              <div className="relative z-10 flex items-center justify-center space-x-3">
                <CreditCard className="w-5 h-5" />
                <span>Payment Demo</span>
              </div>
              
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
