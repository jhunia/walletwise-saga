
import { DashboardLayout } from "@/components/DashboardLayout";
import { User, Bell, Shield, CreditCard, RotateCw } from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <nav className="flex overflow-x-auto">
              <button className="px-4 py-3 font-medium text-sm border-b-2 border-blue-500 text-blue-500">
                Account
              </button>
              <button className="px-4 py-3 font-medium text-sm text-gray-500 hover:text-gray-900">
                Notifications
              </button>
              <button className="px-4 py-3 font-medium text-sm text-gray-500 hover:text-gray-900">
                Security
              </button>
              <button className="px-4 py-3 font-medium text-sm text-gray-500 hover:text-gray-900">
                Billing
              </button>
              <button className="px-4 py-3 font-medium text-sm text-gray-500 hover:text-gray-900">
                Integration
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" /> Account Settings
            </h2>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    defaultValue="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    defaultValue="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  defaultValue="john.doe@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded"
                  defaultValue="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select className="w-full p-2 border rounded">
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                  <option>GBP - British Pound</option>
                  <option>JPY - Japanese Yen</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select className="w-full p-2 border rounded">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
