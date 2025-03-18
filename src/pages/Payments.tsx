
import { DashboardLayout } from "@/components/DashboardLayout";
import { CreditCard, RotateCw, PiggyBank } from "lucide-react";

const Payments = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Payments</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 mb-4">Manage your payment methods and make transactions.</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <CreditCard className="h-10 w-10 text-blue-500 mb-2" />
              <h3 className="font-medium text-lg mb-1">Payment Methods</h3>
              <p className="text-gray-500 text-sm">Add or manage your payment methods</p>
              <button className="mt-4 text-blue-500 hover:underline text-sm">Manage</button>
            </div>
            
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <RotateCw className="h-10 w-10 text-blue-500 mb-2" />
              <h3 className="font-medium text-lg mb-1">Recurring Payments</h3>
              <p className="text-gray-500 text-sm">Set up automatic payments</p>
              <button className="mt-4 text-blue-500 hover:underline text-sm">Configure</button>
            </div>
            
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <PiggyBank className="h-10 w-10 text-blue-500 mb-2" />
              <h3 className="font-medium text-lg mb-1">Transfer Funds</h3>
              <p className="text-gray-500 text-sm">Move money between accounts</p>
              <button className="mt-4 text-blue-500 hover:underline text-sm">Transfer</button>
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="space-y-2">
            <div className="border rounded p-3 flex justify-between">
              <div>
                <p className="font-medium">Netflix Subscription</p>
                <p className="text-gray-500 text-sm">May 12, 2023</p>
              </div>
              <p className="font-medium text-red-500">-$14.99</p>
            </div>
            <div className="border rounded p-3 flex justify-between">
              <div>
                <p className="font-medium">Grocery Store</p>
                <p className="text-gray-500 text-sm">May 10, 2023</p>
              </div>
              <p className="font-medium text-red-500">-$65.32</p>
            </div>
            <div className="border rounded p-3 flex justify-between">
              <div>
                <p className="font-medium">Salary Deposit</p>
                <p className="text-gray-500 text-sm">May 1, 2023</p>
              </div>
              <p className="font-medium text-green-500">+$2,450.00</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payments;
