import React from 'react';
import RestaurantHeader from '../components/RestaurantHeader';
import OrderTypeToggle from '../components/OrderTypeToggle';
import MenuItem from '../components/MenuItem';
import ReviewCard from '../components/ReviewCard';
import { useCart } from '../context/CartContext';

interface RestaurantDetailsProps {
  onBack: () => void;
  onCartClick: () => void;
}

export default function RestaurantDetails({ onBack, onCartClick }: RestaurantDetailsProps) {
  const { items, addItem } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleAddItem = (name: string, price: number, image: string) => {
    addItem({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      price,
      image,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white sticky top-0 z-20">
        <RestaurantHeader
          name="KFC"
          image="https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&q=80"
          description="Fast-food chain known for its buckets of fried chicken, plus wings & sides."
          onBack={onBack}
        />
        <OrderTypeToggle />
      </div>

      <div className="pb-32">
        <section className="mt-4 bg-white p-4">
          <h2 className="text-xl font-bold mb-4">Popular Items</h2>
          <MenuItem
            name="8 Piece Chicken Bucket"
            price={230}
            image="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80"
            description="Original Recipe or Extra Crispy"
            onAdd={() => handleAddItem("8 Piece Chicken Bucket", 230, "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80")}
          />
          <MenuItem
            name="Crispy Colonel Sandwich"
            price={230}
            image="https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?auto=format&fit=crop&q=80"
            description="Crispy Colonel Sandwich, 2 Sides & a Biscuit"
            onAdd={() => handleAddItem("Crispy Colonel Sandwich", 230, "https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?auto=format&fit=crop&q=80")}
          />
        </section>

        <section className="mt-4 bg-white p-4">
          <h2 className="text-xl font-bold mb-4">What people are saying</h2>
          <ReviewCard
            name="David"
            date="12/4/22"
            rating={5}
            comment="I ordered the 8 piece bucket and it's so good! The skin is crispy and the meat is tender."
            likes={2}
          />
          <ReviewCard
            name="Adele"
            date="11/5/21"
            rating={4}
            comment="The fries are really good. I can't stop eating them."
            likes={3}
          />
        </section>
      </div>

      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-30">
          <button 
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium transition-colors hover:bg-green-600"
            onClick={onCartClick}
          >
            View cart ({itemCount} items)
          </button>
        </div>
      )}
    </div>
  );
}