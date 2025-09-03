"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  ChevronRight,
  Heart,
  LogInIcon,
  ShoppingBagIcon,
  User2,
  X,
  Menu,
  Mail,
  PhoneCallIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Search from "./Search";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import { FaWhatsapp } from "react-icons/fa";
import { Categories } from "@/lib/data";

const Navbar = () => {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const { cart, wishlist } = useCartStore();

  // Motion variants
  const headerVariants: Variants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };
  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      x: "-100%",
      transition: { duration: 0.3 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* HEADER */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-200 shadow-lg bg-white"
      >
        <div className="max-w-screen mx-auto px-2 md:px-4 py-1 md:py-2 flex items-center justify-between gap-2">
          {/* Mobile menu button + Logo */}
          <div className="flex w-fit items-center gap-2 ">
            <motion.button
              onClick={() => setMobileMenu(true)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 hover:bg-gray-50 border border-gray-200 rounded-lg"
              aria-label="Open mobile menu"
            >
              <Menu className="size-4 " />
            </motion.button>

            <Link href="/" aria-label="Go to homepage" className="flex items-center gap-3">
              <motion.div
                className="cursor-pointer max-w-14 max-h-14 flex items-center gap-2"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/logo1.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  // className=" w-10 h-10"
                  priority
                />
              </motion.div>
              <span className=" hidden lg:block text-2xl text-primary font-semibold">
                CHHABI
              </span>
            </Link>
          </div>

          {/* Desktop Categories */}
          <nav className="hidden md:flex items-center gap-4">
            {["Home", "Categories", "Shop by speciality"].map((item, i) => (
              <motion.button
                key={i}
                className="font-semibold text-gray-500 hover:text-red-700 transition-colors border-b-red-700 hover:border-b"
                whileHover={{ y: -1 }}
              >
                {item}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center justify-between gap-2 w-full md:w-fit  md:gap-4">
            {/* Search */}
            <div className="w-full  lg:min-w-80 ">
              <Search />
            </div>
            {/* Cart & Wishlist */}
            <div className="flex items-center md:gap-2">
              <motion.button
                onClick={() => router.push("/profile")}
                aria-label="Profile"
                className="hidden md:block p-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-red-700 bg-red-50 rounded-full p-2">
                  <User2 className="size-6" />
                </div>
              </motion.button>

              <motion.button
                onClick={() => router.push("/wishlist")}
                aria-label="Wishlist"
                className="relative p-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="size-6 text-gray-700" />
                {wishlist.length > 0 && (
                  <motion.span
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-0 bg-red-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                onClick={() => router.push("/cart")}
                aria-label="Cart"
                className="relative p-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBagIcon className="size-6 text-gray-700" />
                {cart.length > 0 && (
                  <motion.span
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-0 bg-red-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    {cart.length}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
            />

            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 h-full w-64 bg-white z-50 overflow-y-auto"
            >
              {/* HEADER inside mobile menu */}
              <div className="flex items-center justify-between border-b border-gray-300 px-3 py-2 mb-2">
                <Link href="/" aria-label="Go to homepage">
                  <div className="flex items-center gap-2">
                    <Image src="/logo1.png" alt="Logo" width={28} height={28} />
                    <h1 className="text-xl font-bold text-red-700">Name</h1>
                  </div>
                </Link>
                <motion.button
                  onClick={() => setMobileMenu(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close mobile menu"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Categories */}
              <div className=" space-y-2 pr-2">
                {Categories.map((cat, index) => (
                  <motion.div
                    key={cat.slug}
                    variants={itemVariants}
                    custom={index}
                  >
                    <button
                      className={`w-full flex items-center justify-between px-3  py-2 text-left rounded-r-full transition-colors ${
                        activeCategory === cat.slug
                          ? "bg-gradient-to-r from-red-100 to-red-400 text-red-700"
                          : "hover:bg-gray-50 text-gray-800"
                      }`}
                      onClick={() =>
                        setActiveCategory(
                          activeCategory === cat.slug ? "" : cat.slug
                        )
                      }
                      aria-expanded={activeCategory === cat.slug}
                    >
                      <span className="font-medium">{cat.title}</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Login */}
              <div className="px-2">
                <motion.button
                  variants={itemVariants}
                  className="w-full mt-3  flex justify-center items-center gap-2 py-2 font-bold text-sm rounded-full bg-red-700 text-white"
                >
                  LOG IN
                  <LogInIcon className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Help Section */}
              <motion.div
                variants={itemVariants}
                className="mt-4 bg-red-50 p-3 rounded space-y-2"
              >
                <h2 className="text-lg font-medium text-gray-800">
                  Need Help?
                </h2>
                <p className="text-xs text-gray-500 text-center">
                  Can’t find the answers you are looking for? Contact us below:
                </p>
                <motion.button
                  variants={itemVariants}
                  className="w-full flex justify-center items-center gap-2 py-2 rounded-full bg-red-700 text-white text-sm"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Chat with us
                </motion.button>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <PhoneCallIcon className="w-4 h-4 text-red-700" />
                    <div>
                      <div className="text-xs font-bold">Contact Us</div>
                      <a
                        href="tel:8888888888"
                        className="text-red-700 text-sm underline"
                      >
                        88-8888-8888
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-red-700" />
                    <div>
                      <div className="text-xs font-bold">Email Us</div>
                      <a
                        href="mailto:abc@gmail.com"
                        className="text-red-700 text-sm underline"
                      >
                        abc@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
