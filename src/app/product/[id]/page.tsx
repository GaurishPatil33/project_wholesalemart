"use client";
import ProductList from "@/components/ProductList";
import {
  fetchProductByCategory,
  fetchProductById,
} from "@/lib/productfetching";
import { useCartStore } from "@/lib/store/cartStore";
import { useToast } from "@/lib/store/toast";
import { Product } from "@/lib/types";
import {
  Ban,
  BellIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShoppingCart,
  Star,
  ThumbsDown,
  ThumbsUp,
  Truck,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const params = useParams();
  //   const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = params.id?.toString();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<
    Product[]
  >([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const basePrice = product
    ? product?.price + (product?.price * product?.discount) / 100
    : 0;
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const getproduct = fetchProductById(id);
    if (getproduct) {
      setProduct(getproduct);
      const getRelateProduct = fetchProductByCategory(getproduct.category);
      setRelatedProducts(getRelateProduct);
    }
    setLoading(false);
  }, [id]);

  const nextImage = () => {
    if (product)
      setSelectedImage((prev) => (prev + 1) % product?.images?.length);
  };

  const prevImage = () => {
    if (product)
      setSelectedImage(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
  };

  const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
  const { showToast } = useToast();
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      showToast(`Added to Cart 🛒 ${quantity ? `Qty (${quantity})` : ""}`);
    }
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* product info */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4 flex items-center  flex-col px-2 ">
              <div className="w-full relative overflow-hidden rounded-tl-2xl rounded-br-2xl bg-white shadow-xl group">
                <img
                  src={product?.images[selectedImage]}
                  alt={product?.title}
                  className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                  // onClick={() => setShowImageModal(true)}
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImage + 1} / {product?.images.length}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product?.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg aspect-square transition-all duration-200 ${
                      selectedImage === index
                        ? "ring-2 ring-purple-500 scale-105"
                        : "hover:opacity-75 hover:scale-105"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 px-2">
              <div>
                <p className="text-black/60 font-medium text-sm uppercase tracking-wider mb-2">
                  {product.brand}
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.title}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} ({product.reviews.length.toString()}{" "}
                    reviews)
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{Math.round(product.price)}
                  </span>
                  {product.price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₹{Math.round(basePrice)}
                      </span>
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2 mb-6">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">
                    {product.availabilityStatus}
                  </span>
                  {/* <span className="text-gray-500">• SKU: {product.sku}</span> */}
                </div>
              </div>
              {/* quantity */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 transition-colors rounded-l-xl"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 font-semibold text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity > 9}
                      className="p-3 hover:bg-gray-50 transition-colors rounded-r-xl"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-lg text-gray-500">
                    Total:{" "}
                    <span className="font-semibold text-gray-900">
                      ₹{Math.round(basePrice * quantity)}
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

              {/*cart button */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-gradient-to-r from-[#900001]/90 to-[#900000]/60 text-white px-8 md:px-2 md:py-2 rounded-xl font-semibold text-sm hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  {product.stock === 0 ? (
                    <div className="flex items-center px-3 gap-1 ">
                      <BellIcon className=" h-5 w-5 " />
                      Notify
                    </div>
                  ) : (
                    <div className="flex items-center  px-3 gap-1">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </div>
                  )}
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isInWishlist(product.id)
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-gray-300 hover:border-gray-400 text-gray-600"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isInWishlist(product.id) ? "fill-current" : ""
                    }`}
                  />
                </button>
                <button className="p-4 rounded-xl border-2 border-gray-300 hover:border-gray-400 text-gray-600 transition-all">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* shipping,return and Warranty */}
              <div className="grid grid-cols-2  p-6  border-y border-r-gray-600">
                <div className="flex items-center justify-center space-x-3">
                  <Truck className="w-5 h-5 text-green-500" />
                  <div className="">
                    <p className="text-sm font-medium">Fast Delivery</p>
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
                    <p className="text-sm font-medium">
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
          <div className="px-2 mt-2 md:mt-5">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 justify-between px-6 md:px-10 items-center">
                {[
                  "description",
                  "specifications",
                  "reviews",
                  // "reviews (" + product.reviews.length + ")",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-semibold text-xs md:text-sm transition-colors capitalize ${
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

            <div className="py-6">
              {activeTab === "description" && (
                <div className="">
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4 pl-3">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === "specifications" && <div className=""></div>}

              {activeTab === "reviews" && (
                <div className=" space-y-8">
                  <div className="bg-white p-6 rounded-xl">
                    <div className="flex  justify-between mb-4 flex-col md:flex-row">
                      <h3 className="text-sm font-semibold">
                        Customer Reviews
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold">
                          {product.rating}
                        </span>
                        <span className="text-xs text-gray-600">
                          ({product.reviews.length} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="gap-3 mb-4 flex flex-col md:grid md:grid-cols-5 justify-between">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const total = product.reviews.length;
                        const count = product.reviews.filter(
                          (r) => r.rating === rating
                        ).length;
                        const percentage = Math.round(
                          total ? (count / total) * 100 : 0
                        );

                        return (
                          <div
                            className="flex items-center space-px-2 gap-1"
                            key={rating}
                          >
                            <span className="text-xs text-gray-600">
                              {rating}
                            </span>
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80%]">
                              <div
                                className={`bg-yellow-400 h-2 rounded-full `}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 ">
                              {percentage}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-5">
                    {product.reviews.map((review, i) => (
                      <div
                        key={i}
                        className="bg-white p-6 rounded-xl shadow-sm border-gray-100"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            {/* reviewers profile image */}
                            {/* <img
                              src={review.image}
                              alt={review.reviewerName}
                              className="w-10 h-10 rounded-full object-contain borders"
                            /> */}

                            <div className="">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-sm text-gray-900">
                                  {review.username}
                                </h4>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                  Verified Purchase
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-5 h-5 ${
                                        i < Math.floor(review.rating)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(review.date)
                                    .toLocaleDateString()
                                    .replaceAll("/", "-")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="font-medium text-xs text-gray-900">
                          {review.comment}
                        </div>

                        {/* for review images */}
                        {/* {review.images.length > 0 && (
                          <div className="flex space-x-2 mb-4">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                              />
                            ))}
                          </div>
                        )} */}

                        <div className="flex items-center justify-between mt-2 border-t-gray-500">
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                              <span className="text-xs">Helpful</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors">
                              <ThumbsDown className="h-4 w-4" />
                              <span className="text-xs">Not helpful</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* relatedProducts*/}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Similar Products
            </h3>
            {/* <div className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-4 p-2">
              {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
            {/* {relatedProducts
                ?.filter((r) => r.id !== product.id)
                .map((p) => (
                  <div key={p.id} className="min-w-44  ">
                    <Productcard product={p} />
                  </div>
                ))}
            </div> */}
            <ProductList products={relatedProducts} />
          </div>

          {/* sticky cart button for mobile View */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-gray-900">
                  ₹{Math.round(basePrice * quantity)}
                </p>
                <p className="text-sm text-gray-600">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="bg-gradient-to-r from-[#900001]/90 to-[#900000]/60 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
