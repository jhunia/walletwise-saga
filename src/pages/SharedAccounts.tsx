
import { DashboardLayout } from "@/components/DashboardLayout";

const SharedAccounts = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Shared Accounts</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 mb-4">Manage accounts that you share with family, friends, or colleagues.</p>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Family Budget</h3>
              <p className="text-gray-500">Shared with: Anna, Michael</p>
              <div className="mt-2 flex gap-2">
                <button className="text-sm text-blue-500 hover:underline">View</button>
                <button className="text-sm text-blue-500 hover:underline">Edit</button>
                <button className="text-sm text-blue-500 hover:underline">Manage Members</button>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Vacation Fund</h3>
              <p className="text-gray-500">Shared with: Sarah</p>
              <div className="mt-2 flex gap-2">
                <button className="text-sm text-blue-500 hover:underline">View</button>
                <button className="text-sm text-blue-500 hover:underline">Edit</button>
                <button className="text-sm text-blue-500 hover:underline">Manage Members</button>
              </div>
            </div>
          </div>
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Create New Shared Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SharedAccounts;
