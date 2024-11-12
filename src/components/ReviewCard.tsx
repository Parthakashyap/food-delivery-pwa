import React from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
}

export default function ReviewCard({ name, date, rating, comment, likes }: ReviewCardProps) {
  return (
    <div className="py-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? 'text-green-500 fill-green-500' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-600 mb-2">{comment}</p>
      <div className="flex gap-4">
        <button className="flex items-center gap-1 text-gray-500">
          <ThumbsUp className="w-4 h-4" /> {likes}
        </button>
        <button className="flex items-center gap-1 text-gray-500">
          <ThumbsDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}