"use client";

import { useUserStore } from "@/lib/store/userStore";
import { motion } from "framer-motion";
import { User } from "lucide-react";

interface UserButtonProps {
  onClick?: () => void;
  size?: number; // size in px (width & height)
}

export default function UserButton({ onClick, size = 48 }: UserButtonProps) {
  const { user } = useUserStore();

  const hasAvatar = !!user?.avatar?.trim();

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
      aria-label={user?.isLoggedIn ? "Go to profile" : "Login"}
      style={{ width: size, height: size }}
    >
      <div
        className="rounded-full p-2 bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center overflow-hidden text-white font-semibold"
        style={{ width: "100%", height: "100%" }}
      >
        {hasAvatar ? (
          <img
            src={user!.avatar!}
            alt={user?.name || "User"}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        ) : user?.name ? (
          <span className="text-lg">{user.name.charAt(0).toUpperCase()}</span>
        ) : (
          <User className="w-full h-full text-white opacity-90" />
        )}
      </div>
    </motion.button>
  );
}
