import { useCartStore } from "@/lib/store/cartStore";
import { motion } from "framer-motion";
import { Minus, Plus, HeartPlus, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

const CheckoutProductList = () => {
  const { selectedCartItems, updateQuantity, addToWishlist, removeFromCart } =
    useCartStore();
  return (
    <div className=" space-y-3 py-3 ">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 ">
        <ShoppingCart className="size-6" /> Items in your cart
      </h2>
      <div className=" space-y-2 max-h-100 overflow-y-auto overflow-x-hidden">
        {selectedCartItems().map((p) => (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{duration:0.3,ease:"easeIn"}}
            key={p.product.id}
            className="flex items-center px-2  gap-2 md:gap-3 w-full"
          >
            <div className=" relative flex items-center gap-2 w-20  rounded overflow-hidden shadow-md">
              <img
                src={p.product.images[0]}
                alt={p.product.title}
                className="w-full h-full object-cover "
              />
            </div>

            <div className=" w-full h-full space-y-2 ">
              <div className=" space-y-1">
                <p
                  className="text-sm  line-clamp-2  "
                  // onClick={() => router.push(`/product/${p.product.id}`)}
                >
                  {p.product.title}
                </p>
                <div className=" flex items-center gap-3 md:gap-5 ">
                  <div className=" flex items-center border rounded-md">
                    <button
                      disabled={p.quantity <= 1}
                      className="px-1 hover:bg-gray-100 rounded-l-md"
                      onClick={() =>
                        updateQuantity(p.product.id, p.quantity - 1)
                      }
                    >
                      <Minus className="size-2 md:size-3" />
                    </button>
                    <div className=" md:px-2 py-0.5 px-1 md:py-1 border-x text-[9px] ">
                      {p.quantity}
                    </div>
                    <button
                      disabled={p.quantity >= 10}
                      className="px-1 hover:bg-gray-100 rounded-r-md"
                      onClick={() =>
                        updateQuantity(p.product.id, p.quantity + 1)
                      }
                    >
                      <Plus className="size-2 md:size-3" />
                    </button>
                  </div>
                  <div className=" text-xs md:text-sm text-gray-500">
                    {" "}
                    ₹{p.price * p.quantity}
                  </div>
                </div>
              </div>
              <div className=" flex items-center gap-3  w-full border-dotted border-t border-gray-200  py-1 md:py-2">
                <button
                  onClick={() => {
                    addToWishlist(p.product);
                    removeFromCart(p.product.id);
                  }}
                  aria-label="Remove item"
                  className=" py-0.5 md:py-1.5 px-2  rounded-full flex items-center gap-1 bg-pink-200 text-xs text-pink-500 hover:bg-gray-200"
                >
                  <HeartPlus className="size-3 md:size-4 text-pink-500" />
                  Save for Later
                </button>
                <button
                  onClick={() => removeFromCart(p.product.id)}
                  aria-label="Remove item"
                  className=" py-0.5 md:py-1.5 px-2 rounded-full flex items-center gap-1 bg-red-200 text-xs text-red-500 hover:bg-gray-200"
                >
                  <Trash2 className="size-3 md:size-4 text-red-500" />
                  Remove
                  <div className=" hidden md:block">From Cart</div>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProductList;
