// src/app/support/page.tsx
// @ts-nocheck
'use client';

import PageLayout from '@/components/layout/PageLayout';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import BlurText from '@/components/BlurText/BlurText';
import { Coffee, Heart, Star, CreditCard, QrCode, ExternalLink } from 'lucide-react';
import Carousel, { CarouselItem } from '@/components/Carousel/Carousel';
import Footer from '@/components/layout/Footer';
import { useState, useEffect } from 'react';

interface ServiceHealth { 
    status: 'online' | 'slow' | 'offline'; 
    service: string; 
    chat_enabled: boolean;
    services?: {
      colab: string;
      huggingface: string;
    };
  }

// Payment support carousel items
const paymentItems: CarouselItem[] = [
{
    id: 1,
    title: "Custom Amount",
    description: "Choose your own contribution amount",
    icon: <Heart className="w-5 h-5 text-red-400" />
},
{
    id: 2,
    title: "Support Education",
    description: "Help revolutionize AI learning",
    icon: <Coffee className="w-5 h-5 text-yellow-400" />
},
{
    id: 3,
    title: "Flexible Giving",
    description: "Your generosity, your choice",
    icon: <Star className="w-5 h-5 text-blue-400" />
}
];

export default function SupportPage() {
  const paymentOptions = [
    {
      id: 'coffee',
      title: 'Buy Me a Coffee',
      description: 'Fuel the late-night coding sessions!',
      amount: '₹99',
      icon: <Coffee className="w-8 h-8 text-yellow-400" />,
      qrCode: '/qr-codes/QrCode99.jpeg',
      razorpayLink: 'https://rzp.io/rzp/dcsEIREe', // Replace with actual link
      gradient: 'from-yellow-500/20 to-orange-500/20',
      border: 'border-yellow-400/30',
      spotlightColor: 'rgba(251, 191, 36, 0.4)',
      textColor: 'text-yellow-200'
    },
    {
      id: 'support',
      title: 'Show Some Love',
      description: 'Support ongoing development & improvements',
      amount: '₹499',
      icon: <Heart className="w-8 h-8 text-pink-400" />,
      qrCode: '/qr-codes/QrCode499.jpeg',
      razorpayLink: 'https://rzp.io/rzp/zLg0xbc', // Replace with actual link
      gradient: 'from-pink-500/20 to-purple-500/20',
      border: 'border-pink-400/30',
      spotlightColor: 'rgba(236, 72, 153, 0.4)',
      textColor: 'text-pink-200'
    },
    {
      id: 'super',
      title: 'Super Supporter',
      description: 'Become a hero of AI education!',
      amount: '₹1999',
      icon: <Star className="w-8 h-8 text-blue-400" />,
      qrCode: '/qr-codes/QrCode1999.jpeg',
      razorpayLink: 'https://rzp.io/rzp/XgUD9aG', // Replace with actual link
      gradient: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-400/30',
      spotlightColor: 'rgba(59, 130, 246, 0.4)',
      textColor: 'text-blue-200'
    }
  ];
  
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

    return (
      <>
      <div className="min-h-screen py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-pink-400" />
            </div>
            <BlurText 
              text="Help Keep This AI Magic Alive!"
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent"
              delay={50}
            />
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Your support helps us maintain and improve this AI-powered educational platform. 
              Choose your preferred payment method below.
            </p>
          </div>

          {/* Payment Options Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {paymentOptions.map((option) => (
              <SpotlightCard 
                key={option.id}
                className={`bg-gradient-to-br ${option.gradient} ${option.border} p-6 rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300`}
                spotlightColor={option.spotlightColor}
              >
                <div className="text-center">
                  {/* QR Code */}
                  <div className="mb-6">
                    <img 
                      src={option.qrCode} 
                      alt={`${option.title} QR Code`} 
                      className={`w-40 h-40 mx-auto rounded-lg border-2 ${option.border}`}
                    />
                  </div>

                  {/* Icon and Title */}
                  <div className="mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{option.title}</h3>
                  <p className={`${option.textColor} text-sm mb-4`}>{option.description}</p>
                  <p className="text-3xl font-bold text-white mb-6">{option.amount}</p>

                  {/* Payment Methods */}
                  <div className="space-y-3">
                    {/* QR Code Payment */}
                    <div className={`bg-black/30 p-3 rounded-lg border ${option.border}`}>
                      <div className="flex items-center justify-center space-x-2">
                        <QrCode className="w-5 h-5 text-gray-300" />
                        <span className="text-sm text-gray-300">Scan QR Code</span>
                      </div>
                    </div>

                    {/* Razorpay Link */}
                    <a 
                      href={option.razorpayLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block bg-gradient-to-r from-slate-700 via-gray-700 to-slate-700 hover:from-slate-600 hover:via-gray-600 hover:to-slate-600  border-slate-600 p-3 rounded-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <CreditCard className="w-5 h-5 text-white" />
                        <span className="text-sm text-white font-semibold">Pay with Razorpay</span>
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </a>
                  </div>

                  {/* Note */}
                  <p className={`${option.textColor} text-xs mt-4 opacity-75`}>
                    Choose any payment method that works for you
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Custom Amount Section */}
          <div className="text-center mb-12">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Want to contribute a different amount?
              </h3>
              {/* Custom Amount Carousel */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                    Or Choose Your Own Amount
                    </h3>
                    <div className="flex justify-center items-center mx-auto">
                    <div className="mx-auto">
                        <Carousel 
                        items={paymentItems}
                        baseWidth={400}
                        autoplay={true}
                        autoplayDelay={3000}
                        pauseOnHover={true}
                        loop={true}
                        />
                    </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-center">
            <BlurText 
              text="Every contribution, no matter how small, makes a huge difference!"
              className="text-gray-300 text-lg mb-6"
              delay={50}
            />
            <div className="bg-gradient-to-r from-pink-900/30 to-blue-900/30 p-6 rounded-xl border border-pink-400/30">
              <p className="text-gray-300 text-sm">
                Your support helps us keep this platform free and accessible to everyone. 
                Thank you for being part of our journey to revolutionize AI education!
              </p>
            </div>
          </div>
          </div>
      </div>
      <Footer serviceHealth={serviceHealth}/>
      </>
  );
}
