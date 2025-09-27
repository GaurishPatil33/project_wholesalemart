"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  Check,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion } from "framer-motion";

// TypeScript interfaces
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  time: string;
  cost: number;
}

interface Step {
  id: number;
  name: string;
  completed: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  saveInfo: boolean;
  sameAsBilling: boolean;
  shippingMethod: string;
  promoCode: string;
}

interface Errors {
  [key: string]: string;
}

interface InputFieldProps {
  label: string;
  type?: string;
  field: keyof FormData;
  placeholder: string;
  icon?: React.ComponentType<{ size?: number }>;
  required?: boolean;
}

// Framer Motion variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const stepVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.02, y: -5 },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const progressVariants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
};

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showCardDetails, setShowCardDetails] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    saveInfo: false,
    sameAsBilling: true,
    shippingMethod: "standard",
    promoCode: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  // Sample cart items
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Smart Fitness Tracker",
      price: 159.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&h=100&fit=crop",
    },
  ];

  const subtotal: number = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost: number =
    formData.shippingMethod === "express"
      ? 15.99
      : formData.shippingMethod === "overnight"
      ? 29.99
      : 5.99;
  const tax: number = subtotal * 0.08;
  const discount: number = formData.promoCode === "SAVE10" ? subtotal * 0.1 : 0;
  const total: number = subtotal + shippingCost + tax - discount;

  const steps: Step[] = [
    { id: 1, name: "Information", completed: false },
    { id: 2, name: "Shipping", completed: false },
    { id: 3, name: "Payment", completed: false },
    { id: 4, name: "Review", completed: false },
  ];

  const shippingMethods: ShippingMethod[] = [
    {
      id: "standard",
      name: "Standard Shipping",
      time: "5-7 business days",
      cost: 5.99,
    },
    {
      id: "express",
      name: "Express Shipping",
      time: "2-3 business days",
      cost: 15.99,
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      time: "Next business day",
      cost: 29.99,
    },
  ];

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Errors = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
    }

    if (step === 2) {
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    }

    if (step === 3) {
      if (!formData.cardNumber)
        newErrors.cardNumber = "Card number is required";
      if (!formData.expiryDate)
        newErrors.expiryDate = "Expiry date is required";
      if (!formData.cvv) newErrors.cvv = "CVV is required";
      if (!formData.cardName)
        newErrors.cardName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (): void => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = (): void => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (): Promise<void> => {
    if (validateStep(4)) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setOrderComplete(true);
      }, 3000);
    }
  };

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts: string[] = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const InputField: React.FC<InputFieldProps> = ({
    label,
    type = "text",
    field,
    placeholder,
    icon: Icon,
    required = true,
  }) => (
    <motion.div
      className="space-y-2"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3 }}
    >
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {Icon && <Icon size={16} />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <motion.input
        type={type}
        placeholder={placeholder}
        value={String(formData[field])}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          errors[field] ? "border-red-500" : "border-gray-300"
        }`}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
      {errors[field] && (
        <motion.div
          className="text-red-500 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {errors[field]}
        </motion.div>
      )}
    </motion.div>
  );

  if (orderComplete) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.4,
            }}
          >
            <Check size={32} className="text-white" />
          </motion.div>
          <motion.div
            className="text-2xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Order Confirmed!
          </motion.div>
          <motion.div
            className="text-gray-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Thank you for your purchase. Your order #ORD-2024-001 has been
            confirmed and will be shipped soon.
          </motion.div>
          <motion.div
            className="bg-gray-50 rounded-xl p-4 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-gray-600 mb-2">Order Total</p>
            <p className="text-2xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </p>
          </motion.div>
          <motion.button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.button
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowLeft size={20} />
              <span>Back to Cart</span>
            </motion.button>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <motion.div
              className="bg-white rounded-2xl p-6 mb-8"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <motion.div
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                        currentStep >= step.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        backgroundColor:
                          currentStep >= step.id ? "#2563eb" : "#e5e7eb",
                        color: currentStep >= step.id ? "#ffffff" : "#6b7280",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentStep > step.id ? <Check size={20} /> : step.id}
                    </motion.div>
                    <span
                      className={`ml-3 font-medium ${
                        currentStep >= step.id
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                    {index < steps.length - 1 && (
                      <motion.div
                        className={`mx-4 h-px flex-1 ${
                          currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                        }`}
                        variants={progressVariants}
                        initial="initial"
                        animate={currentStep > step.id ? "animate" : "initial"}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Step Content */}
            <motion.div
              className="bg-white rounded-2xl p-6"
              key={currentStep}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              {currentStep === 1 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    className="text-xl font-bold text-gray-900 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Personal Information
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="First Name"
                      field="firstName"
                      placeholder="John"
                      icon={User}
                    />
                    <InputField
                      label="Last Name"
                      field="lastName"
                      placeholder="Doe"
                      icon={User}
                    />
                    <InputField
                      label="Email Address"
                      type="email"
                      field="email"
                      placeholder="john@example.com"
                      icon={Mail}
                    />
                    <InputField
                      label="Phone Number"
                      type="tel"
                      field="phone"
                      placeholder="+1 (555) 123-4567"
                      icon={Phone}
                    />
                  </div>
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <input
                      type="checkbox"
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onChange={(e) =>
                        handleInputChange("saveInfo", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="saveInfo" className="text-sm text-gray-600">
                      Save this information for faster checkout next time
                    </label>
                  </motion.div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    className="text-xl font-bold text-gray-900 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Shipping Address
                  </motion.div>
                  <div className="space-y-6">
                    <InputField
                      label="Street Address"
                      field="address"
                      placeholder="123 Main Street"
                      icon={MapPin}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <InputField
                        label="City"
                        field="city"
                        placeholder="New York"
                      />
                      <InputField
                        label="State"
                        field="state"
                        placeholder="NY"
                      />
                      <InputField
                        label="ZIP Code"
                        field="zipCode"
                        placeholder="10001"
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Country
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div
                    className="border-t border-gray-200 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Shipping Method
                    </h3>
                    <div className="space-y-3">
                      {shippingMethods.map((method, index) => (
                        <motion.div
                          key={method.id}
                          className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                            formData.shippingMethod === method.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              value={method.id}
                              checked={formData.shippingMethod === method.id}
                              onChange={(e) =>
                                handleInputChange(
                                  "shippingMethod",
                                  e.target.value
                                )
                              }
                              className="w-4 h-4 text-blue-600"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {method.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {method.time}
                              </div>
                            </div>
                          </div>
                          <div className="font-semibold text-gray-900">
                            ${method.cost}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    className="text-xl font-bold text-gray-900 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Payment Information
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6"
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <CreditCard size={24} />
                        <span className="font-semibold">Credit Card</span>
                      </div>
                      <Shield size={20} />
                    </div>
                    <div className="space-y-2">
                      <motion.div
                        className="text-lg font-mono tracking-wider"
                        animate={{ opacity: formData.cardNumber ? 1 : 0.6 }}
                      >
                        {formData.cardNumber || "•••• •••• •••• ••••"}
                      </motion.div>
                      <div className="flex justify-between text-sm">
                        <motion.div
                          animate={{ opacity: formData.cardName ? 1 : 0.6 }}
                        >
                          {formData.cardName || "CARDHOLDER NAME"}
                        </motion.div>
                        <motion.div
                          animate={{ opacity: formData.expiryDate ? 1 : 0.6 }}
                        >
                          {formData.expiryDate || "MM/YY"}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                        <CreditCard size={16} />
                        Card Number *
                      </label>
                      <motion.input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "cardNumber",
                            formatCardNumber(e.target.value)
                          )
                        }
                        maxLength={19}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.cardNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      {errors.cardNumber && (
                        <motion.div
                          className="text-red-500 text-sm mt-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.cardNumber}
                        </motion.div>
                      )}
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                          <Calendar size={16} />
                          Expiry Date *
                        </label>
                        <motion.input
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          maxLength={5}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.expiryDate
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        {errors.expiryDate && (
                          <motion.div
                            className="text-red-500 text-sm mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.expiryDate}
                          </motion.div>
                        )}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                          <Lock size={16} />
                          CVV *
                        </label>
                        <div className="relative">
                          <motion.input
                            type={showCardDetails ? "text" : "password"}
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) =>
                              handleInputChange("cvv", e.target.value)
                            }
                            maxLength={4}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${
                              errors.cvv ? "border-red-500" : "border-gray-300"
                            }`}
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                          <motion.button
                            type="button"
                            onClick={() => setShowCardDetails(!showCardDetails)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {showCardDetails ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </motion.button>
                        </div>
                        {errors.cvv && (
                          <motion.div
                            className="text-red-500 text-sm mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.cvv}
                          </motion.div>
                        )}
                      </motion.div>
                    </div>

                    <InputField
                      label="Cardholder Name"
                      field="cardName"
                      placeholder="John Doe"
                      icon={User}
                    />
                  </div>

                  <motion.div
                    className="bg-gray-50 rounded-xl p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Shield size={16} className="text-green-600" />
                      <span>
                        Your payment information is encrypted and secure
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    className="text-xl font-bold text-gray-900 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Review Your Order
                  </motion.div>

                  <div className="space-y-6">
                    <motion.div
                      className="border border-gray-200 rounded-xl p-4"
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Personal Information
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p>{formData.email}</p>
                        <p>{formData.phone}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="border border-gray-200 rounded-xl p-4"
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Shipping Address
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{formData.address}</p>
                        <p>
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p>{formData.country}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="border border-gray-200 rounded-xl p-4"
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Payment Method
                      </h3>
                      <div className="flex items-center gap-3">
                        <CreditCard size={20} className="text-gray-600" />
                        <span className="text-sm text-gray-600">
                          •••• •••• •••• {formData.cardNumber.slice(-4)}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <Truck size={20} className="text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">
                          {
                            shippingMethods.find(
                              (m) => m.id === formData.shippingMethod
                            )?.name
                          }
                        </p>
                        <p className="text-sm text-blue-700">
                          Estimated delivery:{" "}
                          {
                            shippingMethods.find(
                              (m) => m.id === formData.shippingMethod
                            )?.time
                          }
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <motion.div
                className="flex justify-between pt-6 border-t border-gray-200 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {currentStep > 1 && (
                  <motion.button
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <ArrowLeft size={20} />
                    Back
                  </motion.button>
                )}

                <div className="ml-auto">
                  {currentStep < 4 ? (
                    <motion.button
                      onClick={nextStep}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Continue
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      variants={buttonVariants}
                      whileHover={!isProcessing ? "hover" : {}}
                      whileTap={!isProcessing ? "tap" : {}}
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          Processing...
                        </>
                      ) : (
                        "Complete Order"
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-2xl p-6 sticky top-8"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                className="text-lg font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Order Summary
              </motion.div>

              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative">
                      <motion.div
                        transition={{ type: "spring", stiffness: 300 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </motion.div>
                      <motion.div
                        className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          delay: 0.6 + index * 0.1,
                        }}
                      >
                        {item.quantity}
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-blue-600 font-semibold">
                        ${item.price}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="border-t border-gray-200 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="space-y-3 text-sm">
                  <motion.div
                    className="flex justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </motion.div>
                  <motion.div
                    className="flex justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      ${shippingCost.toFixed(2)}
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </motion.div>
                  {discount > 0 && (
                    <motion.div
                      className="flex justify-between text-green-600"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        delay: 1.1,
                      }}
                    >
                      <span>Discount (SAVE10)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </motion.div>
                  )}
                </div>

                <motion.div
                  className="border-t border-gray-200 mt-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <motion.div
                      key={total}
                      initial={{ scale: 1.2, color: "#3b82f6" }}
                      animate={{ scale: 1, color: "#111827" }}
                      transition={{ duration: 0.3 }}
                    >
                      ${total.toFixed(2)}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Promo Code */}
              <motion.div
                className="mt-6 pt-6 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <div className="flex gap-2">
                  <motion.input
                    type="text"
                    placeholder="Promo code"
                    value={formData.promoCode}
                    onChange={(e) =>
                      handleInputChange("promoCode", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.button
                    className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Apply
                  </motion.button>
                </div>
                {formData.promoCode === "SAVE10" && (
                  <motion.div
                    className="text-green-600 text-sm mt-2 flex items-center gap-1"
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check size={14} />
                    10% discount applied!
                  </motion.div>
                )}
              </motion.div>

              {/* Security Badge */}
              <motion.div
                className="mt-6 pt-6 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Shield size={16} className="text-green-600" />
                  </motion.div>
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
