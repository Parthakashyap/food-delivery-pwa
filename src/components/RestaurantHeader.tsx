import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface RestaurantHeaderProps {
  name: string;
  image: string;
  description: string;
  onBack: () => void;
}

export default function RestaurantHeader({ name, image, description, onBack }: RestaurantHeaderProps) {
  return (
    <div className="text-center pb-4">
      <div className="relative py-4">
        <button className="absolute left-0 p-2" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">{name}</h1>
      </div>
      <div className="w-24 h-24 mx-auto mb-4">
        <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
      </div>
      <p className="text-gray-500 text-sm px-8">{description}</p>
      <button className="w-full bg-green-50 text-green-800 py-3 rounded-lg mt-4 font-medium">
        Start Order
      </button>
    </div>
  );
}