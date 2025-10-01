// components/FilterContent.tsx
"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterProps {
  id: string;
  label: string;
  type: "checkbox" | "radio" | "range" | "rating";
  options?: FilterOption[];
}

interface FilterContentProps {
  filter: FilterProps;
  filtersState: Record<string, string[]>;
  priceRange: { min: number; max: number };
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  setPriceRange: React.Dispatch<
    React.SetStateAction<{ min: number; max: number }>
  >;
  updateUrlParams: (
    filters: Record<string, string[]>,
    singleparams: Record<string, string>
  ) => void;
}

const FilterContent: React.FC<FilterContentProps> = ({
  filter,
  filtersState,
  priceRange,
  setFilters,
  setPriceRange,
  updateUrlParams,
}) => {
  const [activeSlider, setActiveSlider] = useState<"min" | "max" | null>(null);

  const handleCheckboxChange = (key: string, value: string) => {
    setFilters((prev) => {
      const currentval = prev[key] || [];
      const newval = currentval.includes(value)
        ? currentval.filter((v) => v !== value)
        : [...currentval, value];

      const updated = { ...prev, [key]: newval };
      updateUrlParams(updated, {});
      return updated;
    });
  };

  const handleRadioChange = (key: string, value: string | null) => {
    const updated = { ...filtersState, [key]: value ? [value] : [] };
    setFilters(updated);
    updateUrlParams(updated, {});
  };

  switch (filter.type) {
    case "range":
      return (
        <div className="space-y-4">
          <div className="flex gap-3 items-center justify-between">
            <div>
              <label className="block text-xs mb-1">Min Price</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => {
                  const newMin = parseInt(e.target.value) || 0;
                  const newRange = { ...priceRange, min: newMin };
                  setPriceRange(newRange);
                  updateUrlParams(
                    {},
                    {
                      minPrice: newRange.min.toString(),
                      maxPrice: newRange.max.toString(),
                    }
                  );
                }}
                className="w-full px-3 py-1 border rounded text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Max Price</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value) || 50000;
                  const newRange = { ...priceRange, max: newMax };
                  setPriceRange(newRange);
                  updateUrlParams(
                    {},
                    {
                      minPrice: newRange.min.toString(),
                      maxPrice: newRange.max.toString(),
                    }
                  );
                }}
                className="w-full px-3 py-1 border rounded text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          {/* Optional: add slider UI here */}
        </div>
      );

    case "checkbox":
      return (
        <div className="space-y-2">
          {filter.options?.map((opt, index) => {
            const val = String(opt.value);
            const checked = filtersState[filter.id]?.includes(val) ?? false;

            return (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCheckboxChange(filter.id, val)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                      checked
                        ? "bg-[#900001]/20 border-[#900001]/60"
                        : "border-gray-300"
                    }`}
                  >
                    {checked && <Check className="w-3 h-3 text-[#900001]" />}
                  </div>
                </div>
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      );

    case "radio":
      return (
        <div className="space-y-2">
          {filter.options?.map((opt, index) => {
            const val = String(opt.value);
            const checked = filtersState[filter.id]?.includes(val) ?? false;

            return (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="relative">
                  <input
                    type="radio"
                    checked={checked}
                    onChange={() => handleRadioChange(filter.id, val)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      checked
                        ? "bg-[#900001]/30 border-[#900001]/60"
                        : "border-gray-300"
                    }`}
                  >
                    {checked && (
                      <div className="w-2 h-2 bg-[#900001]/50 rounded-full" />
                    )}
                  </div>
                </div>
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      );

    default:
      return null;
  }
};

export default FilterContent;
