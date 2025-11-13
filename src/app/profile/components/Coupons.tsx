import { motion } from "framer-motion";
import { Gift, Check, Copy } from "lucide-react";
import React, { useState } from "react";
const coupons = [
//   {
//     id: "1",
//     code: "MYNTRA300",
//     discount: "₹300 OFF",
//     description: "Get ₹300 off on orders above ₹1499",
//     expiryDate: "Dec 31, 2025",
//     minAmount: 1499,
//   },
//   {
//     id: "2",
//     code: "FASHION50",
//     discount: "50% OFF",
//     description: "Flat 50% off on fashion items",
//     expiryDate: "Nov 30, 2025",
//     minAmount: 999,
//   },
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
    code: "Toys20",
    discount: "20% OFF",
    description: "Extra 20% off on toys",
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

const Coupons = () => {
  const [copiedCoupon, setCopiedCoupon] = useState<string>("");
  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(""), 2000);
  };

  return (
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
              className="border-2 border-dashed border-red-300 rounded-sm p-4 bg-gradient-to-r from-red-50 to-white cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 p-2 rounded">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-red-400 text-lg">
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
                  className="flex items-center gap-1 bg-white border border-red-600 text-red-400 text-xs px-3 py-1.5 rounded-sm hover:bg-red-50"
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
              <div className="flex items-center justify-between pt-3 border-t border-red-200">
                <div className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
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
  );
};

export default Coupons;
