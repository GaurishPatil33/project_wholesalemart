"use client";
import { useCartStore } from "@/lib/store/cartStore";
import { useToast } from "@/lib/store/toast";
import { Product } from "@/lib/types";
import { motion, useInView } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const [showVideo, setShowVideo] = useState(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, {
    margin: "-40% 0px -30% 0px",
    once: false,
  });
  const {
    wishlist,
    isInWishlist,
    isInCart,
    toggleWishlist,
    addToCart,
    removeFromCart,
  } = useCartStore();

  const { showToast } = useToast();

  const router =useRouter()

  // useEffect(() => {
  //   if (product.video) {
  //     const timer = setTimeout(() => {
  //       setShowVideo(true);
  //     }, 10000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [product.video]);

  const handleStart = () => {
    timeRef.current = setTimeout(() => {
      setShowVideo(true);
    }, 500);
  };
  const handleStop = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }
    setShowVideo(false);
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    if (isInWishlist(product.id)) {
      showToast("Added to Wishlist ❤️");
    } else {
      showToast("Removed from Wishlist💔");
    }
  };

  const handleCartToggle = () => {
    if (isInCart(product.id)) {
      showToast("Removed from Cart 🛒");
      removeFromCart(product.id);
    } else {
      showToast("Added to Cart 🛒");
      addToCart(product);
    }
  };

  return (
    <div
      ref={cardRef}
      className="min-w-40 h-fit  hover:scale-101 px-1 mt-2"
      onMouseEnter={handleStart}
      onMouseLeave={handleStop}
      onTouchStart={handleStart}
      onTouchEnd={handleStop}
      onTouchCancel={handleStop}
    >
      <div className=" relative rounded-tr-3xl xs:px-4 rounded-bl-3xl overflow-hidden ">
        {showVideo && product.video && cardRef ? (
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            src={product.video}
            className="w-full h-70 md:h-100 object-cover backdrop-contrast-200 no-pip"
            muted
            loop
            playsInline
            autoPlay
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            controlsList=" nodownload nofullscreen noremoteplayback"
          />
        ) : (
          <img
            src={product.images[0]}
            alt={product.title}
            className=" w-full h-70 md:h-100  object-cover"
          />
        )}

        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          // whileInView={{ y: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-fit rounded-full flex justify-center gap-3 p-2"
        >
          <button
            className=" rounded-full bg-white/70 p-1.5  shadow-sm"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`w-4 h-4 text-gray-700 ${
                isInWishlist(product.id) ? "fill-current text-red-500" : ""
              }`}
            />
          </button>
          <button
            onClick={handleCartToggle}
            className=" rounded-full bg-white/70 p-1.5 shadow-sm"
          >
            <ShoppingCart
              className={`w-4 h-4 text-gray-700 ${
                isInCart(product.id) ? "fill-current text-white" : ""
              }`}
            />
          </button>
        </motion.div>
      </div>
      <div className=" px-1" onClick={()=>router.push(`/product/${product.id}`)}>
        <span className=" text-gray-500 text-sm font-medium line-clamp-2 text-center">
          {product.title}
        </span>
        <div className=" flex gap-2 items-center justify-center">
          <div className=" text-gray-900 text-sm font-medium">
            ₹{product.price}
          </div>
          <span className=" text-gray-500 text-sm line-through ">
            ₹{product.price + (product.discount * product.price) / 100}
          </span>
          <span className=" text-xs flex items-center justify-center text-green-500">
            {product.discount}%Off
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
