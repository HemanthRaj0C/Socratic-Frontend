'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Order {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: any;
  paymentId?: string;
  notes?: any;
}

interface Payment {
  id: string;
  paymentId: string;
  orderId: string;
  amount: number;
  status: string;
  method?: string;
  capturedAt: any;
}

export default function PaymentHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'payments'>('orders');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPaymentHistory();
    }
  }, [user]);

  const fetchPaymentHistory = async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      // Fetch orders
      const ordersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
        headers
      });
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
      }

      // Fetch payments
      const paymentsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments`, {
        headers
      });
      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json();
        setPayments(paymentsData);
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    
    let date;
    if (timestamp.seconds) {
      // Firestore timestamp
      date = new Date(timestamp.seconds * 1000);
    } else {
      date = new Date(timestamp);
    }
    
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'captured':
        return 'text-green-400 bg-green-900/30';
      case 'failed':
        return 'text-red-400 bg-red-900/30';
      case 'created':
        return 'text-yellow-400 bg-yellow-900/30';
      default:
        return 'text-gray-400 bg-gray-900/30';
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-400">Please login to view payment history</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading payment history...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>
      
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2 px-1 font-medium transition-colors ${
            activeTab === 'orders'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-2 px-1 font-medium transition-colors ${
            activeTab === 'payments'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Payments ({payments.length})
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No orders found</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">Order #{order.orderId}</p>
                    <p className="text-sm text-gray-400">{formatDate(order.createdAt)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">₹{order.amount}</p>
                    {order.notes?.description && (
                      <p className="text-sm text-gray-400">{order.notes.description}</p>
                    )}
                  </div>
                  {order.paymentId && (
                    <p className="text-xs text-gray-500">Payment ID: {order.paymentId}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No payments found</p>
            </div>
          ) : (
            payments.map((payment) => (
              <div key={payment.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">Payment #{payment.paymentId}</p>
                    <p className="text-sm text-gray-400">{formatDate(payment.capturedAt)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">₹{payment.amount}</p>
                    {payment.method && (
                      <p className="text-sm text-gray-400">Method: {payment.method}</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Order: {payment.orderId}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
