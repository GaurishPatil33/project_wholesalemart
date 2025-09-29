"use client";
import CategoryList from "@/components/CategoryList";
import CategoryStories from "@/components/CategoryStories";
import FeatureStrip from "@/components/FeaturesStrip";
import ImageBanner from "@/components/ImageBanner";
import ProductList from "@/components/ProductList";
import { Categories, occasions } from "@/lib/data";
import { fetchAllProducts } from "@/lib/productfetching";
import { Product } from "@/lib/types";
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

  const sarees = products.filter((s) => s.category === "sarees");
  const kurtas = products.filter((s) => s.category === "kurtas");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const fetch = () => fetchAllProducts();
    console.log(fetch);
    setProducts(fetch);
  }, []);

  return (
    <div className="flex flex-col h-full pt-4 gap-3 md:gap-6">
      <div className="">
        {" "}
        <CategoryStories />
      </div>
      <ImageBanner />

      <FeatureStrip />

      {/* Shop by Category */}
      <CategoryList
        data={Categories}
        title="Shop by Category"
        displayType={isMobile ? "grid" : "slider"}
      />

      {/* Shop by Occasion */}
      <CategoryList
        data={occasions}
        title="Shop by Occasion"
        displayType="slider"
      />

      {/* products */}
      <ProductList products={sarees} title="Best Seller - Sarees" />
      <ProductList products={kurtas} title="Best Seller - Kurtas/Salwars" />
    </div>
  );
}
