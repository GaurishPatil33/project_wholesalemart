"use client";
import { useCartStore } from "@/lib/store/cartStore";
import { useToast } from "@/lib/store/toast";
import { useVideoStore } from "@/lib/store/videoStore";
import { Product } from "@/lib/types";
import { motion, useInView } from "framer-motion";
import { Heart, ShoppingBag, ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [showVideo, setShowVideo] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, {
    // margin: "-10% 0px -10% 0px",
    margin: " 0px",
    amount: 0.8,
    once: false,
    //  threshold: 0.7, // 👈 play when 70% visible
    // triggerOnce: false,
  });
  const {
    // wishlist,
    isInWishlist,
    isInCart,
    toggleWishlist,
    addToCart,
    removeFromCart,
  } = useCartStore();

  const { showToast } = useToast();
  const { activeId, setActiveId, visibleIds, setVisibleIds } = useVideoStore();
  const router = useRouter();

  // useEffect(() => {
  //   if (product.video) {
  //     const timer = setTimeout(() => {
  //       setShowVideo(true);
  //     }, 10000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [product.video]);

  // useEffect(() => {
  //   if (!videoRef.current) return;

  //   if (isInView) {
  //     // start a delay
  //     timeRef.current = setTimeout(() => {
  //       setShowVideo(true);
  //       videoRef.current?.play().catch(() => {});
  //       // setIsPlaying(true);
  //     }, 1800);
  //   } else {
  //     // cancel delay if user scrolls away / unhover
  //     if (timeRef.current) {
  //       clearTimeout(timeRef.current);
  //       timeRef.current = null;
  //     }
  //     setShowVideo(false);
  //     videoRef.current.pause();
  //     // setIsPlaying(false);
  //   }

  //   return () => {
  //     if (timeRef.current) {
  //       clearTimeout(timeRef.current);
  //       timeRef.current = null;
  //     }
  //   };
  // }, [isInView,]);

  // 🎥 Manage playback based on view & active state
  useEffect(() => {
    if (!videoRef.current) return;

    // Clear old timers when effect runs
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }

    if (isInView) {
      // Immediately mark as active
      setActiveId(product.id);

      timeRef.current = setTimeout(() => {
        if (videoRef.current) {
          setShowVideo(true);
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});

          // Stop vid after 4sec
          timeRef.current = setTimeout(() => {
            // ✅ No need to check stale activeId here
            if (videoRef.current) {
              videoRef.current.pause();
              setShowVideo(false);
            }
          }, 6000);
        }
      }, 1100);
    } else {
      // Reset when out of view
      if (activeId === product.id) {
        setActiveId(null);
      }
      setShowVideo(false);
      videoRef.current.pause();
    }

    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
        timeRef.current = null;
      }
    };
  }, [isInView, product.id, setActiveId]);

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
      showToast("Adde  to Cart 🛒");
      addToCart(product, { price: product.price, quantity: 1 });
    }
  };

  return (
    <div
      ref={cardRef}
      data-product-id={product.id}
      className="min-w-40 h-fit  px-1 mt-2 cursor-pointer"
      // onMouseEnter={handleStart}
      // onMouseLeave={handleStop}
      // onTouchStart={handleStart}
      // onTouchEnd={handleStop}
      // onTouchCancel={handleStop}
    >
      <div className=" relative rounded-xl  xs:px-4 shadow-lg  overflow-hidden ">
        <div
          className="relative w-full h-70  hover:scale-105  "
          onClick={() => router.push(`/product/${product.id}`)}
        >
          <motion.img
            key="image"
            src={product.images[0]}
            alt={product.title}
            initial={{ opacity: 1 }}
            animate={{ opacity: showVideo ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover "
          />
          {product.video &&  (
            <motion.video
              key="video"
              ref={videoRef}
              preload="none"
              src={product.video}
              muted
              loop={false}
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: showVideo ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover hover:scale-102 "
              onEnded={() => setShowVideo(false)}
            />
          )}
        </div>

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
                isInCart(product.id) ? "fill-red-500  " : ""
              }`}
            />
          </button>
        </motion.div>
      </div>
      <div
        className=" px-1 mt-1"
        onClick={() => router.push(`/product/${product.id}`)}
      >
        <span className=" text-gray-500 text-sm font-medium line-clamp-2 text-center">
          {product.title}
        </span>
        <div className=" flex gap-2 items-baseline justify-center ">
          <div className=" text-gray-900 text-lg font-medium">
            ₹{product.sizes[0].price}
          </div>
          <span className=" text-gray-500 text-sm line-through ">
            ₹
            {Math.round(
              product.sizes[0].price +
                (product.discount * product.sizes[0].price) / 100
            )}
          </span>
          {product.discount > 0 && (
            <span className=" text-xs flex items-center justify-center text-green-500">
              {product.discount}%Off
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// typ2
export const ProductCardType2: React.FC<ProductCardProps> = ({
  product,
  index,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, {
    // margin: "-10% 0px -10% 0px",
    margin: " 0px",
    amount: 0.8,
    once: false,
    //  threshold: 0.7, // 👈 play when 70% visible
    // triggerOnce: false,
  });
  const {
    // wishlist,
    isInWishlist,
    isInCart,
    toggleWishlist,
    addToCart,
    removeFromCart,
  } = useCartStore();

  const { showToast } = useToast();
  const { activeId, setActiveId, visibleIds, setVisibleIds } = useVideoStore();
  const router = useRouter();

  // useEffect(() => {
  //   if (product.video) {
  //     const timer = setTimeout(() => {
  //       setShowVideo(true);
  //     }, 10000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [product.video]);

  // useEffect(() => {
  //   if (!videoRef.current) return;

  //   if (isInView) {
  //     // start a delay
  //     timeRef.current = setTimeout(() => {
  //       setShowVideo(true);
  //       videoRef.current?.play().catch(() => {});
  //       // setIsPlaying(true);
  //     }, 1800);
  //   } else {
  //     // cancel delay if user scrolls away / unhover
  //     if (timeRef.current) {
  //       clearTimeout(timeRef.current);
  //       timeRef.current = null;
  //     }
  //     setShowVideo(false);
  //     videoRef.current.pause();
  //     // setIsPlaying(false);
  //   }

  //   return () => {
  //     if (timeRef.current) {
  //       clearTimeout(timeRef.current);
  //       timeRef.current = null;
  //     }
  //   };
  // }, [isInView,]);

  // 🎥 Manage playback based on view & active state
  useEffect(() => {
    if (!videoRef.current) return;

    // Clear old timers when effect runs
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }

    if (isInView) {
      // Immediately mark as active
      setActiveId(product.id);

      timeRef.current = setTimeout(() => {
        if (videoRef.current) {
          setShowVideo(true);
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});

          // Stop vid after 4sec
          timeRef.current = setTimeout(() => {
            // ✅ No need to check stale activeId here
            if (videoRef.current) {
              videoRef.current.pause();
              setShowVideo(false);
            }
          }, 6000);
        }
      }, 1100);
    } else {
      // Reset when out of view
      if (activeId === product.id) {
        setActiveId(null);
      }
      setShowVideo(false);
      videoRef.current.pause();
    }

    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
        timeRef.current = null;
      }
    };
  }, [isInView, product.id, setActiveId]);

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
      showToast("Product Already in your Cart 🛒");
      // removeFromCart(product.id);
    } else {
      showToast("Added to Cart 🛒");
      addToCart(product, { price: product.price, quantity: 1 });
    }
  };

  return (
    <div
      ref={cardRef}
      data-product-id={product.id}
      className="min-w-40 h-fit  px-1 mt-2 cursor-pointer"
      // onMouseEnter={handleStart}
      // onMouseLeave={handleStop}
      // onTouchStart={handleStart}
      // onTouchEnd={handleStop}
      // onTouchCancel={handleStop}
    >
      <div className=" relative rounded-xl  xs:px-4 shadow-lg  overflow-hidden ">
        <div
          className="relative w-full h-70  hover:scale-105  "
          onClick={() => router.push(`/product/${product.id}`)}
        >
          <motion.img
            key="image"
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            initial={{ opacity: 1 }}
            animate={{ opacity: showVideo ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover "
          />
          {product.video && (
            <motion.video
              key="video"
              ref={videoRef}
              preload="none"
              src={product.video}
              muted
              loop={false}
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: showVideo ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover hover:scale-102 "
              onEnded={() => setShowVideo(false)}
            />
          )}

          <button
            className=" absolute top-2 right-2 rounded-full bg-white/70 p-1.5  shadow-sm"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`w-4 h-4 text-gray-700 ${
                isInWishlist(product.id) ? "fill-current text-red-500" : ""
              }`}
            />
          </button>
          <div
            className=" absolute bottom-2 right-2 flex gap-1 items-center justify-center rounded-full bg-white/30 px-1.5  shadow-sm"
            onClick={handleWishlistToggle}
          >
            {product.rating}
            <Star className={`w-4 h-4 text-yellow-400 fill-yellow-300 `} />
          </div>
        </div>
        <div
          className=" px-3 mt-1 flex flex-col "
          onClick={() => router.push(`/product/${product.id}`)}
        >
          <span className=" text-gray-800 text-sm font-medium truncate">
            {product.title}
          </span>
          <span className=" text-gray-400 text-sm font-medium truncate ">
            {product.brand}
          </span>
          <div className=" flex gap-2 items-center ">
            <div className=" text-gray-900 text-lg font-medium">
              ₹{product.sizes[0].price}
            </div>
            <span className=" text-gray-500 text-sm line-through ">
              ₹
              {Math.round(
                product.sizes[0].price +
                  (product.discount * product.sizes[0].price) / 100
              )}
            </span>
            <span className=" text-xs flex items-center justify-center text-green-500">
              {product.discount}%Off
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", ease: "easeIn" }}
          className="w-full px-2 my-2"
        >
          <button
            onClick={handleCartToggle}
            className="w-full flex gap-2 items-center justify-center  rounded-lg bg-red-600/70 text-white p-1.5 shadow-sm"
          >
            Add to Cart
            <ShoppingBag className="size-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
