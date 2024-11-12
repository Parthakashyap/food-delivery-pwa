import React, { useState, Suspense, lazy } from 'react';
import SearchBar from './components/SearchBar';
import CategoryList from './components/CategoryList';
import RestaurantCard from './components/RestaurantCard';
import PromotionCard from './components/PromotionCard';
import BottomNav from './components/BottomNav';
import LoadingSpinner from './components/LoadingSpinner';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';

// Lazy load pages
const RestaurantDetails = lazy(() => import('./pages/RestaurantDetails'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));

export default function App() {
  const { isAuthenticated } = useAuth();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'search' | 'account'>('home');

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
  };

  const handleAccountClick = () => {
    setShowAccount(true);
    setCurrentPage('account');
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <CartProvider>
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
        
        {selectedRestaurant && !showCart && !showCheckout && !showAccount ? (
          <RestaurantDetails 
            onBack={handleBack} 
            onCartClick={() => setShowCart(true)} 
          />
        ) : !showAccount && !showCart && !showCheckout ? (
          <div className="min-h-screen bg-white pb-20">
            <div className="max-w-md mx-auto px-4 py-6">
              <SearchBar />
              <CategoryList />
              
              <div 
                onClick={() => setSelectedRestaurant('kfc')}
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
              
              <div className="cursor-pointer transition-transform hover:scale-[1.02]">
                <RestaurantCard
                  name="Italian Taste"
                  image="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80"
                  deliveryFee={399}
                  timeRange="30 - 45min"
                  rating={4.8}
                />
              </div>
              
              <PromotionCard
                title="Order best fried chicken wings"
                orderCount={344}
                image="https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80"
              />
            </div>
            <BottomNav 
              onAccountClick={handleAccountClick}
              currentPage={currentPage}
            />
          </div>
        ) : null}
      </Suspense>
    </CartProvider>
  );
}