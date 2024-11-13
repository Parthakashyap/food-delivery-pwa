import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutPageProps {
  onBack: () => void;
}

export default function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { getTotalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const deliveryFee = 99;
  const tax = getTotalPrice() * 0.1;
  const total = getTotalPrice() + deliveryFee + tax;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold">Checkout</h1>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Delivery Address */}
        <section>
          <h2 className="font-semibold mb-2">Delivery Address</h2>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Home</p>
              <p className="text-sm text-gray-500">123 Main St, Apt 4B</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h2 className="font-semibold mb-2">Payment Method</h2>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span>Credit Card</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span>Cash on Delivery</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </label>
          </div>
        </section>

        {/* Order Summary */}
        <section>
          <h2 className="font-semibold mb-2">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button 
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium"
          onClick={() => alert('Order placed successfully!')}
        >
          Place Order · ₹{total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}