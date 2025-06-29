// src/components/pages/LandingPage.tsx
'use client';

import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <>
      {/* Header with Logo */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">Socratic AI</span>
        </div>
      </header>

      {/* Main Landing Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Socratic AI Tutor
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Experience the power of AI-driven education. Learn through guided questions, 
            personalized feedback, and interactive conversations.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl">
          <SpotlightCard 
            className="p-6 rounded-lg"
            spotlightColor="rgba(59, 130, 246, 0.3)"
          >
            <div className="text-3xl mb-4">🤔</div>
            <h3 className="text-lg font-semibold mb-2">Socratic Method</h3>
            <p className="text-gray-400 text-sm">Learn through guided questioning and critical thinking</p>
          </SpotlightCard>
          
          <SpotlightCard 
            className="p-6 rounded-lg"
            spotlightColor="rgba(139, 92, 246, 0.3)"
          >
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Personalized</h3>
            <p className="text-gray-400 text-sm">Tailored learning experience based on your needs</p>
          </SpotlightCard>
          
          <SpotlightCard 
            className="p-6 rounded-lg"
            spotlightColor="rgba(8, 145, 178, 0.3)"
          >
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-lg font-semibold mb-2">Interactive</h3>
            <p className="text-gray-400 text-sm">Engage in meaningful conversations with AI</p>
          </SpotlightCard>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-gray-300 mb-8">Ready to revolutionize your learning experience?</p>
          
          {/* Enhanced Google Login Button */}
          <div className="space-y-4">
            <button 
              onClick={onLogin} 
              className="group relative px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-gray-200 flex items-center justify-center space-x-3 mx-auto min-w-[280px]"
            >
              {/* Google Logo SVG */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-500 mb-4">More options coming soon</p>
            <div className="flex justify-center space-x-4">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center opacity-50">
                <span className="text-lg">📧</span>
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center opacity-50">
                <span className="text-lg">🔗</span>
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center opacity-50">
                <span className="text-lg">📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
