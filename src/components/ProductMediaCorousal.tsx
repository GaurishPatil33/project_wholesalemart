import { Product } from "@/lib/types";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import React, { useRef, useState } from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// interface Media {
//   type: "image" | "video";
//   src: string;
// }
const ProductMediaCorousal = ({ product }: { product: Product }) => {
  const slides = [
    ...(product.images.length > 0
      ? [{ type: "image", src: product.images[0] }]
      : []),
    ...(product.video ? [{ type: "video", src: product.video }] : []),
    ...product.images
      .slice(1)
      .map((img: string) => ({ type: "image", src: img })),
  ];

  // const [selected, setSelected] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // const next = () => setSelected((prev) => (prev + 1) % slides.length);
  // const prev = () =>
  //   setSelected((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto play video when it's the active slide
  // useEffect(() => {
  //   if (slides[selected]?.type === "video" && videoRef.current) {
  //     videoRef.current.play().catch(() => {});
  //   }
  // }, [selected]);

  return (
    <div className="w-full relative group">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-xl overflow-hidden"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full aspect-[6/8]">
              {slide.type === "image" ? (
                <img
                  src={slide.src}
                  alt={product?.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={slide.src}
                    muted={muted}
                    autoPlay
                    loop
                    playsInline
                    disablePictureInPicture
                    className="w-full h-full object-cover"
                  />
                  {/* Mute/Unmute button */}
                  <button
                    onClick={() => setMuted((m) => !m)}
                    className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
                  >
                    {muted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Prev Button */}
      <button className="swiper-prev hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-sm h-11 w-11  items-center justify-center rounded-full shadow-lg hover:bg-white transition">
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Custom Next Button */}
      <button className="swiper-next hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-sm h-11 w-11  items-center justify-center rounded-full shadow-lg hover:bg-white transition">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductMediaCorousal;
