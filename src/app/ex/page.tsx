"use client";

import FeaturesStrip from "@/components/FeaturesStrip";
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
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On orders above ₹999",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    subtitle: "30 days return policy",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Shield,
    title: "Genuine Quality",
    subtitle: "100% authentic products",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    subtitle: "Always here to help",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Star,
    title: "Premium Quality",
    subtitle: "Carefully curated collection",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Award,
    title: "Best Prices",
    subtitle: "Guaranteed lowest rates",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Clock,
    title: "Quick Delivery",
    subtitle: "Same day dispatch",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    subtitle: "Multiple payment options",
    color: "from-teal-500 to-teal-600",
  },
];

// Duplicate the array to create seamless loop
const loopedFeatures = [...features, ...features];

export default function FeaturesCarousel() {
  return (
    <div className="relative overflow-hidden w-full bg-gray-50 py-6">
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25, // Adjust speed
        }}
      >
        {loopedFeatures.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="min-w-[220px] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-md bg-white"
            >
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${f.color} text-white`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{f.title}</p>
                <p className="text-sm text-gray-500">{f.subtitle}</p>
              </div>
            </div>
          );
        })}
      </motion.div>
      <FeaturesStrip />
    </div>
  );
}
