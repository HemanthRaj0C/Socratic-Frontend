// src/components/layout/PageLayout.tsx
'use client';

import { useState, useEffect } from 'react';
import Aurora from '@/components/Aurora/Aurora';
import Threads from '@/components/Threads/Threads';
import Footer from '@/components/layout/Footer';
import FlowingMenu from '@/components/FlowingMenu/FlowingMenu';
import PixelCard from '@/components/PixelCard/PixelCard';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import CardSwap, { Card } from '@/components/CardSwap/CardSwap';
import { 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Zap, 
  Turtle, 
  User, 
  Rocket, 
  Brain, 
  Target, 
  Shield, 
  MessageCircle, 
  BarChart3, 
  Globe, 
  GraduationCap
} from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
}

interface ServiceHealth { 
  status: 'online' | 'slow' | 'offline'; 
  service: string; 
  chat_enabled: boolean;
  services?: {
    colab: string;
    huggingface: string;
  };
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [serviceHealth, setServiceHealth] = useState<ServiceHealth | null>(null);

  // Check service health
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`);
        if (response.ok) {
          const health = await response.json();
          setServiceHealth(health);
        }
      } catch (error) {
        console.error('Health check failed:', error);
        setServiceHealth({ status: 'offline', service: 'none', chat_enabled: false });
      }
    };
    checkHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const refreshServiceStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`);
      if (response.ok) {
        const health = await response.json();
        setServiceHealth(health);
      }
    } catch (error) {
      console.error('Health check failed:', error);
      setServiceHealth({ status: 'offline', service: 'none', chat_enabled: false });
    }
  };

  // Technical features data for the flowing menu
  const technicalFeatures = [
    {
      link: "",
      text: "Built on Mistral AI Foundation",
      image: "" // You can replace with actual Mistral logo
    },
    {
      link: "",
      text: "Fine-tuned for Socratic Method",
      image: "" // Educational/brain icon
    },
    {
      link: "",
      text: "Redis for Lightning-Fast Responses",
      image: "" // Redis logo
    },
    {
      link: "",
      text: "Firebase for Reliable Data Storage",
      image: "" // Firebase logo
    },
    {
      link: "",
      text: "Real-time Conversational Learning",
      image: "" // Chat/conversation icon
    },
    {
      link: "",
      text: "Adaptive Questioning Algorithm",
      image: "" // Algorithm/AI icon
    }
  ];

  return (
    <div className="min-h-screen relative text-white overflow-x-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora 
          colorStops={["#1e3a8a", "#7c3aed", "#0891b2"]}
          amplitude={0.8}
          blend={0.3}
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10">
        {children}

        {/* Service Status Section */}
        {serviceHealth && (
          <section className="w-full py-8 px-6 border-t border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Service Status
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  Real-time status of our AI infrastructure
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={refreshServiceStatus}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 border border-blue-500/30 rounded-full hover:bg-blue-500/10 flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh Status</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Overall Status */}
                <SpotlightCard 
                  className={`p-4 rounded-lg backdrop-blur-sm ${
                    serviceHealth.status === 'online' 
                      ? 'bg-green-900/30 border-green-500/30' 
                      : serviceHealth.status === 'slow'
                      ? 'bg-yellow-900/30 border-yellow-500/30'
                      : 'bg-red-900/30 border-red-500/30'
                  }`}
                  spotlightColor={
                    serviceHealth.status === 'online' 
                      ? "rgba(34, 197, 94, 0.3)" 
                      : serviceHealth.status === 'slow'
                      ? "rgba(234, 179, 8, 0.3)"
                      : "rgba(239, 68, 68, 0.3)"
                  }
                >
                  <div className="flex items-center space-x-3">
                    {serviceHealth.status === 'online' ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : serviceHealth.status === 'slow' ? (
                      <AlertCircle className="w-6 h-6 text-yellow-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                    <div>
                      <h4 className="font-semibold">Overall Status</h4>
                      <p className={`text-sm ${
                        serviceHealth.status === 'online' ? 'text-green-300' : 
                        serviceHealth.status === 'slow' ? 'text-yellow-300' : 'text-red-300'
                      }`}>
                        {serviceHealth.status === 'online' ? 'All Systems Operational' : 
                         serviceHealth.status === 'slow' ? 'Degraded Performance' : 'Services Offline'}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>

                {/* Colab Status */}
                <SpotlightCard 
                  className={`p-4 rounded-lg backdrop-blur-sm ${
                    serviceHealth.services?.colab === 'online'
                      ? 'bg-green-900/30 border-green-500/30'
                      : serviceHealth.services?.colab === 'not_configured'
                      ? 'bg-gray-900/30 border-gray-500/30'
                      : 'bg-red-900/30 border-red-500/30'
                  }`}
                  spotlightColor={
                    serviceHealth.services?.colab === 'online'
                      ? "rgba(34, 197, 94, 0.3)"
                      : serviceHealth.services?.colab === 'not_configured'
                      ? "rgba(107, 114, 128, 0.3)"
                      : "rgba(239, 68, 68, 0.3)"
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <div>
                      <h4 className="font-semibold text-sm">Google Colab (GPU)</h4>
                      <p className={`text-xs ${
                        serviceHealth.services?.colab === 'online'
                          ? 'text-green-300'
                          : serviceHealth.services?.colab === 'not_configured'
                          ? 'text-gray-300'
                          : 'text-red-300'
                      }`}>
                        {serviceHealth.services?.colab === 'online' ? 'Online' :
                         serviceHealth.services?.colab === 'not_configured' ? 'Not Configured' :
                         'Offline'}
                        {serviceHealth.service === 'colab_gpu' && serviceHealth.services?.colab === 'online' ? ' (Active)' : ''}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>

                {/* HuggingFace Status */}
                <SpotlightCard 
                  className={`p-4 rounded-lg backdrop-blur-sm ${
                    serviceHealth.services?.huggingface === 'online'
                      ? serviceHealth.service === 'hf_cpu_slow' 
                        ? 'bg-yellow-900/30 border-yellow-500/30'
                        : 'bg-green-900/30 border-green-500/30'
                      : serviceHealth.services?.huggingface === 'not_configured'
                      ? 'bg-gray-900/30 border-gray-500/30'
                      : 'bg-red-900/30 border-red-500/30'
                  }`}
                  spotlightColor={
                    serviceHealth.services?.huggingface === 'online'
                      ? serviceHealth.service === 'hf_cpu_slow' 
                        ? "rgba(234, 179, 8, 0.3)"
                        : "rgba(34, 197, 94, 0.3)"
                      : serviceHealth.services?.huggingface === 'not_configured'
                      ? "rgba(107, 114, 128, 0.3)"
                      : "rgba(239, 68, 68, 0.3)"
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Turtle className="w-5 h-5 text-green-400" />
                    <div>
                      <h4 className="font-semibold text-sm">HuggingFace (CPU)</h4>
                      <p className={`text-xs ${
                        serviceHealth.services?.huggingface === 'online'
                          ? serviceHealth.service === 'hf_cpu_slow'
                            ? 'text-yellow-300'
                            : 'text-green-300'
                          : serviceHealth.services?.huggingface === 'not_configured'
                          ? 'text-gray-300'
                          : 'text-red-300'
                      }`}>
                        {serviceHealth.services?.huggingface === 'online' ? 'Online' :
                         serviceHealth.services?.huggingface === 'not_configured' ? 'Not Configured' :
                         'Offline'}
                        {serviceHealth.service === 'hf_cpu_slow' && serviceHealth.services?.huggingface === 'online' ? ' (Active)' : ''}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </div>

              <div className="text-center mt-4">
                <p className={`text-xs ${
                  serviceHealth.chat_enabled ? 'text-green-400' : 'text-red-400'
                }`}>
                  Chat Service: {serviceHealth.chat_enabled ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Developer Information Section */}
        <section className="w-full py-12 px-6 flex gap-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Crafted with Excellence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              
              {/* Developer Info Card */}
              <PixelCard 
                variant="blue"
                className='bg-black/30 backdrop-blur-sm'
              >
                <div className="text-center absolute">
                  <div className="flex justify-center mb-4">
                    <User className="w-12 h-12 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Hemanth Raj</h3>
                  <p className="text-blue-400 font-semibold mb-3">Lead Developer & AI Engineer</p>
                  <p className="text-gray-300 text-sm mb-4">
                    Passionate about creating intelligent educational systems that transform learning experiences through innovative AI technology.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a href="https://www.linkedin.com/in/hemanthrajc" target='_blank' referrerPolicy='no-referrer' className="text-blue-400 hover:text-blue-300 transition-colors">
                      <span className="text-sm">LinkedIn</span>
                    </a>
                    <a href="https://github.com/HemanthRaj0C" target='_blank' referrerPolicy='no-referrer' className="text-blue-400 hover:text-blue-300 transition-colors">
                      <span className="text-sm">GitHub</span>
                    </a>
                  </div>
                </div>
              </PixelCard>

              {/* Project Info Card */}
              <PixelCard 
                variant="pink"
                className='bg-black/30 backdrop-blur-sm'
              >
                <div className="text-center absolute">
                  <div className="flex justify-center mb-4">
                    <Rocket className="w-12 h-12 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Project Vision</h3>
                  <p className="text-pink-400 font-semibold mb-3">Revolutionizing Education</p>
                  <p className="text-gray-300 text-sm mb-4">
                    Built with cutting-edge technology stack including Next.js, TypeScript, Firebase, and fine-tuned AI models to deliver exceptional learning experiences.
                  </p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>Socratic Method Implementation</p>
                    <p>Real-time AI Responses</p>
                    <p>Secure Authentication</p>
                    <p>Performance Optimized</p>
                  </div>
                </div>
              </PixelCard>
              
            </div>
          </div>
        </section>
        
        {/* Core Features Showcase */}
        <section className="w-full py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Experience Next-Generation Learning
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Discover the powerful features that make our Socratic AI platform revolutionary in educational technology
              </p>
            </div>
            
            <div className="relative -right-20">
              <CardSwap
                width={320}
                height={220}
                cardDistance={45}
                verticalDistance={25}
                delay={3500}
                pauseOnHover={true}
                skewAmount={6}
                easing="elastic"
              >
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center shadow-2xl border border-blue-400/20">
                  <div className="flex justify-center mb-3">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Smart AI Reasoning</h4>
                  <p className="text-sm text-blue-100 mb-3">Advanced Mistral-based neural networks</p>
                  <div className="text-xs text-blue-200 space-y-1">
                    <p>• Natural Language Understanding</p>
                    <p>• Context-Aware Responses</p>
                    <p>• Multi-step Problem Solving</p>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center shadow-2xl border border-purple-400/20">
                  <div className="flex justify-center mb-3">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Lightning Fast</h4>
                  <p className="text-sm text-purple-100 mb-3">Redis-powered instant responses</p>
                  <div className="text-xs text-purple-200 space-y-1">
                    <p>• Sub-second Response Time</p>
                    <p>• Intelligent Caching</p>
                    <p>• Optimized Data Pipelines</p>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white text-center shadow-2xl border border-green-400/20">
                  <div className="flex justify-center mb-3">
                    <Target className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Personalized Learning</h4>
                  <p className="text-sm text-green-100 mb-3">Adaptive algorithms for every student</p>
                  <div className="text-xs text-green-200 space-y-1">
                    <p>• Learning Style Analysis</p>
                    <p>• Progress Tracking</p>
                    <p>• Custom Learning Paths</p>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white text-center shadow-2xl border border-orange-400/20">
                  <div className="flex justify-center mb-3">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Enterprise Security</h4>
                  <p className="text-sm text-orange-100 mb-3">Firebase-powered data protection</p>
                  <div className="text-xs text-orange-200 space-y-1">
                    <p>• End-to-End Encryption</p>
                    <p>• GDPR Compliant</p>
                    <p>• Secure Authentication</p>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white text-center shadow-2xl border border-pink-400/20">
                  <div className="flex justify-center mb-3">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Interactive Dialogue</h4>
                  <p className="text-sm text-pink-100 mb-3">Real-time conversational learning</p>
                  <div className="text-xs text-pink-200 space-y-1">
                    <p>• Socratic Questioning</p>
                    <p>• Dynamic Follow-ups</p>
                    <p>• Contextual Guidance</p>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-white text-center shadow-2xl border border-teal-400/20">
                  <div className="flex justify-center mb-3">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Analytics Dashboard</h4>
                  <p className="text-sm text-teal-100 mb-3">Comprehensive learning insights</p>
                  <div className="text-xs text-teal-200 space-y-1">
                    <p>• Performance Metrics</p>
                    <p>• Learning Analytics</p>
                    <p>• Progress Visualization</p>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white text-center shadow-2xl border border-indigo-400/20">
                  <div className="flex justify-center mb-3">
                    <Globe className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Multi-Platform</h4>
                  <p className="text-sm text-indigo-100 mb-3">Seamless cross-device experience</p>
                  <div className="text-xs text-indigo-200 space-y-1">
                    <p>• Responsive Design</p>
                    <p>• Mobile Optimized</p>
                    <p>• Cloud Synchronization</p>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white text-center shadow-2xl border border-red-400/20">
                  <div className="flex justify-center mb-3">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Educational Focus</h4>
                  <p className="text-sm text-red-100 mb-3">Pedagogy-driven design principles</p>
                  <div className="text-xs text-red-200 space-y-1">
                    <p>• Research-Based Methods</p>
                    <p>• Curriculum Alignment</p>
                    <p>• Assessment Integration</p>
                  </div>
                </Card>
              </CardSwap>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Each feature is meticulously crafted to enhance the learning experience, 
                combining cutting-edge AI technology with proven educational methodologies.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Features Section */}
        <section className="w-full py-12 px-6">
          <div className="max-w-6xl mx-auto mb-8">
            <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Powered by Advanced Technology
            </h2>
            <p className="text-gray-300 text-center max-w-3xl mx-auto">
              Experience the cutting-edge AI infrastructure that makes Socratic learning possible
            </p>
          </div>
          <FlowingMenu items={technicalFeatures} />
        </section>

        {/* Footer */}
        <Footer serviceHealth={serviceHealth} />
      </div>
    </div>
  );
}
