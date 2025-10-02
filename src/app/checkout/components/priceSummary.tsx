import { useCartStore } from "@/lib/store/cartStore";
import { BadgePercent } from "lucide-react";
import React from "react";

const PriceSummary = () => {
  const { selectedCartItems } = useCartStore();

  const totalPrice = selectedCartItems().reduce(
    (acc, item) =>
      acc +
      (item.ProductConfig.price ?? item.totalprice) *
        item.ProductConfig.quantity,
    0
  );
  const discount = selectedCartItems().reduce(
    (sum, i) =>
      sum +
      Math.round(
        (i.ProductConfig.price ?? i.product.price) * (i.product.discount / 100)
      ) *
        i.ProductConfig.quantity,
    0
  );
  const deliveryCharges =
    selectedCartItems.length === 0 ? 0 : totalPrice >= 200 ? 0 : 50;

  return (
    <div className="w-full bg-white rounded p-2 shadow-lg ">
      <div className=" w-full flex items-center justify-between px-2 mb-1 border-dotted border-b border-gray-300">
        Price Details ({selectedCartItems().length} items)
      </div>
      <div className=" w-full flex items-center justify-between px-2">
        <div className="">Total MRP</div>
        <p>₹{totalPrice + discount}</p>
      </div>
      <div className=" w-full flex items-center justify-between px-2">
        <div className="">Discount</div>
        <p className=" text-green-400">-₹{discount}</p>
      </div>
      <div className=" w-full flex items-center justify-between px-2">
        <div className="">Platform Fee</div>
        <p>₹{20}</p>
      </div>
      <div className=" w-full flex items-center justify-between px-2">
        <div className="">Delivery Charges</div>
        <p>₹{deliveryCharges}</p>
      </div>
      <div className=" w-full flex items-center justify-between px-2 mt-1 border-dotted border-t border-gray-300">
        <div className="">Total Amount</div>
        <p>₹{totalPrice}</p>
      </div>
      <div className="w-full flex items-center justify-center mt-1 px-2">
        <div className="w-full flex items-center flex-wrap justify-center  px-2 py-1 gap-1 rounded-md bg-green-100 text-green-600 text-xs ">
          <BadgePercent className="size-4 " />
          You&apos;ll save
          <div className=" font-semibold"> ₹{discount} </div>
          on this order!
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
