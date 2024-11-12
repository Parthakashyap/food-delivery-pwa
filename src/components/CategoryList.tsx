import React from 'react';
import { Utensils, Coffee, Wine, IceCream2 } from 'lucide-react';

const categories = [
  { id: 1, name: 'Thai', icon: Utensils, color: 'bg-orange-100' },
  { id: 2, name: 'Fast Food', icon: Coffee, color: 'bg-green-100' },
  { id: 3, name: 'Drinks', icon: Wine, color: 'bg-purple-100' },
  { id: 4, name: 'Dessert', icon: IceCream2, color: 'bg-blue-100' },
];

export default function CategoryList() {
  return (
    <div className="flex justify-between px-2 py-4">
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col items-center space-y-1">
          <div className={`p-3 rounded-xl ${category.color}`}>
            <category.icon className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
}