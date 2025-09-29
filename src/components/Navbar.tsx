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
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import { FaWhatsapp } from "react-icons/fa";
import { Categories } from "@/lib/data";
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar";
import SearchBar from "./Search";

const Navbar = () => {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { cart, wishlist } = useCartStore();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const isCheckout = pathname === "/checkout";

  // const theme=useTheme()

  // useEffect(() => {
  //   setMobileSearchOpen(false);
  // }, [pathname]);

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
        staggerChildren: 0.1,
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
    <div className={`${isCheckout ? " hidden md:block" : " block"}`}>
      {/* HEADER */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-200 shadow-lg bg-white"
      >
        <div className="max-w-screen mx-auto px-2 md:px-8 my-1 md:py-2 flex items-center justify-between w-full gap-2">
          {/* Mobile menu button + Logo */}
          <div className="md:hidden flex w-fit items-center justify-between  gap-2">
            <motion.button
              onClick={() => setMobileMenu(true)}
              whileTap={{ scale: 0.95 }}
              className=" p-2 hover:bg-gray-50 border border-gray-200 rounded-lg"
              aria-label="Open mobile menu"
            >
              <Menu className="size-4 " />
            </motion.button>
          </div>
          <div className="flex  items-center justify-between  gap-1 md:gap-3">
            <Link
              href="/"
              aria-label="Go to homepage"
              className="flex items-center justify-between w-fit gap-1.5 md:gap-3"
            >
              <motion.div
                className="cursor-pointer max-w-14 max-h-14 flex items-center gap-1 md:gap-2"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="logos/chabi.png"
                  alt="Logo"
                  // width={48}
                  // height={48}
                  className=" w-8 h-8 rounded-full object-contain "
                  // priority
                />
              </motion.div>
              <span className=" md:hidden lg:block  text-md md:text-2xl text-primary font-semibold">
                CHHABI
              </span>
            </Link>
          </div>

          {/* Desktop Categories */}
          <nav className="hidden md:flex items-center gap-4">
            {["Home", "Categories", "Shop by speciality"].map((item, i) => (
              <motion.button
                key={i}
                className="relative font-semibold text-gray-500 hover:text-red-700 transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-700 hover:after:w-full after:transition-all"
                whileHover={{ y: -1 }}
                onClick={() =>
                  router.push(
                    `${item === "Home" ? "/" : `/listingPage?cat=${item}`}`
                  )
                }
              >
                {item}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center justify-between gap-1 w-fit md:gap-4">
            {/* Search */}
            <div className="hidden md:block w-full   right-0">
              <Search />
            </div>
            <div className=" md:hidden text-primary ">
              <motion.button
                onClick={() => setMobileSearchOpen(true)}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-50  rounded-lg"
                aria-label="Open search"
              >
                <SearchIcon className="size-6" />
              </motion.button>
            </div>
            {/* Cart & Wishlist */}
            <div className="flex items-center gap-1 md:gap-2">
              <motion.button
                onClick={() => router.push("/profile")}
                aria-label="Profile"
                className="hidden md:block  rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-red-700 bg-red-50 rounded-full p-1 md:p-2">
                  <User2 className="size-5" />
                </div>
              </motion.button>

              <motion.button
                // onClick={() => router.push("/wishlist")}
                onClick={() => setWishlistOpen(true)}
                aria-label="Wishlist"
                className="relative p-1 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="size-5 text-gray-700" />
                {wishlist.length > 0 && (
                  <motion.span
                    key={wishlist.length} // key forces re-animation on change
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="absolute -top-1 -right-1 bg-red-700 text-white text-[9px] md:text-[10px] rounded-full size-4 flex items-center justify-center"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className="relative p-1 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBagIcon className="size-5 text-gray-700" />
                {cart.length > 0 && (
                  <motion.span
                    key={cart.length} // key forces re-animation on change
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="absolute -top-1 -right-1 bg-red-700 text-white text-[9px] md:text-[10px] rounded-full size-4 flex items-center justify-center"
                  >
                    {cart.length}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE SEARCH OVERLAY */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <>
            {/* Overlay background */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSearchOpen(false)}
            />

            {/* Full-screen search panel */}
            <motion.div
              className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-white flex flex-col p-4"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <SearchBar onSearch={() => setMobileSearchOpen(false)} />
                <button
                  onClick={() => setMobileSearchOpen(false)}
                  className="p-1 px-2 text-xs  text-[#900001] rounded-full hover:bg-gray-100 flex items-center gap-0.5 ring-1 ring-[#900001] bg-[#900001]/50"
                >
                  CLOSE
                  <X className=" size-4 " />
                </button>
              </div>

              {/* Optional: Recent searches or categories */}
              <div className="flex flex-col gap-3 mt-4">
                <h3 className="text-sm font-semibold text-gray-600">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Sarees", "Kurtas", "Dresses", "Dupattas"].map(
                    (item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          router.push(
                            `/listingPage?search=${encodeURIComponent(item)}`
                          );
                          setMobileSearchOpen(false);
                        }}
                        className="px-3 py-1 text-xs bg-gray-100 rounded-full hover:bg-red-100 transition"
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
              role="dialog"
              aria-modal="true"
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
                    <Image
                      src="/logos/chabi.png"
                      alt="Logo"
                      width={28}
                      height={28}
                      loading="lazy"
                      className=" rounded-full object-cover"
                    />
                    <h1 className="text-xl font-bold text-red-700">CHHABI</h1>
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
                      onClick={() => {
                        setActiveCategory(
                          activeCategory === cat.slug ? "" : cat.slug
                        );
                        router.push(`/listingPage?cat=${cat.slug}`);
                      }}
                      aria-expanded={activeCategory === cat.slug}
                    >
                      <span className="font-medium">{cat.title}</span>
                      <ChevronRight
                        className={`w-5 h-5 transition-transform ${
                          activeCategory === cat.slug ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Login */}
              <div className="px-2">
                <motion.button
                  variants={itemVariants}
                  className="w-full mt-3 flex justify-center items-center gap-2 py-2 font-bold text-sm rounded-full bg-red-700 text-white"
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

      {/* CART SIDEBAR */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistSidebar
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
    </div>
  );
};

export default Navbar;
