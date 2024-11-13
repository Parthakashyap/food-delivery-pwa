import React, { useState, Suspense, lazy } from 'react';
import SearchBar from './components/SearchBar';
import CategoryList from './components/CategoryList';
import RestaurantCard from './components/RestaurantCard';
import PromotionCard from './components/PromotionCard';
import BottomNav from './components/BottomNav';
import LoadingSpinner from './components/LoadingSpinner';
import SuggestedItems from './components/SuggestedItems';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';

// Lazy load pages
const RestaurantDetails = lazy(() => import('./pages/RestaurantDetails'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));

function AppContent() {
  const { isAuthenticated } = useAuth();
  const { items } = useCart();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'search' | 'account'>('home');

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleBack = () => {
    if (showCheckout) {
      setShowCheckout(false);
      return;
    }
    if (showCart) {
      setShowCart(false);
      return;
    }
    if (selectedRestaurant) {
      setSelectedRestaurant(null);
      return;
    }
    if (showAccount) {
      setShowAccount(false);
      setCurrentPage('home');
    }
    if (currentPage === 'search') {
      setCurrentPage('home');
    }
  };

  const handleAccountClick = () => {
    setShowAccount(true);
    setCurrentPage('account');
  };

  const handleSearchClick = () => {
    setCurrentPage('search');
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {showCheckout && (
        <CheckoutPage onBack={handleBack} />
      )}
      
      {showCart && !showCheckout && (
        <CartPage 
          onClose={handleBack} 
          onCheckout={() => setShowCheckout(true)}
        />
      )}

      {showAccount && (
        <AccountPage onBack={handleBack} />
      )}

      {currentPage === 'search' && (
        <SearchPage onBack={handleBack} onCartClick={handleCartClick} />
      )}
      
      {selectedRestaurant && !showCart && !showCheckout && !showAccount ? (
        <RestaurantDetails 
          onBack={handleBack} 
          onCartClick={handleCartClick}
        />
      ) : !showAccount && !showCart && !showCheckout && currentPage === 'home' ? (
        <div className="min-h-screen bg-white pb-20">
          <div className="max-w-md mx-auto px-4 py-6">
            <div onClick={handleSearchClick}>
              <SearchBar />
            </div>
            <CategoryList />
            
            <div 
              onClick={() => setSelectedRestaurant('mexican')}
              className="cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <RestaurantCard
                name="Mexican Taste"
                image="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80"
                deliveryFee={299}
                timeRange="30 - 45min"
                rating={4.7}
              />
            </div>
            
            <div 
              onClick={() => setSelectedRestaurant('italian')}
              className="cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <RestaurantCard
                name="Italian Taste"
                image="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80"
                deliveryFee={399}
                timeRange="30 - 45min"
                rating={4.8}
              />
            </div>

            <SuggestedItems />
            
            <PromotionCard
              title="Order best fried chicken wings"
              orderCount={344}
              image="https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80"
            />
          </div>
          <BottomNav 
            onAccountClick={handleAccountClick}
            onSearchClick={handleSearchClick}
            currentPage={currentPage}
          />

          {/* Floating Cart Button */}
          {itemCount > 0 && !showCart && (
            <div className="fixed bottom-20 left-0 right-0 p-4">
              <button 
                onClick={handleCartClick}
                className="w-full max-w-md mx-auto bg-green-500 text-white py-3 rounded-lg font-medium shadow-lg flex items-center justify-center gap-2"
              >
                View Cart ({itemCount} items)
              </button>
            </div>
          )}
        </div>
      ) : null}
    </Suspense>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}