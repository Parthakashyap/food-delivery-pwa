import React from 'react';
import { ArrowLeft, Bell, Globe, Moon, Shield } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

const settings = [
  {
    id: 'notifications',
    icon: Bell,
    title: 'Push Notifications',
    description: 'Get notified about order updates',
    type: 'toggle',
    value: true
  },
  {
    id: 'language',
    icon: Globe,
    title: 'Language',
    description: 'English (US)',
    type: 'select'
  },
  {
    id: 'darkMode',
    icon: Moon,
    title: 'Dark Mode',
    description: 'Toggle dark theme',
    type: 'toggle',
    value: false
  },
  {
    id: 'privacy',
    icon: Shield,
    title: 'Privacy Settings',
    description: 'Manage your data and privacy',
    type: 'link'
  }
];

export default function SettingsPage({ onBack }: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center p-4 bg-white border-b">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold">Settings</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg">
          {settings.map((setting, index) => (
            <div 
              key={setting.id}
              className={`flex items-center justify-between p-4 ${
                index !== settings.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <setting.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">{setting.title}</h3>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
              </div>
              {setting.type === 'toggle' && (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={setting.value}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}