import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginations: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      <button
        className="px-2 py-1 w-fit flex items-center rounded text-xs md:text-sm bg-gray-200 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
       <ChevronLeft className=" w-4 h-4"/>
        <div className=" hidden md:block">Prev</div>
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded text-xs font-semibold md:text-sm ${
            currentPage === i + 1
              ? "bg-[#900001]/60 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-2 py-1 w-fit rounded flex items-center text-xs md:text-sm bg-gray-200 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <div className=" hidden md:block">Next</div>
        <ChevronRight className=" w-4 h-4" />
      </button>
    </div>
  );
};

export default Paginations;
