export interface SuggestedItem {
    id: string;
    name: string;
    price: number;
    image: string;
    restaurant: string;
  }
  
  export const suggestedItems: SuggestedItem[] = [
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