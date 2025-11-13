"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Gift,
  ShieldCheck,
  HelpCircle,
  LogOut,
  Star,
  Clock,
  Truck,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Phone,
  Mail,
  Home,
  Building,
  Copy,
  MessageCircle,
  FileText,
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  total: number;
  image: string;
  brand: string;
  name: string;
  size: string;
}

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  type: "home" | "work";
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: "card" | "upi";
  last4?: string;
  cardType?: string;
  upiId?: string;
  isDefault: boolean;
}

interface Coupon {
  id: string;
  code: string;
  discount: string;
  description: string;
  expiryDate: string;
  minAmount: number;
}
const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState<string>("");

  const orders: Order[] = [
    {
      id: "OD1234567890",
      date: "Oct 15, 2025",
      status: "delivered",
      total: 1999,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200",
      brand: "Nike",
      name: "Men Running Shoes",
      size: "UK 9",
    },
    {
      id: "OD1234567891",
      date: "Oct 10, 2025",
      status: "shipped",
      total: 1299,
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200",
      brand: "Levis",
      name: "Slim Fit Jeans",
      size: "32",
    },
    {
      id: "OD1234567892",
      date: "Sep 28, 2025",
      status: "delivered",
      total: 2499,
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200",
      brand: "Puma",
      name: "Sports T-Shirt Pack",
      size: "L",
    },
  ];

  const wishlistItems = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200",
      brand: "Puma",
      name: "Sports T-Shirt",
      price: 699,
      discount: 40,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200",
      brand: "Roadster",
      name: "Casual Sneakers",
      price: 1499,
      discount: 30,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200",
      brand: "HRX",
      name: "Track Pants",
      price: 899,
      discount: 50,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200",
      brand: "Adidas",
      name: "Running Jacket",
      price: 2999,
      discount: 35,
    },
  ];

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Rahul Kumar",
      phone: "+91 9876543210",
      address: "123, MG Road, Richmond Town",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560025",
      type: "home",
      isDefault: true,
    },
    {
      id: "2",
      name: "Rahul Kumar",
      phone: "+91 9876543210",
      address: "Tower A, 5th Floor, Tech Park",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560103",
      type: "work",
      isDefault: false,
    },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      last4: "4242",
      cardType: "Visa",
      isDefault: true,
    },
    {
      id: "2",
      type: "upi",
      upiId: "rahul@paytm",
      isDefault: false,
    },
    {
      id: "3",
      type: "card",
      last4: "5555",
      cardType: "Mastercard",
      isDefault: false,
    },
  ]);

  const coupons: Coupon[] = [
    {
      id: "1",
      code: "MYNTRA300",
      discount: "₹300 OFF",
      description: "Get ₹300 off on orders above ₹1499",
      expiryDate: "Dec 31, 2025",
      minAmount: 1499,
    },
    {
      id: "2",
      code: "FASHION50",
      discount: "50% OFF",
      description: "Flat 50% off on fashion items",
      expiryDate: "Nov 30, 2025",
      minAmount: 999,
    },
    {
      id: "3",
      code: "FIRSTBUY",
      discount: "₹500 OFF",
      description: "First purchase offer - ₹500 off",
      expiryDate: "Oct 31, 2025",
      minAmount: 2000,
    },
    {
      id: "4",
      code: "SHOES20",
      discount: "20% OFF",
      description: "Extra 20% off on footwear",
      expiryDate: "Nov 15, 2025",
      minAmount: 799,
    },
    {
      id: "5",
      code: "WEEKEND100",
      discount: "₹100 OFF",
      description: "Weekend special discount",
      expiryDate: "Oct 25, 2025",
      minAmount: 599,
    },
  ];

  const menuItems = [
    { id: "overview", icon: User, label: "Overview" },
    { id: "orders", icon: Package, label: "Orders" },
    { id: "wishlist", icon: Heart, label: "Wishlist" },
    { id: "addresses", icon: MapPin, label: "Addresses" },
    { id: "payments", icon: CreditCard, label: "Payments" },
    { id: "coupons", icon: Gift, label: "Coupons" },
    { id: "insider", icon: Star, label: "Myntra Insider" },
    { id: "support", icon: HelpCircle, label: "Help & Support" },
  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "text-green-600";
      case "shipped":
        return "text-blue-600";
      case "processing":
        return "text-yellow-600";
      case "cancelled":
        return "text-red-600";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <ShieldCheck className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDeletePayment = (id: string) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(""), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-gray-900">Account</h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-64 flex-shrink-0"
          >
            <div className="border border-gray-200 rounded-sm overflow-hidden">
              {/* User Info */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hello,</p>
                    <p className="text-sm text-gray-600">Rahul Kumar</p>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="bg-white">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100 transition-colors ${
                      activeSection === item.id
                        ? "text-pink-600 bg-pink-50 border-l-4 border-l-pink-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeSection === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[
                      {
                        label: "Myntra Insider",
                        value: "GOLD",
                        icon: Star,
                        color: "yellow",
                      },
                      {
                        label: "Coupons",
                        value: coupons.length.toString(),
                        icon: Gift,
                        color: "pink",
                      },
                      {
                        label: "SuperCoins",
                        value: "250",
                        icon: Star,
                        color: "yellow",
                      },
                    ].map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="border border-gray-200 rounded-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">
                              {stat.label}
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                              {stat.value}
                            </p>
                          </div>
                          <div className={`bg-${stat.color}-100 p-2 rounded`}>
                            <stat.icon
                              className={`w-6 h-6 text-${stat.color}-600`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent Orders */}
                  <div className="border border-gray-200 rounded-sm mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <h2 className="font-semibold text-gray-900">
                        Recent Orders
                      </h2>
                    </div>
                    <div className="p-4 space-y-4">
                      {orders.slice(0, 2).map((order, idx) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="flex gap-4 p-3 border border-gray-200 rounded-sm cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <img
                            src={order.image}
                            alt={order.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">
                              {order.brand}
                            </p>
                            <p className="text-xs text-gray-600 mb-1">
                              {order.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Size: {order.size}
                            </p>
                            <div
                              className={`flex items-center gap-1 mt-2 ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusIcon(order.status)}
                              <span className="text-xs font-medium capitalize">
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              ₹{order.total}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {order.date}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-gray-200 rounded-sm">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <h2 className="font-semibold text-gray-900">
                        All Orders
                      </h2>
                    </div>
                    <div className="p-4 space-y-4">
                      {orders.map((order, idx) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="border border-gray-200 rounded-sm overflow-hidden"
                        >
                          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-600">
                                Order ID: {order.id}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {order.date}
                              </p>
                            </div>
                            <div
                              className={`flex items-center gap-2 ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusIcon(order.status)}
                              <span className="text-sm font-medium capitalize">
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="p-4 flex gap-4">
                            <img
                              src={order.image}
                              alt={order.name}
                              className="w-24 h-24 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">
                                {order.brand}
                              </p>
                              <p className="text-sm text-gray-600 mb-2">
                                {order.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Size: {order.size}
                              </p>
                              <p className="font-bold text-gray-900 mt-2">
                                ₹{order.total}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-xs font-medium text-pink-600 border border-pink-600 px-4 py-2 rounded-sm hover:bg-pink-50"
                              >
                                View Details
                              </motion.button>
                              {order.status === "delivered" && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="text-xs font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-50"
                                >
                                  Return
                                </motion.button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "wishlist" && (
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
                        My Wishlist ({wishlistItems.length})
                      </h2>
                    </div>
                    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {wishlistItems.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ y: -8 }}
                          className="border border-gray-200 rounded-sm overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        >
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-48 object-cover"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                            >
                              <Heart className="w-4 h-4 fill-pink-600 text-pink-600" />
                            </motion.button>
                            <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                              {item.discount}% OFF
                            </div>
                          </div>
                          <div className="p-3">
                            <p className="font-semibold text-sm text-gray-900">
                              {item.brand}
                            </p>
                            <p className="text-xs text-gray-600 mb-2 truncate">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-gray-900">
                                ₹
                                {Math.round(
                                  item.price * (1 - item.discount / 100)
                                )}
                              </p>
                              <p className="text-xs text-gray-500 line-through">
                                ₹{item.price}
                              </p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full mt-3 bg-pink-600 text-white text-xs py-2 rounded-sm hover:bg-pink-700"
                            >
                              MOVE TO BAG
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "addresses" && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-gray-200 rounded-sm">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                      <h2 className="font-semibold text-gray-900">
                        Saved Addresses
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddAddress(!showAddAddress)}
                        className="flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-700"
                      >
                        <Plus className="w-4 h-4" />
                        Add New Address
                      </motion.button>
                    </div>
                    <div className="p-4 space-y-4">
                      {showAddAddress && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-2 border-dashed border-gray-300 rounded-sm p-4"
                        >
                          <p className="text-sm text-gray-600 mb-2">
                            Add New Address Form
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="Name"
                              className="border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Phone"
                              className="border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Pincode"
                              className="border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <input
                              type="text"
                              placeholder="City"
                              className="border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <input
                              type="text"
                              placeholder="State"
                              className="col-span-2 border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <textarea
                              placeholder="Address"
                              className="col-span-2 border border-gray-300 rounded px-3 py-2 text-sm"
                              rows={3}
                            ></textarea>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-pink-600 text-white text-sm px-4 py-2 rounded-sm hover:bg-pink-700"
                            >
                              Save Address
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowAddAddress(false)}
                              className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-sm hover:bg-gray-50"
                            >
                              Cancel
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {addresses.map((address, idx) => (
                        <motion.div
                          key={address.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="border border-gray-200 rounded-sm p-4"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={`p-2 rounded ${
                                  address.type === "home"
                                    ? "bg-blue-100"
                                    : "bg-orange-100"
                                }`}
                              >
                                {address.type === "home" ? (
                                  <Home className="w-4 h-4 text-blue-600" />
                                ) : (
                                  <Building className="w-4 h-4 text-orange-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 text-sm">
                                  {address.name}
                                </p>
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded uppercase">
                                  {address.type}
                                </span>
                                {address.isDefault && (
                                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                    DEFAULT
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-600 hover:text-pink-600"
                              >
                                <Edit2 className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDeleteAddress(address.id)}
                                className="text-gray-600 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>{address.address}</p>
                            <p>
                              {address.city}, {address.state} -{" "}
                              {address.pincode}
                            </p>
                            <p className="flex items-center gap-2 pt-2">
                              <Phone className="w-3 h-3" />
                              {address.phone}
                            </p>
                          </div>
                          {!address.isDefault && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                handleSetDefaultAddress(address.id)
                              }
                              className="mt-3 text-xs font-medium text-pink-600 border border-pink-600 px-3 py-1.5 rounded-sm hover:bg-pink-50"
                            >
                              Set as Default
                            </motion.button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "payments" && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-gray-200 rounded-sm">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                      <h2 className="font-semibold text-gray-900">
                        Payment Methods
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddPayment(!showAddPayment)}
                        className="flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-700"
                      >
                        <Plus className="w-4 h-4" />
                        Add Payment Method
                      </motion.button>
                    </div>
                    <div className="p-4 space-y-4">
                      {showAddPayment && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-2 border-dashed border-gray-300 rounded-sm p-4"
                        >
                          <p className="text-sm text-gray-600 mb-3">
                            Add New Payment Method
                          </p>
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <button className="flex-1 border-2 border-pink-600 text-pink-600 text-sm px-4 py-2 rounded-sm font-medium">
                                Card
                              </button>
                              <button className="flex-1 border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-sm">
                                UPI
                              </button>
                            </div>
                            <input
                              type="text"
                              placeholder="Card Number"
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="border border-gray-300 rounded px-3 py-2 text-sm"
                              />
                              <input
                                type="text"
                                placeholder="CVV"
                                className="border border-gray-300 rounded px-3 py-2 text-sm"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Cardholder Name"
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                          </div>
                          <div className="flex gap-2 mt-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-pink-600 text-white text-sm px-4 py-2 rounded-sm hover:bg-pink-700"
                            >
                              Add Card
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowAddPayment(false)}
                              className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-sm hover:bg-gray-50"
                            >
                              Cancel
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {paymentMethods.map((method, idx) => (
                        <motion.div
                          key={method.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="border border-gray-200 rounded-sm p-4"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded">
                                <CreditCard className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                {method.type === "card" ? (
                                  <>
                                    <p className="font-semibold text-gray-900 text-sm">
                                      {method.cardType} •••• {method.last4}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                      Credit/Debit Card
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="font-semibold text-gray-900 text-sm">
                                      {method.upiId}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                      UPI
                                    </p>
                                  </>
                                )}
                                {method.isDefault && (
                                  <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                    DEFAULT
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-600 hover:text-pink-600"
                              >
                                <Edit2 className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDeletePayment(method.id)}
                                className="text-gray-600 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                          {!method.isDefault && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSetDefaultPayment(method.id)}
                              className="mt-3 text-xs font-medium text-pink-600 border border-pink-600 px-3 py-1.5 rounded-sm hover:bg-pink-50"
                            >
                              Set as Default
                            </motion.button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "coupons" && (
                <motion.div
                  key="coupons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-gray-200 rounded-sm">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <h2 className="font-semibold text-gray-900">
                        Available Coupons ({coupons.length})
                      </h2>
                    </div>
                    <div className="p-4 space-y-4">
                      {coupons.map((coupon, idx) => (
                        <motion.div
                          key={coupon.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="border-2 border-dashed border-pink-300 rounded-sm p-4 bg-gradient-to-r from-pink-50 to-white cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="bg-pink-600 p-2 rounded">
                                <Gift className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-bold text-pink-600 text-lg">
                                  {coupon.discount}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                  {coupon.description}
                                </p>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleCopyCoupon(coupon.code)}
                              className="flex items-center gap-1 bg-white border border-pink-600 text-pink-600 text-xs px-3 py-1.5 rounded-sm hover:bg-pink-50"
                            >
                              {copiedCoupon === coupon.code ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  Copy
                                </>
                              )}
                            </motion.button>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-pink-200">
                            <div className="bg-pink-600 text-white text-sm font-bold px-3 py-1 rounded">
                              {coupon.code}
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-600">
                                Valid till {coupon.expiryDate}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Min order: ₹{coupon.minAmount}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "insider" && (
                <motion.div
                  key="insider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-gray-200 rounded-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-8 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-full">
                          <Star className="w-12 h-12 text-yellow-500 fill-yellow-500" />
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        GOLD Member
                      </h2>
                      <p className="text-sm text-gray-800">
                        You're enjoying exclusive benefits!
                      </p>
                    </div>

                    <div className="p-6 bg-white">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Your Benefits
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            icon: Star,
                            title: "Early Access to Sales",
                            desc: "Shop before everyone else during sale events",
                          },
                          {
                            icon: Gift,
                            title: "Exclusive Coupons",
                            desc: "Get special discounts only for Insider members",
                          },
                          {
                            icon: Truck,
                            title: "Free Shipping",
                            desc: "Free delivery on all orders above ₹799",
                          },
                          {
                            icon: ShieldCheck,
                            title: "Priority Support",
                            desc: "Get faster resolution for your queries",
                          },
                        ].map((benefit, idx) => (
                          <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-4 p-4 border border-gray-200 rounded-sm hover:border-yellow-500 transition-colors"
                          >
                            <div className="bg-yellow-100 p-2 rounded">
                              <benefit.icon className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">
                                {benefit.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {benefit.desc}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-sm">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-gray-900">
                            SuperCoins Balance
                          </p>
                          <p className="text-2xl font-bold text-yellow-600">
                            250
                          </p>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">
                          Use SuperCoins to get discounts on your next purchase
                        </p>
                        <div className="w-full bg-yellow-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: "25%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          750 more coins to reach next tier
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "support" && (
                <motion.div
                  key="support"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-gray-200 rounded-sm">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <h2 className="font-semibold text-gray-900">
                        Help & Support
                      </h2>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {[
                          {
                            icon: MessageCircle,
                            title: "Live Chat",
                            desc: "Chat with our support team",
                            color: "blue",
                          },
                          {
                            icon: Mail,
                            title: "Email Support",
                            desc: "support@myntra.com",
                            color: "pink",
                          },
                          {
                            icon: Phone,
                            title: "Call Us",
                            desc: "1800-123-4567",
                            color: "green",
                          },
                          {
                            icon: FileText,
                            title: "FAQs",
                            desc: "Find quick answers",
                            color: "purple",
                          },
                        ].map((contact, idx) => (
                          <motion.div
                            key={contact.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="border border-gray-200 rounded-sm p-4 cursor-pointer hover:shadow-lg transition-all"
                          >
                            <div
                              className={`bg-${contact.color}-100 p-3 rounded w-fit mb-3`}
                            >
                              <contact.icon
                                className={`w-6 h-6 text-${contact.color}-600`}
                              />
                            </div>
                            <p className="font-semibold text-gray-900 text-sm mb-1">
                              {contact.title}
                            </p>
                            <p className="text-xs text-gray-600">
                              {contact.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Frequently Asked Questions
                        </h3>
                        <div className="space-y-3">
                          {[
                            "How do I track my order?",
                            "What is your return policy?",
                            "How can I cancel my order?",
                            "How do I use a coupon code?",
                            "What payment methods do you accept?",
                          ].map((faq, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              whileHover={{ x: 4 }}
                              className="flex items-center justify-between p-3 border border-gray-200 rounded-sm cursor-pointer hover:border-pink-300 hover:bg-pink-50 transition-colors"
                            >
                              <p className="text-sm text-gray-700">{faq}</p>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
