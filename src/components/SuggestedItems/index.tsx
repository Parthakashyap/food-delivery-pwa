import React from 'react';
import { useCart } from '../../context/CartContext';
import SuggestedItemCard from './SuggestedItemCard';
import { suggestedItems, SuggestedItem } from './data';

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
          <SuggestedItemCard
            key={item.id}
            {...item}
            onAdd={() => handleAddItem(item)}
          />
        ))}
      </div>
    </div>
  );
}