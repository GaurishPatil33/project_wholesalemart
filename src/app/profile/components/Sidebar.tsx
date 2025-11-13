import UserAvatar from "@/components/UserAvatar";
import { useUserStore } from "@/lib/store/userStore";
import { User, Package, MapPin, Lock, LucideIcon } from "lucide-react";
import React from "react";

const icons: Record<string, LucideIcon> = {
  Profile: User,
  Orders: Package,
  Addresses: MapPin,
  Security: Lock,
};

interface MenuItems {
  id: string;
  icon: LucideIcon;
  label: string;
}

const Sidebar = ({
  activeTab,
  setActiveTab,
  tabs,
  setShowLogout,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: MenuItems[];
  setShowLogout: (open: boolean) => void;
}) => {
  const { user } = useUserStore();
  return (
    <div className="w-full md:w-fit flex-shrink-0 p-1 md:p-6">
      <div className="border border-gray-200 rounded-sm overflow-hidden">
        {/* User Info */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            {user ? (
              <UserAvatar />
            ) : (
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <User className="w-6 h-6 text-red-600/90" />
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-600">{user?.phone}</p>
            </div>
          </div>
        </div>

        <nav className="">
          <ul>
            {tabs.map((tab) => {
              // const Icon = icons[tab];
              const isActive = activeTab === tab.id;
              return (
                <li
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === "logout") {
                      setShowLogout(true);
                    } else {
                      setActiveTab(tab.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100 transition-colors cursor-pointer ${
                    isActive
                      ? "text-red-500 bg-red-50 border-l-4 border-l-red-400"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
