import React from 'react';
import { Home, Search, User } from 'lucide-react';

interface BottomNavProps {
  onAccountClick?: () => void;
  onSearchClick?: () => void;
  currentPage?: 'home' | 'search' | 'account';
}

export default function BottomNav({ onAccountClick, onSearchClick, currentPage = 'home' }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 z-10">
      <NavItem icon={Home} label="Home" active={currentPage === 'home'} />
      <NavItem 
        icon={Search} 
        label="Search" 
        active={currentPage === 'search'} 
        onClick={onSearchClick}
      />
      <NavItem 
        icon={User} 
        label="Account" 
        active={currentPage === 'account'}
        onClick={onAccountClick}
      />
    </nav>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <button 
      className="flex flex-col items-center w-20 transition-colors"
      onClick={onClick}
    >
      <Icon className={`w-6 h-6 ${active ? 'text-green-600' : 'text-gray-500'}`} />
      <span className={`text-xs mt-1 ${active ? 'text-green-600' : 'text-gray-500'}`}>
        {label}
      </span>
    </button>
  );
}