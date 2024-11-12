import React, { useState } from 'react';
import { ArrowLeft, LogOut, MapPin, Clock, CreditCard, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SavedAddressesPage from './SavedAddressesPage';
import OrderHistoryPage from './OrderHistoryPage';
import PaymentMethodsPage from './PaymentMethodsPage';
import SettingsPage from './SettingsPage';

interface AccountPageProps {
  onBack: () => void;
}

type SubPage = 'main' | 'addresses' | 'orders' | 'payments' | 'settings';

export default function AccountPage({ onBack }: AccountPageProps) {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<SubPage>('main');

  const handleBack = () => {
    if (currentPage === 'main') {
      onBack();
    } else {
      setCurrentPage('main');
    }
  };

  const menuItems = [
    { icon: MapPin, label: 'Saved Addresses', onClick: () => setCurrentPage('addresses') },
    { icon: Clock, label: 'Order History', onClick: () => setCurrentPage('orders') },
    { icon: CreditCard, label: 'Payment Methods', onClick: () => setCurrentPage('payments') },
    { icon: Settings, label: 'Settings', onClick: () => setCurrentPage('settings') },
    { icon: LogOut, label: 'Logout', onClick: logout, className: 'text-red-500' }
  ];

  switch (currentPage) {
    case 'addresses':
      return <SavedAddressesPage onBack={handleBack} />;
    case 'orders':
      return <OrderHistoryPage onBack={handleBack} />;
    case 'payments':
      return <PaymentMethodsPage onBack={handleBack} />;
    case 'settings':
      return <SettingsPage onBack={handleBack} />;
    default:
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="flex items-center p-4 bg-white border-b">
            <button onClick={handleBack} className="p-2">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="flex-1 text-center text-xl font-semibold">Profile</h1>
          </div>

          <div className="bg-white p-6 mb-4">
            <div className="flex items-center">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="ml-4">
                <h2 className="font-semibold text-lg">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center px-6 py-4 hover:bg-gray-50 ${
                  index !== menuItems.length - 1 ? 'border-b' : ''
                } ${item.className || ''}`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
  }
}