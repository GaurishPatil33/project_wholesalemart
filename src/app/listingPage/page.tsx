"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  video: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isHovered) {
      timer = setTimeout(() => {
        setShowVideo(true);
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 2000);
    } else {
      setShowVideo(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isHovered]);

  const cardVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image/Video Container */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <AnimatePresence mode="wait">
          {showVideo ? (
            <motion.video
              key="video"
              ref={videoRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
            >
              <source src={product.video} type="video/mp4" />
            </motion.video>
          ) : (
            <motion.img
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          )}
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              NEW
            </span>
          )}
          {product.isSale && discount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
        >
          <Heart 
            size={18} 
            className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`}
          />
        </motion.button>

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-0 bg-black/20 flex items-center justify-center"
            >
              <motion.div
                variants={buttonVariants}
                className="flex gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Eye size={20} className="text-gray-700" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ShoppingCart size={20} className="text-white" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wide">
          {product.category}
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProductListingPage: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones with Noise Cancellation",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.5,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      category: "Electronics",
      isNew: true,
      isSale: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch with Health Monitoring",
      price: 299.99,
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      category: "Wearables"
    },
    {
      id: 3,
      name: "Professional Camera Lens 85mm f/1.4",
      price: 899.99,
      originalPrice: 999.99,
      rating: 4.9,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      category: "Photography",
      isSale: true
    },
    {
      id: 4,
      name: "Minimalist Desk Lamp with USB Charging",
      price: 89.99,
      rating: 4.3,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      category: "Home & Garden",
      isNew: true
    },
    {
      id: 5,
      name: "Ergonomic Office Chair with Lumbar Support",
      price: 449.99,
      originalPrice: 549.99,
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      category: "Furniture",
      isSale: true
    },
    {
      id: 6,
      name: "Portable Bluetooth Speaker - Waterproof",
      price: 79.99,
      rating: 4.4,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      category: "Audio"
    }
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h1>
          <p className="text-gray-600">Discover our latest collection of premium products</p>
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Load More Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-center pb-12"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Load More Products
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProductListingPage;