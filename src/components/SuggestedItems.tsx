import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface SuggestedItem {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurant: string;
}

const suggestedItems: SuggestedItem[] = [
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    price: 299,
    restaurant: 'Indian Spice',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80'
  },
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    price: 399,
    restaurant: 'Pizza Hub',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80'
  },
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    price: 249,
    restaurant: 'Biryani House',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80'
  },
  {
    id: 'sushi-roll',
    name: 'Sushi Roll',
    price: 499,
    restaurant: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80'
  },
  {
    id: 'pasta-carbonara',
    name: 'Pasta Carbonara',
    price: 349,
    restaurant: 'Italian Taste',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80'
  }
];

export default function SuggestedItems() {
  const { addItem } = useCart();

  const handleAddItem = (item: SuggestedItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold mb-4">Quick Order</h2>
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-4 px-4">
        {suggestedItems.map((item) => (
          <div 
            key={item.id}
            className="flex-none w-40"
          >
            <div className="relative group">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-40 h-40 object-cover rounded-xl"
              />
              <button
                onClick={() => handleAddItem(item)}
                className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg opacity-90 hover:opacity-100 transition-opacity"
              >
                <Plus className="w-5 h-5 text-green-600" />
              </button>
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-sm">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.restaurant}</p>
              <p className="text-green-600 font-medium">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}