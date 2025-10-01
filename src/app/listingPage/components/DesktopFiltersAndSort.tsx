import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
interface FilterProps {
  id: string;
  label: string;
  type: "checkbox" | "radio" | "range" | "rating";
  options?: { label: string; value: string | number }[];
}
interface FilterModalProps {
  // open: boolean;
  // onClose: () => void;
  onClearAll: () => void;
  filterOptions: FilterProps[];
  filters: Record<string, string[]>;
  // activeFilter: string;
  // setActiveFilter: (id: string) => void;
  filterContent: (
    filter: FilterProps,
    filterOptions?: FilterProps[]
  ) => React.ReactNode;
}
export const DesktopFilters: React.FC<FilterModalProps> = ({
  filters,
  filterOptions,
  onClearAll,
  filterContent,
}) => {
  const [openSections, setOpenSections] = useState<string[]>([
    "brands",
    "discount",
    "rating",
    "price",
  ]);

  const toggleSection = (secId: string) => {
    setOpenSections((prev) =>
      prev.includes(secId) ? prev.filter((p) => p !== secId) : [...prev, secId]
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=" w-fit bg-white border-r rounded-lg  shadow-sm "
      >
        <div className=" w-full flex justify-between p-4 items-center border-b-2 border-r-gray-800 mb-2">
          <h2 className=" text-lg font-semibold">Filters</h2>
          <button
            onClick={onClearAll}
            className=" text-sm text-red-500 font-medium hover:underline"
          >
            Clear All
          </button>
        </div>
        {filterOptions.map((opt, index) => (
          <div
            className=" p-4 border-b-2 border-gray-100 last:border-b-0"
            key={index}
          >
            <button
              onClick={() => toggleSection(opt.id)}
              className="flex items-center justify-between w-full text-left group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-[#900001]/40 transition-colors">
                {opt.label}
              </h3>
              <div
                className={` transform transition-transform duration-200 ${
                  openSections.includes(opt.id) ? "rotate-180" : " rotate-0"
                }`}
              >
                <ChevronDown className=" w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
              </div>
            </button>
            {/* <div className=" mt-4">{filterContent(opt)}</div> */}
            <AnimatePresence>
              {openSections.includes(opt.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-2 overflow-y-auto max-h-80 "
                >
                  {filterContent(opt, filterOptions)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export const DesktopSort = () => {
  return <div>DesktopFilters</div>;
};
