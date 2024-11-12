import React from 'react';
import { ArrowLeft, Plus, Home, Briefcase, MapPin, Edit, Trash2 } from 'lucide-react';

interface SavedAddressesPageProps {
  onBack: () => void;
}

const addresses = [
  {
    id: 1,
    type: 'Home',
    address: '123 Main Street, Apt 4B',
    details: 'Near Central Park',
    icon: Home
  },
  {
    id: 2,
    type: 'Work',
    address: '456 Business Ave, Floor 12',
    details: 'Reception desk',
    icon: Briefcase
  }
];

export default function SavedAddressesPage({ onBack }: SavedAddressesPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center p-4 bg-white border-b">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold">Saved Addresses</h1>
      </div>

      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-lg mb-6">
          <Plus className="w-5 h-5" />
          Add New Address
        </button>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <address.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{address.type}</h3>
                    <p className="text-gray-600 text-sm">{address.address}</p>
                    <p className="text-gray-400 text-sm">{address.details}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}