"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown } from 'lucide-react';

const EcommerceNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(2);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop', hasDropdown: true },
    { name: 'Categories', href: '/categories', hasDropdown: true },
    { name: 'Deals', href: '/deals' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="bg-[#42000c] text-[#fff9c9] shadow-lg relative z-50">
      {/* Top Bar */}
      <div className="border-b border-[#fff9c9]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
            <div className="hidden md:block">
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex space-x-4">
              <span className="cursor-pointer hover:text-white transition-colors">Help</span>
              <span className="cursor-pointer hover:text-white transition-colors">Track Order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="text-2xl font-bold text-[#fff9c9] cursor-pointer">
              ShopLux
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  className="flex items-center space-x-1 hover:text-white transition-colors duration-200 font-medium"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </a>
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white text-[#42000c] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 hover:bg-[#fff9c9] transition-colors">Subcategory 1</a>
                      <a href="#" className="block px-4 py-2 hover:bg-[#fff9c9] transition-colors">Subcategory 2</a>
                      <a href="#" className="block px-4 py-2 hover:bg-[#fff9c9] transition-colors">Subcategory 3</a>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              onClick={toggleSearch}
              className="p-2 hover:bg-[#fff9c9]/20 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Wishlist */}
            <motion.button
              className="p-2 hover:bg-[#fff9c9]/20 rounded-full transition-colors relative hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-[#fff9c9] text-[#42000c] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {wishlistCount}
                </motion.span>
              )}
            </motion.button>

            {/* Cart */}
            <motion.button
              className="p-2 hover:bg-[#fff9c9]/20 rounded-full transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-[#fff9c9] text-[#42000c] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* User Account */}
            <motion.button
              className="p-2 hover:bg-[#fff9c9]/20 rounded-full transition-colors hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <User className="w-5 h-5" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 hover:bg-[#fff9c9]/20 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[#fff9c9]/20 bg-[#42000c]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-[#fff9c9] text-[#42000c] rounded-full px-6 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-[#fff9c9]/50"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#42000c] w-5 h-5" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#42000c] shadow-xl md:hidden z-50"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center p-6 border-b border-[#fff9c9]/20">
                <h2 className="text-xl font-semibold text-[#fff9c9]">Menu</h2>
                <motion.button
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-[#fff9c9]/20 rounded-full"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-[#fff9c9]" />
                </motion.button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="block py-3 text-lg text-[#fff9c9] hover:text-white transition-colors border-b border-[#fff9c9]/10 last:border-b-0"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ x: 10 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Menu Footer */}
                <div className="px-6 py-4 border-t border-[#fff9c9]/20">
                  <div className="flex items-center justify-around">
                    <motion.button
                      className="flex flex-col items-center space-y-1 text-[#fff9c9]"
                      whileTap={{ scale: 0.9 }}
                    >
                      <User className="w-6 h-6" />
                      <span className="text-sm">Account</span>
                    </motion.button>
                    <motion.button
                      className="flex flex-col items-center space-y-1 text-[#fff9c9] relative"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="w-6 h-6" />
                      <span className="text-sm">Wishlist</span>
                      {wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#fff9c9] text-[#42000c] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {wishlistCount}
                        </span>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default EcommerceNavbar;