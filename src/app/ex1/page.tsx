"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

// Mock product data with video URLs
const products = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    badge: "Best Seller",
    description:
      "Premium noise-canceling wireless headphones with 30-hour battery life.",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 249.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    badge: "New",
    description:
      "Advanced fitness tracking with heart rate monitoring and GPS.",
  },
  {
    id: 3,
    name: "Minimalist Backpack",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.3,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    badge: "Sale",
    description:
      "Sleek design with laptop compartment and water-resistant material.",
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug Set",
    price: 34.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    badge: null,
    description:
      "Handcrafted ceramic mugs perfect for your morning coffee ritual.",
  },
  {
    id: 5,
    name: "Wireless Charging Station",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.4,
    reviews: 94,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    badge: "Featured",
    description: "Fast wireless charging for multiple devices simultaneously.",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 149.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    badge: "Premium",
    description:
      "Portable speaker with 360-degree sound and waterproof design.",
  },
];

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  video: string;
  badge: string | null;
  description: string;
}

interface ProductCardProps {
  product: Product;
  isVideoVisible: boolean;
  onVideoVisibilityChange: (id: number, isVisible: boolean) => void;
  shouldPlay: boolean;
  onVideoEnd: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isVideoVisible,
  onVideoVisibilityChange,
  shouldPlay,
  onVideoEnd,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, {
    margin: " 0px",
    amount: 0.5,
    once: false,
  });

  useEffect(() => {
    onVideoVisibilityChange(product.id, inView);
  }, [inView, product.id, onVideoVisibilityChange]);

  //   useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   if (shouldPlay && isVideoVisible && isVideoLoaded) {
  //     video.play().catch(() => {});
  //     setShowVideo(true);
  //   } else {
  //     video.pause();
  //     setShowVideo(false); // force hide paused video
  //   }
  // }, [shouldPlay, isVideoVisible, isVideoLoaded]);

  // const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (shouldPlay && isVideoVisible && isVideoLoaded) {
      video.currentTime = 0;
      video.play().catch(() => {});
      setShowVideo(true);

      // stop after 4s
      timerRef.current = setTimeout(() => {
        video.pause();
        setShowVideo(false);

        // 🚀 tell parent this product finished playing
        onVideoEnd(product.id);
      }, 4000);
    } else {
      video.pause();
      setShowVideo(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [shouldPlay, isVideoVisible, isVideoLoaded]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleMouseEnter = () => {
    if (!showVideo && isVideoLoaded) {
      setShowVideo(true);
    }
  };

  const handleMouseLeave = () => {
    if (!shouldPlay) {
      setShowVideo(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);

      // Pause others when unmuted
      if (!videoRef.current.muted) {
        document.querySelectorAll("video").forEach((v) => {
          if (v !== videoRef.current) v.pause();
        });
      }
    }
  };

  const badgeColors = {
    "Best Seller": "bg-yellow-500 text-yellow-900",
    New: "bg-green-500 text-green-900",
    Sale: "bg-red-500 text-red-900",
    Featured: "bg-blue-500 text-blue-900",
    Premium: "bg-purple-500 text-purple-900",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-4 left-4 z-10 px-2 py-1 rounded-full text-xs font-semibold ${
            badgeColors[product.badge as keyof typeof badgeColors]
          }`}
        >
          {product.badge}
        </div>
      )}

      {/* Like Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
      >
        <Heart
          className={`w-5 h-5 transition-colors duration-200 ${
            isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
          }`}
        />
      </button>

      {/* Media Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Static Image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{
            opacity: showVideo ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Video */}
        <motion.video
          ref={videoRef}
          src={product.video}
          className="absolute inset-0 w-full h-full object-cover"
          muted={isMuted}
          loop
          autoPlay
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          animate={{
            opacity: showVideo ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Video Controls Overlay */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 right-4 flex gap-2"
            >
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play Icon Overlay */}
        {!showVideo && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 rounded-full bg-white/90 backdrop-blur-sm">
              <Play className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

const ProductListingPage: React.FC = () => {
  const [visibleVideos, setVisibleVideos] = useState<Set<number>>(new Set());
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<number | null>(
    null
  );
  const handleVideoEnd = (id: number) => {
    if (currentPlayingVideo === id) {
      setCurrentPlayingVideo(null);
    }
  };

  const handleVideoVisibilityChange = useCallback(
    (id: number, isVisible: boolean) => {
      setVisibleVideos((prev) => {
        const newSet = new Set(prev);
        if (isVisible) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }
        return newSet;
      });
    },
    []
  );

  // Determine which video should play (first visible video)
  useEffect(() => {
    const sortedVisibleVideos = Array.from(visibleVideos).sort((a, b) => a - b);
    const newPlayingVideo =
      sortedVisibleVideos.length > 0 ? sortedVisibleVideos[0] : null;

    if (newPlayingVideo !== currentPlayingVideo) {
      setCurrentPlayingVideo(newPlayingVideo);
    }
  }, [visibleVideos, currentPlayingVideo]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h1>
            <p className="text-gray-600">{products.length} products found</p>
          </div>
        </div>
      </motion.header>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isVideoVisible={visibleVideos.has(product.id)}
              onVideoVisibilityChange={handleVideoVisibilityChange}
              shouldPlay={currentPlayingVideo === product.id}
              onVideoEnd={handleVideoEnd}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 E-Commerce Store. Premium products with video previews.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProductListingPage;
