"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { CartItem } from "@/lib/types";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { HeartPlus, Minus, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const {
    cart,
    removeFromCart,
    selectedCartItems,
    selectedCartTotal,
    toggleSelect,
    updateQuantity,
    removeSelected,
    addToWishlist,
    toggleSelectAll,
    moveSelectedToWishlist,
  } = useCartStore();
  const router = useRouter();
  const allSelected = cart.every((item) => item.selected);

  const sidebarVariants: Variants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3 },
    },
  };
  const itemVariants: Variants = {
    hidden: { x: 80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { x: 80, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const CartProductCard = ({ p }: { p: CartItem }) => (
    <motion.div
      key={p.product.id}
      className="flex items-center justify-between gap-2 md:gap-3 bg-gray-50 p-2 rounded-lg shadow-sm w-full"
    >
      <div className=" relative flex items-center gap-2  w-20 h-22 rounded overflow-hidden shadow-md">
        <input
          type="checkbox"
          checked={p.selected}
          onChange={() => toggleSelect(p.product.id)}
          name=""
          id=""
          className="absolute top-1 left-1 size-3 md:size-4 text-blue-600 rounded border-gray-300 focus:ring-blue-700"
        />
        <img
          src={p.product.images[0]}
          alt={p.product.title}
          className="w-full h-full object-cover "
        />
      </div>

      <div className=" w-full h-full space-y-2">
        <div className=" space-y-1">
          <p
            className="text-xs  line-clamp-3"
            onClick={() => router.push(`/product/${p.product.id}`)}
          >
            {p.product.title}
          </p>
          <div className=" flex items-center gap-4 ">
            <div className=" flex items-center border rounded-md">
              <button
                disabled={p.quantity <= 1}
                className="px-1 hover:bg-gray-100 rounded-l-md"
                onClick={() => updateQuantity(p.product.id, p.quantity - 1)}
              >
                <Minus className="size-2 md:size-3" />
              </button>
              <div className=" md:px-2 py-0.5 px-1 md:py-1 border-x text-[9px] ">
                {p.quantity}
              </div>
              <button
                disabled={p.quantity >= 10}
                className="px-1 hover:bg-gray-100 rounded-r-md"
                onClick={() => updateQuantity(p.product.id, p.quantity + 1)}
              >
                <Plus className="size-2 md:size-3" />
              </button>
            </div>
            <div className=" text-sm text-gray-500">
              {" "}
              ₹{p.price * p.quantity}
            </div>
          </div>
        </div>
        <div className=" flex items-center gap-3 w-full border-dotted border-t border-gray-200  py-1 md:py-2">
          <button
            onClick={() => {
              addToWishlist(p.product);
              removeFromCart(p.product.id);
            }}
            aria-label="Remove item"
            className=" py-0.5 md:py-1.5 px-2  rounded-full flex items-center gap-1 bg-pink-200 text-xs text-pink-500 hover:bg-gray-200"
          >
            <HeartPlus className="size-3 md:size-4 text-pink-500" />
            <div className=" hidden lg:block">Move to</div>
            Wishlist
          </button>
          <button
            onClick={() => removeFromCart(p.product.id)}
            aria-label="Remove item"
            className=" py-0.5 md:py-1.5 px-2 rounded-full flex items-center gap-1 bg-red-200 text-xs text-red-500 hover:bg-gray-200"
          >
            <Trash2 className="size-3 md:size-4 text-red-500" />
            Delete
            <div className=" hidden lg:block">From Cart</div>
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            role="dialog"
            aria-modal="true"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-72 sm:w-96 bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="w-full bg-gray-50 text-white py-2 font-semibold text-sm flex border-b border-gray-500 items-center justify-between px-4">
              <h2 className="text-lg  font-semibold text-primary">
                Shopping Cart
              </h2>
              <button onClick={onClose} aria-label="Close cart">
                <X className="size-5 text-black hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-1 bg-gradient-to-b from-[#900002]/20 to-white scrollbar-hide">
              <AnimatePresence>
                {cart.length > 0 ? (
                  <div className="space-y-2 w-full px-1 md:px-3">
                    {cart.map((p) => (
                      <motion.div
                        // initial={{ x: 80, opacity: 0 }}
                        // animate={{ x: 0, opacity: 1 }}
                        // exit={{ x: 80, opacity: 0 }}
                        // transition={{ duration: 0.2, ease: "easeIn" }}
                        variants={itemVariants}
                        key={p.product.id}
                      >
                        <CartProductCard p={p} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-500 text-sm text-center mt-10"
                  >
                    Your cart is empty
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className=" w-full">
              {/* selection delete addtowishlist */}
              <div className=" px-3 py-2 border-b  w-full">
                <div className=" flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                      className="h-4 w-4  text-blue-600 rounded border-gray-300 focus:ring-blue-700"
                    />
                    <div className="text-xs md:text-sm  text-gray-900">
                      Select All ({selectedCartItems().length} / {cart.length} )
                    </div>
                  </div>

                  {selectedCartItems().length > 0 && (
                    <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
                      <button
                        className="flex items-center gap-1  text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        onClick={removeSelected}
                      >
                        <Trash2 className="size-3 md:size-4" />
                        <p className="hidden md:block">Remove</p>(
                        {selectedCartItems().length})
                      </button>
                      <button
                        onClick={moveSelectedToWishlist}
                        className="flex items-center gap-1  text-pink-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <HeartPlus className="size-3 md:size-4" />
                        <p className="hidden md:block">Move to Wishlist</p>(
                        {selectedCartItems().length})
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-2  space-y-2 bg-gray-50">
                <div className="flex justify-between font-medium text-sm">
                  <span>Total:</span>
                  <span>₹{selectedCartTotal()}</span>
                </div>
                <button
                  onClick={() => router.push(`/checkout`)}
                  disabled={selectedCartItems().length === 0}
                  className="w-full bg-gradient-to-r from-[#900001]/90 to-[#900000]/60 text-white py-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
