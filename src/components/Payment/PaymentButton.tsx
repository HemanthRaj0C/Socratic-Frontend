'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

// Add Razorpay to Window interface
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentButtonProps {
  amount: number;
  description?: string;
  onSuccess?: (paymentData: any) => void;
  onError?: (error: any) => void;
  className?: string;
}

export default function PaymentButton({
  amount,
  description = "Payment for Socratic AI services",
  onSuccess,
  onError,
  className = ""
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async () => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const token = await user.getIdToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'INR',
        notes: {
          description: description,
          user_id: user.uid
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create order');
    }

    return response.json();
  };

  const handlePayment = async () => {
    if (amount <= 0) {
      onError?.({ message: 'Invalid amount' });
      return;
    }

    if (!user) {
      onError?.({ message: 'Please login to make a payment' });
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay script failed to load');
      }

      // Create order on backend
      const order = await createOrder();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Socratic AI',
        description: description,
        image: '/favicon.ico',
        order_id: order.id,
        handler: (response: any) => {
          console.log('Payment successful:', response);
          onSuccess?.(response);
        },
        prefill: {
          name: user.displayName || 'User',
          email: user.email || '',
          contact: ''
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      
      razorpay.on('payment.failed', (response: any) => {
        console.error('Payment failed:', response);
        onError?.(response.error);
      });

      razorpay.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      onError?.(error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || amount <= 0 || !user}
      className={`
        bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
        text-white font-semibold py-3 px-8 rounded-lg 
        transition-colors duration-200 flex items-center justify-center gap-2
        ${className}
      `}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Processing...
        </>
      ) : !user ? (
        'Login Required'
      ) : (
        `Pay ₹${amount}`
      )}
    </button>
  );
}
