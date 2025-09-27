import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

interface FilterProps {
  id: string;
  label: string;
  type: "checkbox" | "radio" | "range" | "rating";
  options?: { label: string; value: string | number }[];
}
interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  filterOptions: FilterProps[];
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  filterContent: () => React.ReactNode;
}
interface SortModalProps {
  sortOptions: { value: string; label: string }[];
  activeSort: string;
  onSortChange: (value: string) => void;
  open: boolean;
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClear,
  onClose,
  filterOptions,
  activeFilter,
  setActiveFilter,
  filterContent,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50  md:hidden`}
        >
          <div className=" absolute inset-0 bg-black/30 " onClick={onClose} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 500,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="absolute bottom-0 left-0 right-0 w-full  bg-white rounded-t-lg max-h-[90%] flex  flex-col justify-between"
          >
            <div className=" p-4 border-b flex items-center justify-between">
              <h2 className=" text-lg font-semibold">Filters</h2>
              <button onClick={onClose}>
                <X className=" h-4 w-4 " />
              </button>
            </div>

            <div className=" w-full flex min-h-100">
              <div className=" bg-gray-50 w-fit border-r">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActiveFilter(opt.id)}
                    className={` w-full p-4 text-left border-b flex items-center ${
                      activeFilter === opt.id
                        ? "bg-white border-r border-r-red-500 "
                        : ""
                    }`}
                  >
                    <div className={` font-bold ${activeFilter===opt.id?" bg-gradient-to-r from-red-500 to-purple-500 text-transparent  bg-clip-text":"text-gray-600 "}`}>
                      {opt.label}
                    </div>
                  </button>
                ))}
              </div>
              <div className="col-span-3 h-100 w-full overflow-y-auto p-4">
                <AnimatePresence mode="wait">
                  {activeFilter && (
                    <motion.div
                      key={activeFilter}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {filterContent()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className=" border-t p-4 flex gap-3">
              <button
                onClick={onClear}
                className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-bold"
              >
                CLEAR ALL
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-gradient-to-r font-bold from-red-400 to-purple-500 rounded-lg text-white "
              >
                APPLY
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SortModal: React.FC<SortModalProps> = ({
  sortOptions,
  open,
  onClose,
  onSortChange,
  activeSort,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 md:hidden `}
        >
          <div className=" absolute inset-0 bg-black/30 " onClick={onClose} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 500,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className=" absolute bottom-0 left-0 right-0 bg-white rounded-t-lg"
          >
            <div className=" p-4 border-b flex items-center justify-between">
              <h2 className=" text-lg font-semibold">Sort By</h2>
              <button onClick={onClose}>
                <X className=" h-4 w-4 " />
              </button>
            </div>
            <div className=" p-2 ">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onSortChange(opt.value);
                    onClose();
                  }}
                  className={` w-full text-left font-bold text-sm py-1 px-4 rounded-lg ${
                    activeSort === opt.value
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
