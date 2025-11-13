"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { useUserStore } from "@/lib/store/userStore";
import ProfileInfo from "./components/ProfileInfo";
import AddressSection from "./components/AddressSection";
import OrdersSection from "./components/OrdersSection";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Gift,
  Star,
  HelpCircle,
  LogOutIcon,
} from "lucide-react";
import Coupons from "./components/Coupons";
import Wishlist from "./components/Wishlist";
import { profile } from "console";
import Link from "next/link";
import Payments from "./components/Payments";
import Help_Support from "./components/Help&Support";

const tabs = ["Profile", "Orders", "Addresses", "Security"];
const menuItems = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "orders", icon: Package, label: "Orders" },
  { id: "wishlist", icon: Heart, label: "Wishlist" },
  { id: "addresses", icon: MapPin, label: "Addresses" },
  // { id: "payments", icon: CreditCard, label: "Payments" },
  { id: "coupons", icon: Gift, label: "Coupons" },
  // { id: "insider", icon: Star, label: "Myntra Insider" },
  { id: "support", icon: HelpCircle, label: "Help & Support" },
  { id: "logout", icon: LogOutIcon, label: "Logout" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, logout } = useUserStore();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center flex-col min-h-screen">
        <p className="text-gray-600 text-lg py-3">
          Please log in to access your profile.
        </p>
        <button className=" items-center bg-red-100 ring-1 ring-red-400 py-2 px-4 rounded-full text-red-700">
          Login
        </button>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileInfo />;
      case "orders":
        return <OrdersSection />;
      case "addresses":
        return <AddressSection />;
      case "payments":
        return <Payments />;
      case "coupons":
        return <Coupons />;
      case "wishlist":
        return <Wishlist />;
      case "support":
        return <Help_Support/>;

      default:
        return;
      // return <ProfileInfo />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col md:flex-row" >
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={menuItems}
        setShowLogout={setShowLogoutModal}
      />

      {/* Main Content */}
      <motion.div
        className=" py-6 w-full px-1"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {showLogoutModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl px-4 py-2 "
          >
            <div className=" font-semibold text-lg py-3">
              Do You Want to Logout?
            </div>
            <div className=" flex items-center justify-between gap-2">
              <button
                className="bg-red-200 rounded-full p-2 px-4 font-semibold text-gray-700 ring-red-400 ring-1 w-full"
                onClick={logout}
              >
                Yes
              </button>
              <button
                className="bg-red-400 rounded-full p-2 px-4 font-semibold text-gray-700 ring-red-700 ring-1 w-full"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
