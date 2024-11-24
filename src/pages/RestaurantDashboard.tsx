import React, { useState, useRef } from 'react';
import { Plus, Package, DollarSign, Users, TrendingUp, Settings, X, Upload, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function RestaurantDashboard() {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Butter Chicken',
      price: 299,
      description: 'Creamy curry with tender chicken pieces',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80',
      category: 'Main Course'
    }
  ]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (showEditItem && selectedItem) {
          setSelectedItem({ ...selectedItem, image: base64String });
        } else {
          setNewItem(prev => ({ ...prev, image: base64String }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.price && newItem.image) {
      setMenuItems(prev => [...prev, { ...newItem, id: Date.now().toString() } as MenuItem]);
      setNewItem({ name: '', price: 0, description: '', image: '', category: '' });
      setShowAddItem(false);
    }
  };

  const handleEditClick = (item: MenuItem) => {
    setSelectedItem(item);
    setShowEditItem(true);
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      setMenuItems(prev =>
        prev.map(item =>
          item.id === selectedItem.id ? selectedItem : item
        )
      );
      setShowEditItem(false);
      setSelectedItem(null);
    }
  };

  const ItemForm = ({ 
    isEdit = false, 
    item = newItem, 
    onSubmit, 
    onCancel 
  }: { 
    isEdit?: boolean;
    item: Partial<MenuItem>;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
  }) => (
    <div className="p-6 border-b border-gray-200">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={item.name}
            onChange={e => isEdit && selectedItem 
              ? setSelectedItem({ ...selectedItem, name: e.target.value })
              : setNewItem(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
          <input
            type="number"
            value={item.price}
            onChange={e => isEdit && selectedItem
              ? setSelectedItem({ ...selectedItem, price: Number(e.target.value) })
              : setNewItem(prev => ({ ...prev, price: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={item.description}
            onChange={e => isEdit && selectedItem
              ? setSelectedItem({ ...selectedItem, description: e.target.value })
              : setNewItem(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <div className="mt-1 flex items-center gap-4">
            {item.image && (
              <img 
                src={item.image} 
                alt="Preview" 
                className="w-20 h-20 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Upload className="w-5 h-5" />
                {item.image ? 'Change Image' : 'Upload Image'}
              </button>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={item.category}
            onChange={e => isEdit && selectedItem
              ? setSelectedItem({ ...selectedItem, category: e.target.value })
              : setNewItem(prev => ({ ...prev, category: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {isEdit ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={Package} title="Total Orders" value="156" />
          <StatCard icon={DollarSign} title="Revenue" value="₹15,690" />
          <StatCard icon={Users} title="Customers" value="1,203" />
          <StatCard icon={TrendingUp} title="Growth" value="+12.5%" />
        </div>
      </div>

      {/* Menu Management */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Menu Items</h2>
              <button
                onClick={() => setShowAddItem(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            </div>
          </div>

          {/* Add/Edit Item Forms */}
          {showAddItem && (
            <ItemForm
              item={newItem}
              onSubmit={handleAddItem}
              onCancel={() => setShowAddItem(false)}
            />
          )}

          {showEditItem && selectedItem && (
            <ItemForm
              isEdit
              item={selectedItem}
              onSubmit={handleUpdateItem}
              onCancel={() => {
                setShowEditItem(false);
                setSelectedItem(null);
              }}
            />
          )}

          {/* Menu Items List */}
          <div className="divide-y divide-gray-200">
            {menuItems.map(item => (
              <div key={item.id} className="p-6 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-green-600">₹{item.price}</p>
                </div>
                <button 
                  onClick={() => handleEditClick(item)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value }: { icon: React.ElementType; title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className="p-2 bg-green-50 rounded-lg">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}