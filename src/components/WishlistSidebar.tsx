"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { Product } from "@/lib/types";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const {
    cart,
    wishlist,
    // selectedCartItems,
    // selectedCartTotal,
    // toggleSelect,
    removeFromWishlist,
    // toggleSelectAll,
    addToCart,
  } = useCartStore();
  const router = useRouter();
  // const allSelected = cart.every((item) => item.selected);

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

  const CartProductCard = ({ p }: { p: Product }) => (
    <motion.div
      key={p.id}
      className="flex items-center justify-between gap-2 md:gap-3 bg-gray-50 p-2 rounded-lg shadow-sm w-full"
    >
      <div className=" relative flex items-center gap-2  w-20 h-22 rounded overflow-hidden shadow-md">
        <img
          src={p.images[0]}
          alt={p.title}
          className="w-full h-full object-cover "
        />
      </div>

      <div className=" w-full h-full space-y-2 flex  justify-between flex-col">
        <div className=" space-y-1 mt-1">
          <p
            className="text-xs  line-clamp-3"
            onClick={() => router.push(`/product/${p.id}`)}
          >
            {p.title}
          </p>
          <div className=" text-sm text-gray-500"> ₹{p.price}</div>
        </div>
        <div className=" flex items-center gap-3 w-full border-dotted border-t border-gray-200  py-1 md:py-2">
          <button
            onClick={() => {
              addToCart(p);
              removeFromWishlist(p.id);
            }}
            aria-label="Remove item"
            className=" py-0.5 md:py-1.5 px-2  rounded-full flex items-center gap-1 bg-pink-200 text-xs text-pink-500 hover:bg-gray-200"
          >
            <ShoppingCart className="size-3 md:size-4 text-pink-500" />
            <div className="">Move to</div>
            Cart
          </button>
          <button
            onClick={() => removeFromWishlist(p.id)}
            aria-label="Remove item"
            className=" py-0.5 md:py-1.5 px-2 rounded-full flex items-center gap-1 bg-red-200 text-xs text-red-500 hover:bg-gray-200"
          >
            <Trash2 className="size-3 md:size-4 text-red-500" />
            Delete
            <div className=" hidden lg:block">From Wishlist</div>
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
              <h2 className="text-lg  font-semibold text-primary">Wishlist</h2>
              <button onClick={onClose} aria-label="Close cart">
                <X className="size-5 text-black hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-1 bg-gradient-to-b from-[#900002]/20 to-white ">
              <AnimatePresence>
                {wishlist.length > 0 ? (
                  <div className="space-y-2 w-full px-1 md:px-3">
                    {wishlist.map((p) => (
                      <motion.div
                        // initial={{ x: 80, opacity: 0 }}
                        // animate={{ x: 0, opacity: 1 }}
                        // exit={{ x: 80, opacity: 0 }}
                        // transition={{ duration: 0.2, ease: "easeIn" }}
                        variants={itemVariants}
                        key={p.id}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
