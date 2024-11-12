import React from 'react';
import { Plus } from 'lucide-react';

interface MenuItemProps {
  name: string;
  price: number;
  image: string;
  description?: string;
  onAdd?: () => void;
}

export default function MenuItem({ name, price, image, description, onAdd }: MenuItemProps) {
  return (
    <div className="flex items-center gap-4 py-4">
      <img src={image} alt={name} className="w-16 h-16 rounded-lg object-cover" />
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-gray-500">₹{price}</p>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>
      <button 
        className="p-2 rounded-full bg-green-50 text-green-600"
        onClick={onAdd}
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}