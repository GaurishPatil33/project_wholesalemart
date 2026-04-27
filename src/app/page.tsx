"use client";
import { CategoryList, CategoryListType2 } from "@/components/CategoryList";
import CategoryStories from "@/components/CategoryStories";
import FeatureStrip from "@/components/FeaturesStrip";
import ImageBanner from "@/components/ImageBanner";
import { ProductList, ProductsGrid } from "@/components/ProductList";
import { Categories, Products } from "@/lib/data";
// import { Categories, data1 } from "@/lib/data";
import { fetchAllProducts, fetchCategories } from "@/lib/productfetching";
import { Product } from "@/lib/types";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  // const sarees = products.filter((s) => s.category === "sarees");
  // const kurtas = products.filter((s) => s.category === "kurtas");
  // const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const fetch = () => fetchAllProducts();
    const fetchCategory = () => fetchCategories();
    console.log("fetch", fetch);
    console.log("fetch", fetchCategory);
    setProducts(Products);
  }, []);
  useEffect(() => {
    const fetchproducts = async () => {
      try {
        // const cat = await fetchCategories();
        const pro = await fetchAllProducts();
        setProducts(pro);
        console.log("pro", pro);
        // setCategories(cat)
      } catch (error) {
        console.error("Error :", error);
      }
    };

    fetchproducts();
  }, []);

  return (
    <div className="flex flex-col h-full  gap-3 md:gap-6">
      <div className="">
        <CategoryStories />
      </div>
      <ImageBanner />

      <FeatureStrip />

      {/* Shop by Category */}
      <div className="">
        <div className="hidden md:block w-full h-fit shadow-md -mb-3">
          <img src="/cat-banner/category.png" alt="" />
        </div>
        <div className="md:hidden w-full h-fit shadow-md -mb-3">
          <img src="/cat-banner/categorymob.png" alt="" />
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

      <ProductList
        products={products.sort(() => Math.random() - 0.5).slice(0, 10)}
        title="New Arriwals"
      />

      <CategoryListType2
        data={
          Categories.find((cat) => cat.slug === "wall_art")?.subCategories || []
        }
        title="Photo frames"
        displayType="slider"
      />
      
      <ProductList
        products={products.sort(() => Math.random() - 0.5).slice(0, 30)}
        title="Deal's of the day"
      />

      <ProductsGrid
        products={products.sort(() => Math.random() - 0.5).slice(0, 30)}
        title="Check our other products"
      />

      {/* <ProductList products={kurtas} title="Best Seller - Kurtas/Salwars" /> */}
    </div>
  );
}
