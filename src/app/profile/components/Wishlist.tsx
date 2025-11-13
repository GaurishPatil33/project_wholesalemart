import { useCartStore } from "@/lib/store/cartStore";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import React from "react";

const Wishlist = () => {
  const { wishlist, addToCart, removeFromWishlist } = useCartStore();
  return (
    <motion.div
      key="wishlist"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="border border-gray-200 rounded-sm">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="font-semibold text-gray-900">
            My Wishlist ({wishlist.length})
          </h2>
        </div>
        <div className="p-4 grid grid-cols-2 md:flex flex-wrap gap-4">
          {wishlist.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="border border-gray-200 rounded-sm overflow-hidden cursor-pointer hover:shadow-lg transition-shadow max-w-58"
            >
              <div className="relative">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="min-w-38 w-full h-48 object-cover"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 bg-white/40 p-2 rounded-full shadow-md"
                >
                  <Heart className="w-4 h-4 fill-red-600 text-red-600" />
                </motion.button>
                <div className="absolute top-2 left-2 bg-red-600/60 text-white text-xs px-2 py-1 rounded-full">
                  {item.discount}% OFF
                </div>
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm text-gray-900">
                  {item.brand}
                </p>
                <p className="text-xs text-gray-600 mb-2 truncate">
                  {item.title}
                </p>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900">
                    ₹{Math.round(item.price * (1 - item.discount / 100))}
                  </p>
                  <p className="text-xs text-gray-500 line-through">
                    ₹{item.price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      addToCart(item, { price: item.price, quantity: 1 });
                      removeFromWishlist(item.id);
                    }}
                    className="w-full mt-3 bg-red-500/90 text-white text-xs py-1.5 rounded-sm hover:bg-pink-700"
                  >
                    MOVE TO CART
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      removeFromWishlist(item.id);
                    }}
                    className="w-fit mt-3 text-red-500  text-xs  rounded-sm hover:bg-pink-700"
                  >
                    <Trash2 />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Wishlist;
