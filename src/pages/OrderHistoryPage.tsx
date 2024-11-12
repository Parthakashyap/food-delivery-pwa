import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface OrderHistoryPageProps {
  onBack: () => void;
}

const orders = [
  {
    id: 'ORD001',
    restaurant: 'KFC',
    date: '2024-03-15',
    items: ['8 Piece Chicken Bucket', 'Fries'],
    total: 299.99,
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&q=80'
  },
  {
    id: 'ORD002',
    restaurant: 'Mexican Taste',
    date: '2024-03-10',
    items: ['Tacos', 'Nachos'],
    total: 199.99,
    status: 'Delivered',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80'
  }
];

export default function OrderHistoryPage({ onBack }: OrderHistoryPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center p-4 bg-white border-b">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold">Order History</h1>
      </div>

      <div className="p-4 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex gap-4">
              <img 
                src={order.image} 
                alt={order.restaurant} 
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{order.restaurant}</h3>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span className="text-green-500 text-sm font-medium">
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {order.items.join(', ')}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">₹{order.total}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}