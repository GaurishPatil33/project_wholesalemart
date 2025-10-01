"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface CategoryListProps {
  title: string;
  data: { slug: string; title: string; image: string }[];
  basePath?: string;
  displayType?: "grid" | "slider";
  itemsPerPage?: number;
}

// const ITEMS_PER_PAGE = 4;

// Page slide animation (for mobile)
const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative" as const,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    position: "absolute" as const,
  }),
};

export const CategoryList: React.FC<CategoryListProps> = ({
  title,
  data,
  basePath,
  displayType = "slider",
  itemsPerPage = 4,
}) => {
  // for md+ scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    if (displayType !== "slider") return;
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [displayType]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  // for sm pagination
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = data.slice(start, end);

  const nextPage = () => {
    if (page < totalPages - 1) setPage([page + 1, 1]);
  };

  const prevPage = () => {
    if (page > 0) setPage([page - 1, -1]);
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative  py-3 md:py-6 mx-auto px-2 md:px-6">
        {/* Section Title */}
        <motion.h2
          variants={fadeInUp}
          className="text-xl md:text-2xl font-bold text-center mb-3 md:mb-4 bg-gradient-to-r from-red-800 to-red-400 bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>

        {/* sliderlayout */}
        {displayType === "slider" && (
          <div className="relative ">
            <motion.div
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              ref={scrollRef}
              className="flex items-center justify overflow-x-auto gap-1 md:gap-3 px-2 snap-x snap-mandatory scroll-smooth scrollbar-hide"
            >
              {data.map((cat) => (
                <motion.div
                  key={cat.slug}
                  variants={fadeInUp}
                  className="flex items-center aspect-[4/5] size-45"
                >
                  <Link
                    href={`${basePath ? basePath : "/listingPage"}?cat=${
                      cat.slug
                    }`}
                    className="h-full w-full "
                  >
                    <motion.img
                      src={cat.image}
                      alt={cat.title}
                      initial={{ opacity: 0, scale: 1.09 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.1, ease: "easeIn" }}
                      className="h-full w-full object-cover  hover:scale-110 transition-transform"
                    />
                    {/* <div className="absolute inset-0 bg-black/30 rounded-tl-2xl rounded-br-2xl"></div>
                    <motion.p
                      initial={{ opacity: 0, scale: 1.09, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.4, ease: "easeIn" }}
                      className="absolute bottom-2 left-2  text-lg text-white font-semibold"
                    >
                      {cat.title}
                    </motion.p> */}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop arrows */}
            {showLeft && (
              <button
                onClick={() => scroll("left")}
                className=" absolute top-1/2 left-2 -translate-y-1/2 bg-white/40 shadow-md rounded-full p-2 hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
            )}
            {showRight && (
              <button
                onClick={() => scroll("right")}
                className=" absolute top-1/2 right-2 -translate-y-1/2 bg-white/40 shadow-md rounded-full p-2 hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            )}
          </div>
        )}

        {/* gridlayout */}
        {displayType === "grid" && (
          <div className="relative min-h-[200px] md:hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-2 gap-4 px-2"
              >
                {currentItems.map((cat) => (
                  <motion.div
                    key={cat.slug}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative flex-shrink-0 min-h-40 max-h-50 rounded-tl-2xl rounded-br-2xl overflow-hidden"
                  >
                    <Link
                      href={`${basePath ? basePath : "/listingPage"}?cat=${
                        cat.slug
                      }`}
                    >
                      <motion.img
                        src={cat.image}
                        alt={cat.title}
                        initial={{ opacity: 0, scale: 1.09 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: 0.1,
                          ease: "easeIn",
                        }}
                        className="w-full h-50 object-cover  hover:scale-110 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-tl-2xl rounded-br-2xl"></div>
                      <motion.p
                        initial={{ opacity: 0, scale: 1.09, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.4,
                          ease: "easeInOut",
                        }}
                        className="absolute bottom-2 left-2  text-lg text-white font-semibold"
                      >
                        {cat.title}
                      </motion.p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage([i, i > page ? 1 : -1])}
                    className={`w-2 h-2 rounded-full ${
                      i === page ? "bg-gray-600 w-3 h-2.5" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Arrows (mobile) */}
            {page > 0 && (
              <button
                onClick={prevPage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 shadow-md rounded-full p-2 hover:bg-gray-200"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
            )}
            {page < totalPages - 1 && (
              <button
                onClick={nextPage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 shadow-md rounded-full p-2 hover:bg-gray-200"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
};
export const CategoryListType2: React.FC<CategoryListProps> = ({
  title,
  data,
  basePath,
  displayType = "slider",
  itemsPerPage = 4,
}) => {
  // for md+ scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    if (displayType !== "slider") return;
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [displayType]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  // for sm pagination
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = data.slice(start, end);

  const nextPage = () => {
    if (page < totalPages - 1) setPage([page + 1, 1]);
  };

  const prevPage = () => {
    if (page > 0) setPage([page - 1, -1]);
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative  py-3 md:py-6 mx-auto px-3 md:px-6 ">
        {/* Section Title */}
        <motion.h2
          variants={fadeInUp}
          className="text-xl md:text-2xl font-bold text-center  bg-gradient-to-r from-red-800 to-red-400 bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>

        {/* sliderlayout */}
        {displayType === "slider" && (
          <div className="relative ">
            <motion.div
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              ref={scrollRef}
              className="flex items-center justify overflow-x-auto gap-2 md:gap-3 px-2 snap-x snap-mandatory scroll-smooth scrollbar-hide"
            >
              {data.map((cat) => (
                <motion.div
                  key={cat.slug}
                  variants={fadeInUp}
                  className="flex flex-col items-end aspect-[4/4] size-45 p-2 justify-end  bg-gray-400"
                >
                  <Link
                    href={`${basePath ? basePath : "/listingPage"}?cat=${
                      cat.slug
                    }`}
                    className="relative bg-black w-full h-full   "
                  >
                    <motion.img
                      src={cat.image}
                      alt={cat.title}
                      initial={{ opacity: 0, scale: 1.09 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.1, ease: "easeIn" }}
                      className="w-full h-full  object-cover  hover:scale-110 transition-transform absolute bg-amber-50  left-0 right-0"
                    />
                    {/* <div className="absolute inset-0 bg-black/30 rounded-tl-2xl rounded-br-2xl"></div> */}
                    {/* <motion.p
                      initial={{ opacity: 0, scale: 1.09, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.4, ease: "easeIn" }}
                      className="absolute bottom-2 left-2  text-lg text-white font-semibold"
                    >
                      {cat.title}
                    </motion.p> */}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop arrows */}
            {showLeft && (
              <button
                onClick={() => scroll("left")}
                className=" absolute top-1/2 left-2 -translate-y-1/2 bg-white/40 shadow-md rounded-full p-2 hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
            )}
            {showRight && (
              <button
                onClick={() => scroll("right")}
                className=" absolute top-1/2 right-2 -translate-y-1/2 bg-white/40 shadow-md rounded-full p-2 hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            )}
          </div>
        )}

        {/* gridlayout */}
        {displayType === "grid" && (
          <div className="relative min-h-[200px] md:hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-2 gap-4 px-2"
              >
                {currentItems.map((cat) => (
                  <motion.div
                    key={cat.slug}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative flex-shrink-0 min-h-40 max-h-50 rounded-tl-2xl rounded-br-2xl overflow-hidden"
                  >
                    <Link
                      href={`${basePath ? basePath : "/listingPage"}?cat=${
                        cat.slug
                      }`}
                    >
                      <motion.img
                        src={cat.image}
                        alt={cat.title}
                        initial={{ opacity: 0, scale: 1.09 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: 0.1,
                          ease: "easeIn",
                        }}
                        className="w-full h-50 object-cover  hover:scale-110 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-tl-2xl rounded-br-2xl"></div>
                      <motion.p
                        initial={{ opacity: 0, scale: 1.09, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.4,
                          ease: "easeInOut",
                        }}
                        className="absolute bottom-2 left-2  text-lg text-white font-semibold"
                      >
                        {cat.title}
                      </motion.p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage([i, i > page ? 1 : -1])}
                    className={`w-2 h-2 rounded-full ${
                      i === page ? "bg-gray-600 w-3 h-2.5" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Arrows (mobile) */}
            {page > 0 && (
              <button
                onClick={prevPage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 shadow-md rounded-full p-2 hover:bg-gray-200"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
            )}
            {page < totalPages - 1 && (
              <button
                onClick={nextPage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 shadow-md rounded-full p-2 hover:bg-gray-200"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
};
