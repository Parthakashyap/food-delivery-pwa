import React from 'react';
import { ArrowLeft, Plus, CreditCard, Trash2 } from 'lucide-react';

interface PaymentMethodsPageProps {
  onBack: () => void;
}

const paymentMethods = [
  {
    id: 1,
    type: 'Visa',
    last4: '4242',
    expiry: '12/25'
  },
  {
    id: 2,
    type: 'Mastercard',
    last4: '8888',
    expiry: '09/24'
  }
];

export default function PaymentMethodsPage({ onBack }: PaymentMethodsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center p-4 bg-white border-b">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold">Payment Methods</h1>
      </div>

      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-lg mb-6">
          <Plus className="w-5 h-5" />
          Add New Card
        </button>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{method.type} ****{method.last4}</h3>
                    <p className="text-gray-500 text-sm">Expires {method.expiry}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}