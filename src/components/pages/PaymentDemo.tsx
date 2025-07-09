'use client';

import { useState } from 'react';
import PaymentButton from '@/components/Payment/PaymentButton';
import PaymentHistory from '@/components/Payment/PaymentHistory';
import { useAuth } from '@/context/AuthContext';

export default function PaymentDemo() {
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [amount, setAmount] = useState(499);
  const [activeTab, setActiveTab] = useState<'payment' | 'history'>('payment');
  const { user } = useAuth();

  const handlePaymentSuccess = (paymentData: any) => {
    setPaymentStatus(`Payment successful! Payment ID: ${paymentData.razorpay_payment_id}`);
    console.log('Payment successful:', paymentData);
    // Refresh the page after a short delay to show updated payment history
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handlePaymentError = (error: any) => {
    setPaymentStatus(`Payment failed: ${error.description || error.message}`);
    console.error('Payment error:', error);
  };

  const predefinedAmounts = [99, 199, 499, 999];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Socratic AI Payment</h1>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('payment')}
            className={`pb-2 px-1 font-medium transition-colors ${
              activeTab === 'payment'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Make Payment
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2 px-1 font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Payment History
          </button>
        </div>

        {/* Payment Tab */}
        {activeTab === 'payment' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Select Amount</h2>
              
              {/* Predefined amounts */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                {predefinedAmounts.map((preAmount) => (
                  <button
                    key={preAmount}
                    onClick={() => setAmount(preAmount)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      amount === preAmount
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    ₹{preAmount}
                  </button>
                ))}
              </div>

              {/* Custom amount input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Custom Amount (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                  min="1"
                  max="100000"
                />
              </div>
              
              {/* Payment button */}
              <div className="text-center">
                <PaymentButton
                  amount={amount}
                  description={`Payment for Socratic AI services - ₹${amount}`}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  className="mx-auto"
                />
              </div>

              {!user && (
                <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                  <p className="text-sm text-yellow-200">
                    Please login to make payments and track your payment history.
                  </p>
                </div>
              )}
            </div>

            {/* Payment status */}
            {paymentStatus && (
              <div className={`p-4 rounded-lg mb-6 ${
                paymentStatus.includes('successful') 
                  ? 'bg-green-900/50 border border-green-500' 
                  : 'bg-red-900/50 border border-red-500'
              }`}>
                <h3 className="font-semibold mb-2">Payment Status:</h3>
                <p className="text-sm">{paymentStatus}</p>
              </div>
            )}

            {/* Setup Instructions */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Secure payments powered by Razorpay</p>
                <p>• Real-time payment processing</p>
                <p>• Complete payment history tracking</p>
                <p>• Automatic order creation and verification</p>
              </div>
            </div>
          </div>
        )}

        {/* Payment History Tab */}
        {activeTab === 'history' && (
          <PaymentHistory />
        )}
      </div>
    </div>
  );
}
