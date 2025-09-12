"use client";

import { motion } from "framer-motion";
import {
  Truck,
  RotateCcw,
  Shield,
  Headphones,
  Star,
  Award,
  Clock,
  CreditCard,
  Gift,
  BadgePercent,
  Tag,
  Globe,
  HeartHandshake,
  Phone,
  ShoppingBag,
  Wallet,
} from "lucide-react";

const features = [
  { icon: RotateCcw, title: "Easy Returns" },
  { icon: Star, title: "3,000+ Styles" },
  { icon: Shield, title: "Genuine Quality" },
  { icon: Truck, title: "Free Shipping" },
  { icon: Award, title: "Best Prices" },
  { icon: Headphones, title: "24/7 Support" },
  { icon: Clock, title: "Quick Delivery" },
  { icon: CreditCard, title: "Secure Payment" },
  { icon: Gift, title: "Exclusive Offers" },
  { icon: BadgePercent, title: "Seasonal Discounts" },
  { icon: Tag, title: "Trending Collections" },
  { icon: Globe, title: "Worldwide Delivery" },
  { icon: HeartHandshake, title: "Trusted by Millions" },
  { icon: Phone, title: "App Available" },
  { icon: ShoppingBag, title: "Hassle-Free Checkout" },
  { icon: Wallet, title: "Multiple Payment Options" },
];

export default function FeatureStrip() {
  return (
    <div className="relative overflow-hidden w-full border-y bg-gradient-to-r from-[#901]/40 via-[#901]/30 to-[#902]/50 p-1 md:py-3">
      {/* Track */}
      <motion.div
        className="flex gap-5"
        animate={{ x: ["0%", "-100%"] }} // move by half (since duplicated)
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 6, // adjust speed (lower = faster)
        }}
      >
        {[...features, ...features].map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="flex  items-center gap-1 md:gap-2 flex-shrink-0 min-w-[100px] justify-center "
            >
              <Icon className="size-4 md:size-5 text-[#900001]" />
              <span className="text-xs md:text-sm font-medium text-gray-700">
                {f.title}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
