import React from 'react';
import { Clock, Star } from 'lucide-react';

interface RestaurantCardProps {
  name: string;
  image: string;
  deliveryFee: number;
  timeRange: string;
  rating: number;
}

export default function RestaurantCard({ name, image, deliveryFee, timeRange, rating }: RestaurantCardProps) {
  return (
    <div className="mb-6">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-xl" />
      <div className="mt-2">
        <h3 className="text-xl font-semibold">{name}</h3>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center text-gray-600">
            <span className="text-green-600">₹{deliveryFee}</span>
            <span className="mx-2">Delivery Fee</span>
            <Clock className="w-4 h-4 ml-2" />
            <span className="ml-1">{timeRange}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}