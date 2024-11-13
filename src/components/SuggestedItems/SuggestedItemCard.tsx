import React from 'react';
import { Plus } from 'lucide-react';

interface SuggestedItemCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurant: string;
  onAdd: () => void;
}

export default function SuggestedItemCard({ 
  name, 
  price, 
  image, 
  restaurant, 
  onAdd 
}: SuggestedItemCardProps) {
  return (
    <div className="flex-none w-40">
      <div className="relative group">
        <img 
          src={image} 
          alt={name}
          className="w-40 h-40 object-cover rounded-xl"
        />
        <button
          onClick={onAdd}
          className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg opacity-90 hover:opacity-100 transition-opacity"
        >
          <Plus className="w-5 h-5 text-green-600" />
        </button>
      </div>
      <div className="mt-2">
        <h3 className="font-medium text-sm">{name}</h3>
        <p className="text-gray-500 text-sm">{restaurant}</p>
        <p className="text-green-600 font-medium">₹{price}</p>
      </div>
    </div>
  );
}