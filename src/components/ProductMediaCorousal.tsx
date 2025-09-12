import { Product } from "@/lib/types";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import React, {  useRef, useState } from "react";
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
    // <div className="w-full  relative  group ">

    //   {/* Slide */}
    //   <AnimatePresence initial={false} mode="wait">
    //     <motion.div
    //       key={selected}
    //       className=" overflow-hidden rounded-tl-2xl  rounded-br-2xl"
    //       drag="x"
    //       dragConstraints={{ left: 0, right: 0 }}
    //       onDragEnd={(e, { offset, velocity }) => {
    //         if (offset.x < -100 || velocity.x < -500) next();
    //         if (offset.x > 100 || velocity.x > 500) prev();
    //       }}
    //       initial={{ opacity: 0, x: 100 }}
    //       animate={{ opacity: 1, x: 0 }}
    //       exit={{ opacity: 0, x: -100 }}
    //       transition={{ duration: 0.3 }}
    //     >
    //       <div className="relative w-full aspect-[6/9] overflow-hidden rounded-tl-2xl rounded-br-2xl">
    //         {slides[selected].type === "image" ? (
    //           <img
    //             src={slides[selected].src}
    //             alt={product?.title}
    //             className="w-full h-full object-cover cursor-zoom-in"
    //           />
    //         ) : (
    //           <div className="relative w-full h-full ">
    //             {/* Blurred video background
    //             <video
    //               src={slides[selected].src}
    //               muted
    //               autoPlay
    //               loop
    //               playsInline
    //               disablePictureInPicture
    //               className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
    //               aria-hidden="true"
    //             /> */}
    //             <video
    //               ref={videoRef}
    //               src={slides[selected].src}
    //               muted={muted}
    //               autoPlay
    //               loop
    //               playsInline
    //               disablePictureInPicture
    //               className="relative w-full h-full object-cover z-10"
    //             />
    //             {/* Mute / Unmute Button */}
    //             <button
    //               onClick={() => setMuted((m) => !m)}
    //               className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition z-10"
    //             >
    //               {muted ? (
    //                 <VolumeX className="w-5 h-5" />
    //               ) : (
    //                 <Volume2 className="w-5 h-5" />
    //               )}
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     </motion.div>
    //   </AnimatePresence>

    //   {/* Prev Button */}
    //   <button
    //     onClick={prev}
    //     aria-label="Previous slide"
    //     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm h-12 w-12 flex items-center justify-center rounded-full hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
    //   >
    //     <ChevronLeft className="w-5 h-5" aria-hidden="true" />
    //   </button>

    //   {/* Next Button */}
    //   <button
    //     onClick={next}
    //     aria-label="Next slide"
    //     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm h-12 w-12 flex items-center justify-center rounded-full hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
    //   >
    //     <ChevronRight className="w-5 h-5" aria-hidden="true" />
    //   </button>

    //   {/* Counter */}
    //   <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
    //     {selected + 1} / {slides.length}
    //   </div>

    //   {/* Dots */}
    //   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
    //     {slides.map((_, i) => (
    //       <button
    //         key={i}
    //         aria-label={`Go to slide ${i + 1}`}
    //         onClick={() => setSelected(i)}
    //         className={`h-2 w-2 rounded-full transition-all ${
    //           i === selected ? "bg-gray-900 scale-125" : "bg-white/70"
    //         }`}
    //       />
    //     ))}
    //   </div>
    // </div>
    <div className="w-full relative group">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-tl-2xl rounded-br-2xl overflow-hidden"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full aspect-[6/9]">
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
