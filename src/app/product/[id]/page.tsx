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
import { motion, number } from "framer-motion";
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
import React, { useEffect, useMemo, useState } from "react";
import { AnimatedNumber } from "./components/AnimateNumber";

interface ProductConfig {
  color?: string;
  size?: string;
  price?: number;
  quantity: number;
}
interface ColorOptions {
  id: string;
  name: string;
  gradient: string;
  border: string;
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

  const moq = [
    {
      qty: 1,
      discount: product?.discount,
    },
    {
      qty: 5,
      discount: (product?.discount ?? 0) + 5,
    },
    {
      qty: 10,
      discount: (product?.discount ?? 0) + 10,
    },
    {
      qty: 25,
      discount: (product?.discount ?? 0) + 15,
    },
    {
      qty: 100,
      discount: (product?.discount ?? 0) + 20,
    },
  ];

  const basePrice = useMemo(() => {
    return product
      ? (selectedProductConfig.price ?? product.price) +
          ((selectedProductConfig.price ?? product.price) *
            (product.discount ?? 0)) /
            100
      : 0;
  }, [selectedProductConfig.price, product]);

  const currentDiscount = useMemo(() => {
    const tier = [...moq]
      .reverse()
      .find((t) => selectedProductConfig.quantity >= t.qty);
    return tier?.discount ?? product?.discount ?? 0;
  }, [selectedProductConfig.quantity, moq, product?.discount]);

  const finalPrice = useMemo(() => {
    const price = selectedProductConfig.price ?? product?.price ?? 0;
    return Math.round(price - (price * currentDiscount) / 100);
  }, [selectedProductConfig.price, currentDiscount, product?.price]);

  const totalPrice = useMemo(() => {
    return Math.round(finalPrice * selectedProductConfig.quantity);
  }, [finalPrice, selectedProductConfig.quantity]);

  const totalSavings = useMemo(() => {
    return Math.round(basePrice * selectedProductConfig.quantity - totalPrice);
  }, [basePrice, selectedProductConfig.quantity, totalPrice]);

  const colorOptions: ColorOptions[] = [
    {
      id: "Golden",
      name: "Golden",
      gradient:
        "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)",
      border: "#B8860B",
    },
    {
      id: "Silver",
      name: "Silver",
      gradient:
        "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)",
      border: "#808080",
    },
    {
      id: "Bronze",
      name: "Bronze",
      gradient:
        "linear-gradient(135deg, #CD7F32 0%, #B87333 50%, #8B4513 100%)",
      border: "#8B4513",
    },
    {
      id: "Rose Gold",
      name: "Rose Gold",
      gradient:
        "linear-gradient(135deg, #ECC5C0 0%, #E6A4B4 50%, #C9A0A0 100%)",
      border: "#B76E79",
    },
    {
      id: "Copper",
      name: "Copper",
      gradient:
        "linear-gradient(135deg, #B87333 0%, #C77826 50%, #8B4513 100%)",
      border: "#7D4A1E",
    },
    {
      id: "Black",
      name: "Black",
      gradient:
        "linear-gradient(135deg, #2C2C2C 0%, #000000 50%, #1A1A1A 100%)",
      border: "#000000",
    },
    {
      id: "White",
      name: "White",
      gradient:
        "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #E8E8E8 100%)",
      border: "#D3D3D3",
    },
    {
      id: "Red",
      name: "Red",
      gradient:
        "linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 50%, #C92A2A 100%)",
      border: "#A61E4D",
    },
    {
      id: "Blue",
      name: "Blue",
      gradient:
        "linear-gradient(135deg, #4DABF7 0%, #339AF0 50%, #1971C2 100%)",
      border: "#1864AB",
    },
    {
      id: "Green",
      name: "Green",
      gradient:
        "linear-gradient(135deg, #51CF66 0%, #40C057 50%, #2F9E44 100%)",
      border: "#2B8A3E",
    },
    {
      id: "Brown",
      name: "Brown",
      gradient:
        "linear-gradient(135deg, #A0522D 0%, #8B4513 50%, #654321 100%)",
      border: "#5D3A1A",
    },
    {
      id: "Gray",
      name: "Gray",
      gradient:
        "linear-gradient(135deg, #ADB5BD 0%, #868E96 50%, #495057 100%)",
      border: "#343A40",
    },
  ];

  // Filter color options to only show colors that the product has
  const availableColors = useMemo<ColorOptions[]>(() => {
    if (!product?.colors || product.colors.length === 0) {
      return [];
    }

    // Match product colors with predefined options
    const matched = colorOptions.filter((option) =>
      product.colors.some(
        (productColor) => productColor.toLowerCase() === option.id.toLowerCase()
      )
    );

    // If no matches found, create generic color options from product colors
    if (matched.length === 0) {
      return product.colors.map((color) => ({
        id: color,
        name: color,
        gradient: `linear-gradient(135deg, ${getColorHex(
          color
        )} 0%, ${getColorHex(color)} 100%)`,
        border: getColorHex(color),
      }));
    }

    return matched;
  }, [product?.colors]);

  // Helper function to get hex color from color name
  const getColorHex = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      golden: "#FFD700",
      silver: "#C0C0C0",
      bronze: "#CD7F32",
      "rose gold": "#E6A4B4",
      copper: "#B87333",
      black: "#000000",
      white: "#FFFFFF",
      red: "#FF0000",
      blue: "#0000FF",
      green: "#00FF00",
      brown: "#8B4513",
      gray: "#808080",
      grey: "#808080",
      yellow: "#FFFF00",
      pink: "#FFC0CB",
      purple: "#800080",
      orange: "#FFA500",
    };
    return colorMap[colorName.toLowerCase()] || "#CCCCCC";
  };

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

  console.log(basePrice > finalPrice, basePrice, finalPrice);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-1">
        {/* product info */}
        <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8 py-2 md:py-8 bg-white">
          <div className=" w-full flex  md:gap-3 flex-col md:flex-row justify-between">
            {/* Product Images */}

            <div className="md:sticky md:top-12 self-start flex items-center md:max-w-[50%] lg:w-[40%] xl:w-[30%] w-full flex-col px-2 ">
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
                  <span className="text-2xl  font-bold text-gray-900 ">
                    ₹{Math.round(finalPrice)}
                  </span>
                  {basePrice > finalPrice && (
                    <span className="text-lg text-gray-500 h-full  line-through">
                      ₹{Math.round(basePrice)}
                    </span>
                  )}
                  {currentDiscount > 0 && (
                    <span className="bg-gradient-to-r h-fit from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs  font-medium">
                      {currentDiscount}% OFF
                    </span>
                  )}
                </div>
                {/* {totalSavings > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    You save ₹{totalSavings}
                  </motion.div>
                )} */}

                <div className="flex items-center space-x-2 mb-1 md:mb-4">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">
                    {product.availabilityStatus}
                  </span>
                  {/* <span className="text-gray-500">• SKU: {product.sku}</span> */}
                </div>
              </div>
              {/* product.colors && sizes */}
              {availableColors.length > 0 && (
                <div className="w-full  ">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Color: <span>{selectedProductConfig.color}</span>
                  </h3>
                  <div className="flex flex-wrap  gap-3">
                    {availableColors.map((color) => (
                      <motion.button
                        key={color.id}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSelectedProductConfig((prev) => ({
                            ...prev,
                            color: color.id,
                          }))
                        }
                        className={`relative rounded-xl min-w-20 max-w-30 overflow-hidden transition-all ${
                          selectedProductConfig.color === color.id
                            ? "ring-4 ring-red-500/70 ring-offset-2 shadow-lg"
                            : "ring-2 ring-gray-200 hover:ring-red-300"
                        }`}
                      >
                        <div
                          className="h-8 w-full"
                          style={{
                            background: color.gradient,
                            borderBottom: `2px solid ${color.border}`,
                          }}
                        />
                        <div className="py-2 px-2 bg-white">
                          <p className="text-[9px] font-semibold text-gray-700 truncate">
                            {color.name}
                          </p>
                        </div>
                        {/* {selectedProductConfig.color === color.id && (
                          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                            <Check className="size-3 text-gray-600" />
                          </div>
                        )} */}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
              <div className="w-full mb-3 ">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Size:{" "}
                  <span className="text-gray-700">
                    {selectedProductConfig.size}
                  </span>
                </h3>
                <div className="gird grid-cols-3 space-x-3 space-y-2">
                  {product.sizes.map((opt, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleSizeSelect(opt.size, opt.price)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2  rounded-xl border-2 transition-all  ${
                        selectedProductConfig.size === opt.size
                          ? "border-red-600/50 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                      }`}
                    >
                      <div className="md:flex items-center justify-center gap-2">
                        <div className="font-semibold text-gray-900">
                          {opt.size}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          ₹{opt.price}
                        </div>
                      </div>
                    </motion.button>
                  ))}
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
                      max={product.stock}
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
                      disabled={selectedProductConfig.quantity >= product.stock}
                      className="p-3 hover:bg-gray-50 transition-colors rounded-r-xl"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className=" flex gap-2 text-lg md:text-lg text-gray-500">
                    Total:{" "}
                    <span className="font-semibold text-gray-900 flex">
                      ₹
                      <AnimatedNumber value={totalPrice} />
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
              {/* bulk selections */}
              <div className="">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Buy more, Save more
                </h3>
                <div className="grid lg:grid-cols-2 gap-2">
                  {moq.map((m, i) => {
                    const price =
                      selectedProductConfig.price ?? product?.price ?? 0;
                    const tierFinalPrice = Math.round(
                      price - (price * (m.discount ?? 0)) / 100
                    );

                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 1.02 }}
                        onClick={() => {
                          handleQtyChange(m.qty);
                        }}
                        disabled={m.qty > product.stock}
                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedProductConfig.quantity === m.qty
                            ? "border-red-600 bg-red-50 shadow-md"
                            : "border-gray-200 bg-gray-50 hover:border-red-300 hover:bg-purple-50/50"
                        } ${m.qty > product.stock && "hidden"}`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="flex gap-3">
                            <div className="text-left">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900">
                                  Purchase
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                Min. {m.qty} pieces
                              </p>
                            </div>
                            {(m.discount ?? currentDiscount) > 0 && (
                              <span className="bg-red-500/90 text-white text-xs px-2 py-1 h-fit rounded-full">
                                Save {m.discount}%
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-red-400">
                              ₹{tierFinalPrice}
                            </div>
                            <div className="text-xs text-gray-500">
                              per piece
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                {totalSavings > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 mt-3"
                  >
                    You will save ₹{totalSavings}
                  </motion.div>
                )}
              </div>
              {/*cart button */}
              <div className=" flex  space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1  text-red-600/70 ring-red-400 ring-1  md:px-2 py-2 rounded-xl font-semibold text-sm  transition-all duration-300 transform hover:scale-105  flex items-center justify-center space-x-2"
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
                  className="flex-1 bg-gradient-to-r from-red-600/90 to-red-600/60 text-white ring-1   md:px-2 py-2 rounded-xl font-semibold text-sm  transition-all duration-300 transform hover:scale-105  flex items-center justify-center space-x-2"
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
                <p className="text-sm font-bold text-gray-900">₹{finalPrice}</p>
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
