import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const placeholder = ["Sarees", "Kurtas", "Dresses", "Dupattas"];

const SearchBar = ({ onSearch }: { onSearch?: () => void }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === placeholder.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/listingPage?search=${encodeURIComponent(searchTerm)}`);
    onSearch?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-fit  relative flex justify-between items-center px-2 py-1 rounded-full ring-1 ring-red-700 "
    >
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        className=" outline-none text-xs md:text-sm w-full "
        // placeholder="Search for ..."
      />

      {!searchTerm && (
        <div className=" absolute left-2 top-[50%] -translate-y-1/2 pointer-events-none text-gray-400 text-[10px] md:text-sm">
          Search for{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={placeholder[index]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className=" text-[10px] md:text-sm"
            >
              {placeholder[index]}...
            </motion.span>
          </AnimatePresence>
        </div>
      )}
      <SearchIcon
        onClick={handleSubmit}
        className=" absolute right-2 size-4 md:size-5 text-red-700"
      />
    </form>
  );
};

export default SearchBar;
