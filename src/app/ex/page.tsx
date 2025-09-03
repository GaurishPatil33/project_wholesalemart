"use client";
import ProductCard from "@/components/ProductCard";
import { fetchAllProducts } from "@/lib/productfetching";
import { Product } from "@/lib/types";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetch = () => fetchAllProducts();
    console.log(fetch);
    setProducts(fetch);
  }, []);

  return (
    <>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-1">
        {products.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </>
  );
};

export default Page;
