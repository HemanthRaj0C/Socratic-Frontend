// src/components/pages/NotFoundPage.tsx
'use client';

import { useRouter } from 'next/navigation';
import Aurora from '@/components/Aurora/Aurora';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import PixelCard from '@/components/PixelCard/PixelCard';
import CircularText from '@/components/CircularText/CircularText';
import CardSwap, { Card } from '@/components/CardSwap/CardSwap';
import FuzzyText from '@/components/FuzzyText/FuzzyText';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  MessageCircle, 
  Brain, 
  Lightbulb, 
  Target, 
  Rocket,
  AlertTriangle,
  HelpCircle,
  RefreshCw,
  Compass,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import Footer from '../layout/Footer';

export default function NotFoundPage() {
  const router = useRouter();

  const helpfulPages = [
    {
      title: "Start Learning",
      description: "Begin your AI tutoring journey",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "from-blue-500 to-purple-500",
      action: () => router.push('/chat')
    },
    {
      title: "Home Page",
      description: "Return to the main page",
      icon: <Home className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
      action: () => router.push('/')
    },
    {
      title: "New Conversation",
      description: "Start a fresh AI chat",
      icon: <MessageCircle className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      action: () => router.push('/chat')
    }
  ];

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora 
          colorStops={["#dc2626", "#7c2d12", "#1e1b4b"]}
          amplitude={1.5}
          blend={0.7}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-5">
        {/* Floating Question Marks */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            <HelpCircle className="w-6 h-6 text-red-400" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center">
            {/* Header with Glitch Effect */}
            <div className='flex justify-center items-center my-6'>
                <FuzzyText
                    fontSize="8rem"
                    fontWeight={900}
                    color="#ff6b35"
                    enableHover={true}
                    baseIntensity={0.3}
                    hoverIntensity={0.8}
                    >
                    404
                </FuzzyText>
            </div>

          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Oops! <br /> Page Not Found
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Looks like this page went on its own learning adventure! 
            Let's get you back to exploring with our AI tutor.
          </p>
        </div>

        {/* Main Action Card */}
        <div className="">
          <SpotlightCard 
            className="p-8 bg-black/40 backdrop-blur-lg border border-red-500/30 rounded-2xl max-w-md"
            spotlightColor="rgba(239, 68, 68, 0.4)"
          >
            <div className="text-center space-y-6">
              {/* Animated Brain Icon */}
              <div className="relative">
                <div className="animate-pulse">
                  <Brain className="w-16 h-16 text-red-400 mx-auto" />
                </div>
                <div className="absolute inset-0 animate-ping opacity-30">
                  <Brain className="w-16 h-16 text-red-400 mx-auto" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">
                  Don't worry, let's keep learning!
                </h2>
                <p className="text-gray-300 text-sm">
                  Every mistake is a learning opportunity. Our AI tutor is ready to help you discover new knowledge.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/chat')}
                  className="w-full group relative px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Start Learning Now</span>
                  </div>
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>

                <button
                  onClick={() => router.back()}
                  className="w-full px-6 py-3 border border-gray-600 hover:border-gray-500 rounded-xl font-semibold transition-all duration-300 hover:bg-white/5 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Go Back</span>
                </button>
              </div>
            </div>
          </SpotlightCard>
        </div>
        
        {/* Footer Message */}
        <Footer />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
