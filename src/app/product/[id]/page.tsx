"use client";
import { ProductList } from "@/components/ProductList";
import ProductMediaCorousal from "@/components/ProductMediaCorousal";
import Reviews from "@/components/Reviews";
import { useShare } from "@/lib/hooks/helperFunctions";
import {
  fetchProductByCategory,
  fetchProductById,
} from "@/lib/productfetching";
import { useCartStore } from "@/lib/store/cartStore";
import { useToast } from "@/lib/store/toast";
import { Product } from "@/lib/types";
import { number } from "framer-motion";
import {
  Ban,
  BellIcon,
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatedNumber } from "./components/AnimateNumber";

interface ProductConfig {
  color?: string;
  size?: string;
  price?: number;
  quantity: number;
}

const ProductPage = () => {
  const params = useParams();
  //   const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = params.id?.toString();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedProductConfig, setSelectedProductConfig] =
    useState<ProductConfig>({
      color: product?.colors[0] || "",
      size: product?.sizes[0].size || "",
      price: product?.sizes[0].price ?? product?.price ?? 0,
      quantity: 1,
    });
  const basePrice = product
    ? (selectedProductConfig.price ?? product.price) +
      ((selectedProductConfig.price ?? product.price) *
        (product.discount ?? 0)) /
        100
    : 0;

  const [activeTab, setActiveTab] = useState("description");
  const router = useRouter();
  const share = useShare();

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        setLoading(true);
        const getproduct = await fetchProductById(id);
        console.log();
        if (getproduct) {
          setProduct(getproduct);
          setSelectedProductConfig({
            color: getproduct.colors[0],
            size: getproduct.sizes[0].size,
            price: getproduct.sizes[0].price,
            quantity: 1,
          });
          const getRelateProduct = await fetchProductByCategory(
            getproduct.category
          );
          setRelatedProducts(getRelateProduct);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        console.log(selectedProductConfig);
      }
    };
    fetch();
  }, [id]);

  // const nextImage = () => {
  //   if (product)
  //     setSelectedImage((prev) => (prev + 1) % product?.images?.length);
  // };

  // const prevImage = () => {
  //   if (product)
  //     setSelectedImage(
  //       (prev) => (prev - 1 + product.images.length) % product.images.length
  //     );
  // };

  // Handle color change
  const handleColorSelect = (color: string) => {
    setSelectedProductConfig((prev) => ({
      ...prev,
      color: color,
    }));
  };

  // Handle size selection
  const handleSizeSelect = (size: string, price: number) => {
    setSelectedProductConfig((prev) => ({
      ...prev,
      size: size,
      price: price,
    }));
  };

  // Handle quantity change
  const handleQtyChange = (qty: number) => {
    setSelectedProductConfig((prev) => ({
      ...prev,
      quantity: qty,
    }));
  };

  const { addToCart, toggleWishlist, isInWishlist, buyNow, isInCart } =
    useCartStore();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    if (!product) return;

    const alreadyInCart = isInCart(product.id);

    if (alreadyInCart) {
      showToast("Product already in your Cart 🛒");
    } else {
      addToCart(product, selectedProductConfig);
      showToast(
        `Added to Cart 🛒 ${
          selectedProductConfig.quantity ? `Qty (${quantity})` : ""
        }`
      );
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    const alreadyInWishlist = isInWishlist(product.id);
    toggleWishlist(product);
    showToast(
      alreadyInWishlist ? "Removed from Wishlist 💔" : "Added to Wishlist ❤️"
    );
  };

  const handleBuyNow = () => {
    if (!product) return;
    buyNow(product, selectedProductConfig);
    router.push(`/checkout`);
  };

  // const handleCartToggle = () => {
  //   if (isInCart(product.id)) {
  //     showToast("Removed from Cart 🛒");
  //     removeFromCart(product.id);
  //   } else {
  //     showToast("Added to Cart 🛒");
  //     addToCart(product);
  //   }
  // };

  if (loading) return <div className=" text-center mt10">Loading...</div>;

  if (!product)
    return <div className="text-center mt-10">Product not found</div>;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-1">
        {/* product info */}
        <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8 py-2 md:py-8 bg-white">
          <div className=" w-full flex  md:gap-3 flex-col md:flex-row justify-between">
            {/* Product Images */}

            <div className=" flex items-center md:max-w-[50%] lg:w-[40%] xl:w-[30%] w-full   flex-col px-2 ">
              <ProductMediaCorousal product={product} />
            </div>

            {/* Product Info */}
            <div className="space-y-2 w-full md:space-y-6 px-2 mt-2 md:mt-5">
              <div>
                <p className="text-black/60 font-medium text-sm uppercase tracking-wider mb-2">
                  {product.brand}
                </p>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4 leading-tight">
                  {product.title}
                </h1>
                <div className=" flex justify-between items-center">
                  <div className="flex items-center space-x-4 mb-1 md:mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3 md:size-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-xs md:text-sm">
                      {product.rating} ({product.reviews.length.toString()}{" "}
                      reviews)
                    </span>
                  </div>
                  <div className=" flex justify-between gap-3">
                    <button
                      onClick={handleWishlistToggle}
                      className={` ${
                        isInWishlist(product.id)
                          ? " text-red-500"
                          : " text-gray-600"
                      }`}
                    >
                      <Heart
                        className={`size-5 ${
                          isInWishlist(product.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => {
                        share(
                          product.title,
                          `/product/${product.id}`,
                          "check out this product!"
                        );
                      }}
                      className=" "
                    >
                      <Share2 className="size-4 md:size-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-1.5 md:mb-6">
                  <span className="text-xl  font-bold text-gray-900">
                    ₹{Math.round(selectedProductConfig.price || product.price)}
                  </span>
                  {product.price && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{Math.round(basePrice)}
                      </span>
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs  font-medium">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2 mb-1 md:mb-4">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">
                    {product.availabilityStatus}
                  </span>
                  {/* <span className="text-gray-500">• SKU: {product.sku}</span> */}
                </div>
              </div>
              {/* quantity */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white shadow-sm">
                    <button
                      onClick={() =>
                        handleQtyChange(selectedProductConfig.quantity - 1)
                      }
                      disabled={selectedProductConfig.quantity <= 1}
                      className="p-3 hover:bg-gray-50 transition-colors rounded-l-xl"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    {/* <span className="md:px-6 p-2 px-3 font-semibold text-sm">
                      {quantity}
                    </span> */}
                    <input
                      type="text"
                      name=""
                      id=""
                      min={1}
                      max={10}
                      className="w-8 px-1 text-center"
                      onChange={(e) => {
                        const value = Math.max(
                          1,
                          Math.min(10, Number(e.target.value) || 0)
                        );
                        handleQtyChange(value);
                      }}
                      value={selectedProductConfig.quantity}
                      // disabled={
                      //   selectedProductConfig.quantity > 10 ||
                      //   selectedProductConfig.quantity < 2
                      // }
                    />
                    <button
                      onClick={() =>
                        handleQtyChange(selectedProductConfig.quantity + 1)
                      }
                      disabled={selectedProductConfig.quantity >= 10}
                      className="p-3 hover:bg-gray-50 transition-colors rounded-r-xl"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className=" flex gap-2 text-lg md:text-lg text-gray-500">
                    Total:{" "}
                    <span className="font-semibold text-gray-900 flex">
                      ₹
                      <AnimatedNumber
                        value={
                          (selectedProductConfig.price || product.price) *
                          selectedProductConfig.quantity
                        }
                      />
                    </span>
                  </span>
                </div>

                {product.stock < 10 && product.stock > 0 && (
                  <div className="text-sm mt-1 ">
                    Only
                    <span className="text-orange-500"> {product.stock} </span>
                    left! dont miss it !
                  </div>
                )}
              </div>

              {/* product.colors && sizes */}
              <div className="w-full  ">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Color
                </h3>
                <div className="flex gap-2">
                  {product.colors.map((clr, i) => (
                    <button
                      key={i}
                      onClick={() => handleColorSelect(clr)}
                      className={`h-8 w-8 rounded-full border shadow cursor-pointer flex items-center justify-center ${
                        selectedProductConfig.color === clr
                          ? "border-2 border-white scale-110 ring ring-black"
                          : ""
                      } bg-${clr.toLowerCase()}-100 [bg-color:${clr}]`}
                      style={{ backgroundColor: clr }}
                      title={clr}
                    >
                      {/* {selectedProductConfig.color === clr && (
                        <div className="">{clr}</div>
                      )} */}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full mb-3 ">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSizeSelect(opt.size, opt.price)}
                      className={`px-3 py-1 border rounded-lg text-sm font-medium hover:bg-gray-100
                        ${
                          selectedProductConfig.size === opt.size
                            ? "border-2 border-white scale-102 ring ring-black"
                            : ""
                        }`}
                    >
                      {opt.size} - ₹{opt.price}
                    </button>
                  ))}
                </div>
              </div>

              {/*cart button */}
              <div className=" flex  space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1  text-primary ring-[#900] ring-1  md:px-2 py-2 rounded-xl font-semibold text-sm  transition-all duration-300 transform hover:scale-105  flex items-center justify-center space-x-2"
                >
                  {product.stock === 0 ? (
                    <div className="flex items-center md:px-3 gap-1 ">
                      <BellIcon className="size-5 " />
                      Notify
                    </div>
                  ) : (
                    <div className="flex items-center  md:px-3 gap-1">
                      <ShoppingCart className="size-5" />
                      Add to Cart
                    </div>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 bg-gradient-to-r from-[#900001]/90 to-[#900000]/60 text-white ring-1   md:px-2 py-2 rounded-xl font-semibold text-sm  transition-all duration-300 transform hover:scale-105  flex items-center justify-center space-x-2"
                >
                  Buy Now
                </button>
              </div>

              {/* shipping,return and Warranty */}
              <div className="grid grid-cols-2  p-2 md:p-6   border-y border-gray-400">
                <div className="flex items-center justify-center space-x-3">
                  <Truck className="w-5 h-5 text-green-500" />
                  <div className="">
                    <p className="text-xs font-semibold">Fast Delivery</p>
                    <p className="text-xs text-gray-500">
                      {product.shippingInformation}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  {product.returnPolicy === "No return policy" ? (
                    <Ban size={20} className="text-blue-600" />
                  ) : (
                    <RotateCcw size={20} className="text-blue-600" />
                  )}
                  <div>
                    <p className="text-xs font-semibold">
                      {product.returnPolicy === "No return policy"
                        ? "No Returns"
                        : "Easy Returns"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.returnPolicy}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <Shield size={20} className="text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Warranty</p>
                    <p className="text-xs text-gray-500">
                      {product.warrantyInformation}
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* info tabs */}
          <div className="bg-white py-2 mt-2 px-3 md:px-6 md:py-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 ">
              Product Information
            </h3>
            <div className="flex flex-col md:flex-row space-x-2">
              <div className="border-b md:border-0 md:border-r border-gray-200 ">
                <nav className="flex justify-between  md:flex-col  items-center">
                  {[
                    "description",
                    "specifications",
                    // "reviews",
                    // "reviews (" + product.reviews.length + ")",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`md:py-3 w-full p-2 flex items-center justify-center border-b-2 font-semibold text-xs md:text-sm transition-colors capitalize ${
                        activeTab === tab
                          ? "border-[primary] font-semibold text-primary"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="md:py-2 bg-white w-full max-w-200">
                {activeTab === "description" && (
                  <div className="">
                    <p className="mt-1 text-xs md:text-sm text-gray-700 leading-relaxed mb-4 pl-3">
                      {product.description}
                    </p>
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div className=" grid grid-cols-1 sm:grid-cols-2 text-sm px-2 ">
                    {Object.entries(product.product_specs).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between border-b border-[#900000]/40  bg-[#900001]/10 "
                      >
                        <span className=" px-2  font-medium w-[50%] h-full py-1 bg-white ">
                          {key}
                        </span>
                        <span className=" text-gray-800 text-left w-full h-full px-1">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* {activeTab === "reviews" && <Reviews product={product} />} */}
              </div>
            </div>
          </div>

          {/* reviews */}
          <div className=" mt-2 md:mt-5">
            <Reviews product={product} />
          </div>

          {/* relatedProducts*/}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 ">
              Similar Products
            </h3>

            <ProductList products={relatedProducts} />
          </div>

          {/* sticky cart button for mobile View */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 py-2  md:hidden z-10">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  ₹{Math.round(product.price * quantity)}
                </p>
                <p className="text-xs text-gray-600">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              {/*cart button */}
              <div className="flex gap-2 w-[80%]">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1  text-primary ring-[#900] ring-1  md:px-2 py-2 rounded-xl font-semibold text-sm  transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  {product.stock === 0 ? (
                    <div className="flex items-center md:px-3 gap-1  text-xs">
                      <BellIcon className="size-5 " />
                      Notify
                    </div>
                  ) : (
                    <div className="flex items-center  md:px-3 gap-1 text-xs">
                      <ShoppingCart className="size-5" />
                      Add to Cart
                    </div>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 bg-gradient-to-r from-[#900001]/90 to-[#900000]/60 text-white ring-1   md:px-2 py-2 rounded-xl font-semibold text-sm  transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
