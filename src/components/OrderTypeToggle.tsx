import React from 'react';

export default function OrderTypeToggle() {
  return (
    <div className="flex gap-4 p-4">
      <button className="flex-1 bg-white py-2 rounded-full border border-gray-200 font-medium">
        Delivery
      </button>
      <button className="flex-1 text-gray-500 py-2 rounded-full">
        Pickup
      </button>
    </div>
  );
}