import React, { useState } from 'react';
import { Mail, Lock, Store, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type UserRole = 'customer' | 'restaurant';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password, selectedRole);
    } catch (err) {
      setError('Invalid credentials. Use test@test.com / admin');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to continue</p>
          <p className="mt-2 text-sm text-gray-500">Use test@test.com / admin to login</p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedRole('customer')}
            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
              selectedRole === 'customer'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-200'
            }`}
          >
            <User className={`w-6 h-6 ${selectedRole === 'customer' ? 'text-green-500' : 'text-gray-400'}`} />
            <span className={selectedRole === 'customer' ? 'text-green-500' : 'text-gray-500'}>Customer</span>
          </button>
          <button
            onClick={() => setSelectedRole('restaurant')}
            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
              selectedRole === 'restaurant'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-200'
            }`}
          >
            <Store className={`w-6 h-6 ${selectedRole === 'restaurant' ? 'text-green-500' : 'text-gray-400'}`} />
            <span className={selectedRole === 'restaurant' ? 'text-green-500' : 'text-gray-500'}>Restaurant Owner</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="test@test.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}