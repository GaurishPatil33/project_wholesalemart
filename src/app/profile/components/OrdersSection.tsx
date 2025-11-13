import { Order, useOrderStore } from "@/lib/store/orderStore";
import {  motion } from "framer-motion";
import { ShieldCheck, Truck, Clock, X } from "lucide-react";
import React, { useState } from "react";

const OrdersSection = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { orders } = useOrderStore();
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "text-green-600";
      case "shipped":
        return "text-blue-600";
      case "processing":
        return "text-yellow-600";
      case "pending":
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
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const Viewdetails = () => {
    const discount = Math.round(
      selectedOrder?.items.reduce(
        (sum, item) =>
          sum +
          item.basePrice * (item.discount / 100) * item.ProductConfig.quantity,
        0
      ) || 0
    );
    const finalPrice = (selectedOrder?.total ?? 0) - discount;

    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedOrder(null)}
          className="fixed inset-0 bg-black/40 z-40"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-sm w-full h-[90%] md:h-150 md:w-200 shadow-2xl overflow-y-auto">
            {/* top */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-2 md:px-6 md:py-4 flex items-center justify-between">
              <div className="">
                <h2 className="text-lg font-bold text-gray-900">
                  Order Details
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  Order ID: {selectedOrder?.id}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedOrder(null)}
              >
                <X className=" size-4" />
              </motion.button>
            </div>

            {/* main content */}
            <div className="p-4 md:p-6 grid md:grid-cols-2 gap-2">
              <div className="">
                {/* Product Details */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Product Details
                    {/* {selectedOrder?.items.length} */}
                  </h3>
                  {selectedOrder?.items.map((item, index) => (
                    <div className="flex gap-4  last:border-b-0 border-b border-dotted border-gray-300 py-3" key={index} >
                      <img
                        // src={selectedOrder?.items[0].product.images[0]}
                        src={item.product.images[0]}
                        alt={selectedOrder?.items[0].product.title}
                        className="w-24 h-full object-cover rounded border border-gray-200"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">
                          {/* {selectedOrder?.items[0].product.brand} */}
                          {item.product.brand}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.product.title}
                          {/* {selectedOrder?.items[0].product.title} */}
                        </p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <p>
                            Size:
                            <span className="font-medium">
                              {item.ProductConfig.size ??
                                item.product.sizes[0].size}
                              {/* {selectedOrder?.items[0].ProductConfig.size} */}
                            </span>
                          </p>
                          <p>
                            Qty:
                            <span className="font-medium">
                              {/* {selectedOrder?.items[0].ProductConfig.quantity} */}
                              {item.ProductConfig.quantity}
                            </span>
                          </p>
                        </div>
                        <p className="font-bold text-gray-900 mt-2">
                          ₹{item.finalPrice}
                          {/* ₹{selectedOrder?.items[0].finalPrice} */}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                {/* Price Details */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Price Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total MRP</span>
                      <span className="text-gray-900">
                        ₹{selectedOrder?.total}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount on MRP</span>
                      <span>{discount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Convenience/Delivery Fee
                      </span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                      <span className="text-gray-900">Total Amount</span>
                      <span className="text-gray-900">
                        ₹{finalPrice}
                      </span>
                    </div>
                    {/* {selectedOrder?.items.} */}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-6  border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 mt-2">
                    Delivery Address
                  </h3>
                  <div className="py-1 text-sm">
                    <p className="font-semibold text-gray-900">
                      {selectedOrder?.address.reciversName}
                    </p>
                    <p className="text-gray-600 mt-1">
                      {selectedOrder?.address.houseNo_Or_Name},{" "}
                      {selectedOrder?.address.street}
                    </p>
                    <p className="text-gray-600">
                      {selectedOrder?.address.city},{" "}
                      {selectedOrder?.address.state} -{" "}
                      {selectedOrder?.address.postalCode}
                    </p>
                    <p className="text-gray-600 mt-2">
                      {selectedOrder?.userInfo.phone}
                    </p>
                  </div>
                </div>

                {/* order date */}
                <div className="text-sm text-gray-600">
                  <p>
                    Order Date:
                    <span className=" font-medium text-gray-900">
                      {" "}
                      {new Date(
                        selectedOrder?.OrderDate as string
                      ).toDateString()}
                    </span>
                  </p>
                  <p>
                    Delivery Date:
                    <span className=" font-medium text-gray-900">
                      {" "}
                      {new Date(
                        selectedOrder?.deliveryDate as string
                      ).toDateString()}
                    </span>
                  </p>
                </div>
                {/* exchange/returns review */}
                <div className="mt-6 flex gap-3">
                  {selectedOrder?.status === "delivered" && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-pink-600 text-white py-3 rounded-sm font-medium hover:bg-pink-700 transition-colors"
                      >
                        Exchange/Return
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        Write Review
                      </motion.button>
                    </>
                  )}
                  {selectedOrder?.status === "shipped" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-pink-600 text-white py-3 rounded-sm font-medium hover:bg-pink-700 transition-colors"
                    >
                      Track Order
                    </motion.button>
                  )}
                  {["pending", "processing"].includes(
                    selectedOrder?.status as string
                  ) && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 border border-red-500 text-red-500 py-3 rounded-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      Cancel Order
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
  };

  return (
    <motion.div
      key="orders"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="border border-gray-200 rounded-sm">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="font-semibold text-gray-900">All Orders</h2>
        </div>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto max-h-400 md:max-h-200">
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
                <p className="text-xs text-gray-600">Order ID: {order.id}</p>
                {!["pending", "processing"].includes(order.status) ? (
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(order.deliveryDate).toDateString()}
                    {/* {order.deliveryDate.toDateString()} */}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Your order is in Processing
                  </p>
                )}
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
                src={order.items[0].product.images[0]}
                alt={order.items[0].product.title}
                className="w-24 h-36 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {order.items[0].product.brand}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {order.items[0].product.title}
                </p>
                <p className="text-xs text-gray-500">
                  Size:
                  {order.items[0].ProductConfig?.size ??
                    order.items[0].product.sizes[0].size}
                </p>
                <p className="font-bold text-gray-900 mt-2">₹{order.total}</p>
              </div>
              <div className="flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs font-medium text-red-600 border border-red-600 px-4 py-2 rounded-sm hover:bg-pink-50"
                  onClick={() => setSelectedOrder(order)}
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
      {/* <button onClick={clearOrders}>clearAllOrders</button> */}

      {/* orderdetails popup */}
      {selectedOrder && <Viewdetails />}
    </motion.div>
  );
};

export default OrdersSection;
