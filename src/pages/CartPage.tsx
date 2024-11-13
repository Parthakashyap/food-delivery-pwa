import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartPage({ onClose, onCheckout }: CartPageProps) {
  const { items, updateQuantity, getTotalPrice } = useCart();
  const deliveryFee = 99;
  const tax = getTotalPrice() * 0.1;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Cart</h1>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4">
        <div className="text-green-600 mb-4">
          ₹{deliveryFee} delivery fee · 20-30 min
        </div>

        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="text-gray-500"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="text-gray-500"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <span>Add special instructions</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Item total</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Promo applied</span>
              <span>-₹0.00</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total</span>
              <span>₹{(getTotalPrice() + deliveryFee + tax).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button 
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium"
          onClick={onCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}