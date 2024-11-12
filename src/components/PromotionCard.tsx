import React from 'react';

interface PromotionCardProps {
  title: string;
  orderCount: number;
  image: string;
}

export default function PromotionCard({ title, orderCount, image }: PromotionCardProps) {
  return (
    <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center mb-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{orderCount} people have ordered</p>
        <button className="bg-black text-white px-6 py-2 rounded-lg">Order Now</button>
      </div>
      <img src={image} alt={title} className="w-24 h-24 rounded-xl object-cover" />
    </div>
  );
}