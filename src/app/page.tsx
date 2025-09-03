"use client";
import CategoryList from "@/components/CategoryList";
import ImageBanner from "@/components/ImageBanner";
import ProductCard from "@/components/ProductCard";
import ProductList from "@/components/ProductList";
import { Categories, occasions } from "@/lib/data";
import { fetchAllProducts } from "@/lib/productfetching";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// Parent container animation (controls stagger effect)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }, // 👈 children animate one after another
  },
};

// Child card animation
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetch = () => fetchAllProducts();
    console.log(fetch);
    setProducts(fetch);
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-100 gap-6">
      <div className=""></div>
      <ImageBanner />

      {/* Shop by Category */}

      <CategoryList data={Categories} title="Shop by Category" />

      {/* Shop by Occasion */}
      <CategoryList data={occasions} title="Shop by Occasion" />

      {/* products */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="bg-white py-3 md:py-6 mx-auto px-2 md:px-6">
          {/* Section Title */}
          <motion.h2
            variants={fadeInUp}
            className="text-xl md:text-2xl font-bold text-center mb-3 md:mb-4 bg-gradient-to-r from-red-800 to-red-400 bg-clip-text text-transparent"
          >
            Customer Favourites
          </motion.h2>

          {/* <motion.div
            variants={containerVariants}
            className="flex items-center overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth"
          >
            {products.map((p) => (
              <motion.div
                key={p.id}
                variants={fadeInUp}
                className="relative snap-start h-fit max-w-50 flex-shrink-0 "
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div> */}
          <ProductList products={products}/>
        </div>
      </motion.section>
    </div>
  );
}
