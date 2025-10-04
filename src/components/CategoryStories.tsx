"use client";

import { useShare } from "@/lib/hooks/helperFunctions";
import { fetchCategories, fetchProductByCategory } from "@/lib/productfetching";
import { Product } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {  FaTelegramPlane } from "react-icons/fa";

interface Category {
  title: string;
  slug: string;
  image: string;
}

const CategoryStories = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [duration, setDuration] = useState(7); // default for images
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();
  const share = useShare();
  /** ───── Fetch Categories ───── */
  useEffect(() => {
    const fetch = async () => {
      try {
        const cat = await fetchCategories();
        setCategories(cat);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  /** ───── Fetch Products by Category ───── */
  useEffect(() => {
    const fetch = async () => {
      try {
        if (selectedCategory) {
          const product = await fetchProductByCategory(selectedCategory.slug);
          setProducts(product.slice(1, 5));
          console.log(product);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [selectedCategory]);

  /** ───── Show preview image 2s before video ───── */
  useEffect(() => {
    setShowVideo(false);

    if (products[currentProductIndex]?.video) {
      const timer = setTimeout(() => setShowVideo(true), 1100);
      return () => clearTimeout(timer);
    }
  }, [currentProductIndex, products]);

  /** ───── Auto progression ───── */
  useEffect(() => {
    if (!selectedCategory || products.length === 0) return;

    let timer: NodeJS.Timeout;
    const current = products[currentProductIndex];

    if (current?.video) {
      // always 8s max for videos
      setDuration(8);
      if (showVideo) {
        timer = setTimeout(() => nextProduct(), 8000);
      }
    } else {
      // fallback for images
      setDuration(7);
      timer = setTimeout(() => nextProduct(), 7000);
    }

    return () => clearTimeout(timer);
  }, [selectedCategory, products, currentProductIndex, showVideo]);

  /** ───── Prevent background scroll on modal ───── */
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCategory]);

  /** ───── Escape key closes modal ───── */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /** ───── Controls ───── */
  const handleHoldStart = () => videoRef.current?.pause();
  const handleHoldEnd = () => videoRef.current?.play();

  const openModal = (cat: Category) => {
    setSelectedCategory(cat);
    setCurrentProductIndex(0);
  };
  const closeModal = () => {
    setSelectedCategory(undefined);
    setCurrentProductIndex(0);
  };
  const nextProduct = () =>
    setCurrentProductIndex((prev) =>
      prev < products.length - 1 ? prev + 1 : 0
    );
  const prevProduct = () =>
    setCurrentProductIndex((prev) =>
      prev > 0 ? prev - 1 : products.length - 1
    );

  return (
    <div className="w-full pt-2 md:py-4 bg-gradient-to-b from-[#900002]/5 to-[#900001]/20 -mb-5">
      {/* heading */}
      <div className="w-full px-4">
        <h2 className="text-md md:text-lg font-semibold bg-gradient-to-r from-red-800 to-red-400 bg-clip-text text-transparent">
          Discover our trending products{" "}
        </h2>
      </div>

      {/* categories */}
      <div className="max-w-6xl px-4 py-2 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-3 ">
          {categories?.map((cat, i) => (
            <motion.div
              key={cat.slug}
              onClick={() => openModal(cat)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 cursor-pointer"
            >
              <div className="relative size-16 rounded-full overflow-hidden shadow-lg">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 w-full h-full" />
              </div>
              <div className="text-[11px] font-medium text-[#900001] text-center max-w-20 truncate">
                {cat.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {selectedCategory && products.length > 0 && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative md:rounded  h-full w-screen md:h-[600px] md:w-[400px]  bg-black  overflow-hidden "
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* top overlay */}
              <div className=" absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent">
                {/* progress bars */}
                <div className="flex space-x-1 py-0.5">
                  {products.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 bg-gray-200 overflow-hidden"
                    >
                      {i === currentProductIndex && (
                        <motion.div
                          key={i + "-active"}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration, ease: "linear" }}
                          className="h-full bg-[#900001]/80"
                        />
                      )}
                      {i < currentProductIndex && (
                        <div className="h-full w-full bg-[#900001]/60" />
                      )}
                    </div>
                  ))}
                </div>
                {/* header */}
                <div className=" flex items-center justify-between px-4 pt-2">
                  <div className="flex gap-4 justify-between items-center  py-1">
                    {/* <div className="size-12  rounded-full overflow-hidden border-spacing-1.5 border border-[#900001]">
                      <img
                        src={selectedCategory.image}
                        alt={selectedCategory.title}
                        className="w-full h-full  object-cover"
                      />
                    </div> */}
                    <h3 className="font-semibold text-2xl bg-gradient-to-r from-[#900001]/90 to-[#900001]/70 text-transparent bg-clip-text">
                      {selectedCategory.title}
                    </h3>
                  </div>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={closeModal}
                    aria-label="Close"
                  >
                    <X className="size-5 text-white" />
                  </button>
                </div>
              </div>

              {/* product content */}
              <div className="absolute  top-0 overflow-y-hidden h-full w-full flex items-center justify-center scrollbar-hide bg-black/30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProductIndex}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full h-full  flex items-center  justify-center bg-black/30 backdrop-blur-2xl"
                  >
                    {products[currentProductIndex]?.video && showVideo ? (
                      <motion.video
                        ref={videoRef}
                        src={products[currentProductIndex].video}
                        autoPlay
                        muted
                        playsInline
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className=" w-full h-full object-cover"
                      />
                    ) : (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        src={products[currentProductIndex].images[1]}
                        className=" w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* nav buttons */}
              {products.length > 1 && (
                <>
                  {currentProductIndex > 0 && (
                    <button
                      onClick={prevProduct}
                      className="z-20 absolute left-2 top-1/2 -translate-y-1/2 size-9 bg-white/50 rounded-full flex items-center justify-center shadow-lg hover:bg-white/80 transition-colors"
                      aria-label="Previous product"
                    >
                      <ChevronLeft className="size-5 text-gray-700" />
                    </button>
                  )}
                  {currentProductIndex < products.length - 1 && (
                    <button
                      onClick={nextProduct}
                      className="z-20 absolute right-2 top-1/2 -translate-y-1/2 size-9 bg-white/50 rounded-full flex items-center justify-center shadow-lg hover:bg-white/80 transition-colors"
                      aria-label="Next product"
                    >
                      <ChevronRight className="size-5 text-gray-700" />
                    </button>
                  )}
                </>
              )}

              {/* product info overlay */}
              <div
                className="absolute top-2/3 bottom-0 left-0 right-0 
                bg-gradient-to-t from-black/90 via-black/70 to-transparent 
                px-3 py-4 flex flex-col gap-2 justify-end"
              >
                {/* share btn */}
                <div className=" w-full flex justify-end">
                  <button
                    onClick={() => {
                      const product = products[currentProductIndex];

                      share(
                        product.title,
                        `/product/${product.id}`,
                        "check out this product!"
                      );
                    }}
                    className="flex items-center justify-between gap-1 bg-black/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded-full transition-colors"
                  >
                    <FaTelegramPlane />
                    Share
                  </button>
                </div>
                <div className="flex justify-between gap-2 mb-2">
                  <div className="text-white/90 text-md font-medium line-clamp-2">
                    {products[currentProductIndex]?.title}
                  </div>
                  <div className="flex text-white/80 text-xs gap-1 items-center">
                    {products[currentProductIndex]?.rating}
                    <Star className="size-3.5 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="flex justify-between items-center px-2">
                  <div className="text-white/80 font-semibold">
                    ₹ {products[currentProductIndex]?.price}
                  </div>

                  <button
                    onClick={() =>
                      router.push(
                        `/product/${products[currentProductIndex]?.id}`
                      )
                    }
                    className="bg-[#900001]/30 ring ring-white/70 hover:bg-[#900001]/90 
                    text-white text-sm font-medium px-5 py-1 
                    rounded-full transition-colors"
                  >
                    View Product
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryStories;
