"use client";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { fetchAllProducts } from "@/lib/productfetching";
import { useVideoStore } from "@/lib/store/videoStore";
import { Product } from "@/lib/types";
import { useState, useEffect } from "react";

const Page = () => {
  const [products1, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetch = () => fetchAllProducts();
    console.log(fetch);
    console.log(products);
    setProducts(products);
  }, []);

   const { activeIndex, setActiveIndex } = useVideoStore();

  // Auto switch videos every 4s
  // useEffect(() => {
  //   console.log(activeIndex)
  //   const timer = setInterval(() => {
  //     setActiveIndex((activeIndex + 1) % products.length);
  //   }, 4000);
  //   return () => clearInterval(timer);
  // }, [activeIndex, products.length, setActiveIndex]);


    // Auto switch videos every 4s
  useEffect(() => {
    if (products.length === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [products.length, setActiveIndex]);

  return (
    <>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-1">
        {products1.map((p, i) => (
          <ProductCard product={p} key={p.id} index={i} />
        ))}
      </div>
    </>
  );
};

export default Page;
