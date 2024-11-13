import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, History, Trash2, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface SearchPageProps {
  onBack?: () => void;
  onCartClick?: () => void;
}

const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Chicken Burger',
    restaurant: 'KFC',
    price: 199,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    name: 'Pizza Margherita',
    restaurant: 'Pizza Hub',
    price: 299,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    name: 'Chicken Wings',
    restaurant: 'Wing Stop',
    price: 249,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80'
  }
];

const POPULAR_SEARCHES = ['Pizza', 'Burger', 'Chinese', 'Ice Cream'];

export default function SearchPage({ onBack, onCartClick }: SearchPageProps) {
  const { addItem, items } = useCart();
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(SAMPLE_PRODUCTS);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (query) {
      const filtered = SAMPLE_PRODUCTS.filter(
        product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.restaurant.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query]);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory(prev => [searchTerm, ...prev].slice(0, 5));
    }
  };

  const handleAddToCart = (product: typeof SAMPLE_PRODUCTS[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const handleBack = () => {
    if (query) {
      setQuery('');
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Search Header */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="flex items-center gap-3 p-4">
          <button onClick={handleBack}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for food or restaurants"
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="p-4">
        {!query && (
          <>
            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold">Recent Searches</h2>
                  <button 
                    onClick={clearHistory}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {searchHistory.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(term)}
                      className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <History className="w-5 h-5 text-gray-400" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div className="mb-6">
              <h2 className="font-semibold mb-3">Popular Searches</h2>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(term)}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Search Results */}
        {query && (
          <div className="space-y-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div 
                  key={product.id}
                  className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.restaurant}</p>
                    <p className="text-green-600">₹{product.price}</p>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cart Button */}
      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <button 
            onClick={onCartClick}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium"
          >
            View Cart ({itemCount} items)
          </button>
        </div>
      )}
    </div>
  );
}