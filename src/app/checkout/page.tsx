"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { useOrderStore } from "@/lib/store/orderStore";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ProgressBar, { Step } from "./components/progressBar";
import PriceSummary from "./components/priceSummary";
import { useIsMobile } from "@/lib/hooks/helperFunctions";
import { useUserStore } from "@/lib/store/userStore";
import AuthForm from "../auth/AuthForm";
import AddressModal from "./components/AddressModal";
import Payments, { PaymentMethod } from "./components/Payments";
import CheckoutProductList from "./components/CheckoutProductList";

const CheckoutPage = () => {
  const router = useRouter();
  const { selectedCartItems, selectedCartTotal, removeSelected } =
    useCartStore();
  const { addOrderFromCart, getLatestOrder } = useOrderStore();
  const { user } = useUserStore();
  const isMobile = useIsMobile();
  const [showAuth, setShowAuth] = useState(false);

  const [orderComplete, setOrderComplete] = useState(false);
  const items = selectedCartItems();

  // console.log(user, login);

  // Form states
  // const [user, setUser] = useState({
  //   id:"",
  //   name: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   city: "",
  //   postalCode: "",
  //   country: "",
  // });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const ProgrssSteps: Step[] = [
    // { id: 1, label: "User Details" },
    { id: 1, label: "Order Summary" },
    { id: 2, label: "Address" },
    { id: 3, label: "Payment" },
  ];
  // useEffect(() => {
  //   if (currentStep) setCurrentStep(currentStep);
  // }, [currentStep]);

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      alert("No items selected for checkout.");
      return;
    }

    if (!paymentMethod.type) {
      alert("please select payment method");
      return;
    }
    if (!user) {
      alert("please login");
      return;
    }

    const order = addOrderFromCart(items, user, {
      method: paymentMethod.type,
      status: paymentMethod.type === "cod" ? "pending" : "paid",
    });

    setOrderComplete(true);
    // clearCart(); // or deselect items instead if you want to keep them
  };

  const handleComplete = () => {
    removeSelected();
    router.push(`/`);
  };

  const onContinue = () => {
    if (currentStep === ProgrssSteps.length) {
      handlePlaceOrder();
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  if (orderComplete) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4"
        // variants={pageVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6 }}
        onClick={handleComplete}
      >
        <motion.div
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
          // variants={cardVariants}
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
            Thank you for your purchase. Your order {getLatestOrder()?.id} has
            been confirmed and will be shipped soon.
          </motion.div>
          <motion.div
            className="bg-gray-50 rounded-xl p-4 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-gray-600 mb-2">Order Total</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{selectedCartTotal().toFixed(2)}
            </p>
          </motion.div>
          <motion.button
            onClick={handleComplete}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            // variants={buttonVariants}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 md:my-16 space-y-2 ">
      <motion.div
        className="fixed inset-0 top-0 left-0 right-0 z-50 h-10 md:z-10 bg-white border-b border-gray-200 md:relative md:inset-auto md:top-auto md:left-auto md:right-auto"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full mx-auto  sm:px-6 lg:px-8 flex items-center justify-between relative">
          <motion.button
            className="flex h-full md:hidden items-center justify-between  text-gray-600 hover:text-gray-900 transition-colors text-sm absolute"
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => router.push(`/`)}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </motion.button>
          <h1 className="text-xl font-bold text-gray-900  w-full text-center md:text-start">
            Checkout
          </h1>
        </div>
      </motion.div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 space-y-2">
        <div className=" w-full mx-auto sm:px-3 md:col-span-2 space-y-2 ">
          <ProgressBar
            steps={ProgrssSteps}
            currentStep={currentStep}
            // onStepClick={(stepId) => setCurrentStep(stepId)}
            onStepClick={setCurrentStep}
          />
          <div className=" mx-2 p-2 shadow-md rounded  bg-white space-y-3">
            {currentStep === 1 && <CheckoutProductList />}
            {currentStep === 2 && <AddressModal />}
            {currentStep === 3 && (
              <Payments
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            )}
            <div className=" hidden md:flex bg-white   items-center justify-between  py-2 md:px-7">
              <div className="">₹{selectedCartTotal()}</div>
              <button
                className="px-8 py-1 bg-[#900001]/80 text-white rounded-lg"
                onClick={onContinue}
              >
                {currentStep === ProgrssSteps.length
                  ? "Place Order"
                  : "Continue"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full px-2">
          {!(currentStep === 3 && isMobile) && <PriceSummary />}
        </div>
      </div>
      {/* Bottom Continue Button (mobile sticky) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex items-center justify-between px-4 py-2 md:hidden">
        <div className="font-semibold">
          ₹{selectedCartTotal()} ({selectedCartItems().length} Items)
        </div>
        <button
          className="px-8 py-2 bg-[#900001]/80 text-white rounded-lg"
          onClick={onContinue}
        >
          {currentStep === ProgrssSteps.length ? "Place Order" : "Continue"}
          {/* Continue */}
        </button>
      </div>

      {/* {!user ? (
        <div className="">
          LogIn Please
          <button onClick={() => setShowAuth(true)} className=" bg-red-400">
            Login/SignUp
          </button>
        </div>
      ) : (
        <div className="">{user.name}</div>
      )}
      <div
        className="mt-5"
        onClick={() => {
          clearOrders();
        }}
      >
        clear Orders
      </div> */}

      {showAuth && <AuthForm onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default CheckoutPage;
