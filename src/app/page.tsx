"use client";
import { CategoryList, CategoryListType2 } from "@/components/CategoryList";
import CategoryStories from "@/components/CategoryStories";
import FeatureStrip from "@/components/FeaturesStrip";
import ImageBanner from "@/components/ImageBanner";
import { ProductList } from "@/components/ProductList";
import { Categories, Products } from "@/lib/data";
// import { Categories, data1 } from "@/lib/data";
import { fetchAllProducts, fetchCategories } from "@/lib/productfetching";
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

  // const sarees = products.filter((s) => s.category === "sarees");
  // const kurtas = products.filter((s) => s.category === "kurtas");
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState();
  // const isMobile = window.innerWidth < 768;
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const fetch = () => fetchAllProducts();
    const fetchCategory = () => fetchCategories();
    console.log("fetch", fetch);
    console.log("fetch", fetchCategory);
    setProducts(Products);
  }, []);

  return (
    <div className="flex flex-col h-full  gap-3 md:gap-6">
      <div className="">
        {" "}
        <CategoryStories />
      </div>
      <ImageBanner />

      <FeatureStrip />

      {/* Shop by Category */}
      <div className="">
        <div className="w-full h-fit shadow-md -mb-3">
          <img src="/cat-banner/category.png" alt="" />
        </div>
        <CategoryList
          data={Categories}
          // title="Shop by Category"
          displayType={"grid"}
        />
        {/* <CategoryList
          data={Categories}
          // title="Shop by Category"
          displayType={"grid"}
        /> */}
      </div>

      <ProductList products={products} title="New Arriwals" />

      <CategoryListType2
        data={
          Categories.find((cat) => cat.slug === "wall_art")?.subCategories || []
        }
        title="Photo frames"
        displayType="slider"
      />

      {/* products */}
      {/* <ProductList products={kurtas} title="Best Seller - Kurtas/Salwars" /> */}
    {products.map((p,i)=>(
      <div className="">{p.id} "{i}</div>
    ))}
    </div>
  );
}
