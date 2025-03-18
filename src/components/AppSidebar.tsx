
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Home,
  CreditCard,
  LineChart,
  PiggyBank,
  UserRound,
  Settings,
  HelpCircle,
  BarChartBig,
  LogOut,
  QrCode,
  Users
} from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";

export const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { signOut } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      title: "Transactions",
      icon: CreditCard,
      path: "/transactions",
    },
    {
      title: "Budget",
      icon: BarChartBig,
      path: "/budget",
    },
    {
      title: "Savings Goals",
      icon: PiggyBank,
      path: "/savings",
    },
    {
      title: "Reports",
      icon: LineChart,
      path: "/reports",
    },
    {
      title: "Shared Accounts",
      icon: Users,
      path: "/shared-accounts",
    },
    {
      title: "Payments",
      icon: QrCode,
      path: "/payments",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      path: "/help",
    },
  ];

  // Check if the current path is the specified path or starts with it (for nested routes)
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = async () => {
    await signOut();
    setLogoutDialogOpen(false);
  };

  return (
    <>
      <Sidebar>
        <div className="p-4">
          <div className="text-xl font-bold text-walletwise-purple">WalletWise</div>
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      className={isActive(item.path) ? "bg-primary/10 text-primary" : ""}
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="text-walletwise-red"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? Any unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout}>Log Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
