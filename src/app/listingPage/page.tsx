"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Skeleton from "@/components/Skeleton";
// import Productlist from "@/components/Productlist";
// import Filter from "@/components/FilterSidebar";
import { Product } from "@/lib/types";

import { Check } from "lucide-react";
import {
  FilterModal,
  SortModal,
} from "@/components/Filters&Sort/MobileFilterAndSort";
import { DesktopFilters } from "@/components/Filters&Sort/DesktopFiltersAndSort";
import Paginations from "@/components/Paginations";
import Productcard from "@/components/ProductCard";
import {
  fetchAllProducts,
  fetchProductByCategory,
  searchProduct,
} from "@/lib/productfetching";
import ProductCard from "@/components/ProductCard";
import FilterBanner from "./FilterBanner";

interface FilterProps {
  id: string;
  label: string;
  type: "checkbox" | "radio" | "range" | "rating";
  options?: { label: string; value: string | number }[];
}

const ListingPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = useMemo(() => searchParams.get("search"), [searchParams]);
  const category = useMemo(() => searchParams.get("cat"), [searchParams]);
  const categories = useMemo(
    () => searchParams.getAll("category"),
    [searchParams]
  );
  const brands = useMemo(() => searchParams.getAll("brands"), [searchParams]);
  const sort = useMemo(
    () => searchParams.get("sort") || "popularity",
    [searchParams]
  );
  const minPrice = useMemo(
    () => Number(searchParams.get("minPrice")) || 0,
    [searchParams]
  );
  const maxPrice = useMemo(
    () => Number(searchParams.get("maxPrice")) || 50000,
    [searchParams]
  );
  const rating = useMemo(() => searchParams.get("rating"), [searchParams]);
  const discount = useMemo(
    () => searchParams.getAll("discount"),
    [searchParams]
  );
  const availability = useMemo(
    () => searchParams.getAll("availability"),
    [searchParams]
  );

  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 50000,
  });

  const [products, setproducts] = useState<Product[]>([]);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [mobileSort, setMobileSort] = useState(false);
  const [pendingParams, setPendinParams] = useState<string | null>(null);

  const [filters, setFilters] = useState<Record<string, string[]>>({
    category: [],
    brands: [],
    discount: [],
    availability: [],
    // discount: discount ? [discount.toString()] : [],
    rating: [],
  });

  const [activeSlider, setActiveSlider] = useState<"min" | "max" | null>(null);

  useEffect(() => {
    setFilters({
      category: categories || [],
      brands: brands || [],
      discount: discount || [],
      availability: availability || [],
      rating: rating ? [rating?.toString()] : [],
    });
  }, [categories, brands, discount, rating]);

  useEffect(() => {
    setPriceRange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice]);

  const filterOptions: FilterProps[] = [
    {
      id: "category",
      label: "Category",
      type: "checkbox",
      options: [...new Set(products.map((p) => p.category))]
        .map((p) => ({
          label: p,
          value: p,
        }))
        .sort(),
    },
    {
      id: "brands",
      label: "Brands",
      type: "checkbox",
      options: [...new Set(products.map((p) => p.brand))]
        .sort()
        .filter(Boolean)
        .map((p) => ({
          label: p,
          value: p,
        })),
    },
    {
      id: "price",
      label: "Price",
      type: "range",
      options: [
        { label: "min", value: Math.min(...products.map((p) => p.price)) || 0 },
        {
          label: "max",
          value: Math.max(...products.map((p) => p.price)) || 50000,
        },
      ],
    },
    {
      id: "discount",
      label: "Discount",
      type: "checkbox",
      options: [10, 20, 30, 40, 50, 60, 70, 80, 90].map((dis) => ({
        label: dis.toString() + "% or more",
        value: dis,
      })),
    },
    {
      id: "rating",
      label: "Rating",
      type: "radio",
      options: [1, 2, 3, 4].map((dis) => ({
        label: dis.toString() + "⭐ & above ",
        value: dis,
      })),
    },
    {
      id: "availability",
      label: "Availability",
      type: "checkbox",
      options: [...new Set(products.map((p) => p.availabilityStatus))]
        .filter(Boolean)
        .map((aval) => ({
          value: aval,
          label: aval,
        })),
    },
  ];

  const [activeFilter, setActiveFilter] = useState<FilterProps["id"]>(
    filterOptions[0].id
  );

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "newest", label: "What's New" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "discount", label: "Better Discount" },
  ];

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        let fetchproducts: Product[] = [];
        if (search) {
          fetchproducts = await searchProduct(search);
        } else if (category) {
          fetchproducts = await fetchProductByCategory(category);
        } else {
          fetchproducts = await fetchAllProducts();
        }
        setproducts(fetchproducts);

        // setFilterProducts(fetchproducts);
      } catch (error) {
        console.error("Error :", error);
        setproducts([]);
      }
    };

    fetchproducts();
  }, [search, category]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.brands?.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand));
    }

    if (filters.category?.length > 0) {
      filtered = filtered.filter((p) => filters.category.includes(p.category));
    }
    if (filters.availability?.length > 0) {
      filtered = filtered.filter((p) =>
        filters.availability.includes(p.availabilityStatus)
      );
    }

    if (priceRange) {
      filtered = filtered.filter(
        (p) => p.price >= priceRange.min && p.price <= priceRange.max
      );
    }

    if (filters.rating?.length > 0) {
      const minRating = Math.min(...filters.rating.map(Number));
      filtered = filtered.filter((p) => (p.rating || 0) >= minRating);
    }

    if (filters.discount?.length > 0) {
      const minDiscount = Math.min(...filters.discount.map(Number));
      filtered = filtered.filter((p) => (p.discount || 0) >= minDiscount);
    }

    if (sort) {
      switch (sort) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "discount":
          filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
          break;
        case "popularity":
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        // case "newest":
        //   filtered.sort(
        //     (a, b) =>
        //       new Date(b.meta?.updatedAt || 0).getTime() -
        //       new Date(a.meta?.updatedAt || 0).getTime()
        //   );
        // break;

        default:
          break;
      }
    }

    return filtered;
  }, [products, filters, minPrice, maxPrice, sort]);

  const updateUrlParams = useCallback(
    (
      filters: Record<string, string[]>,
      singleparams: Record<string, string>
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      //  multivalue
      Object.entries(filters).forEach(([key, val]) => {
        params.delete(key);
        val.forEach((v) => {
          if (v) params.append(key, v);
        });
        // if (val.length > 0) {
        //   val.forEach((v) => {
        //     if (v) params.append(key, v);
        //   });
        //   // params.set(key, JSON.stringify(val));
        // } else {
        //   params.delete(key);
        // }
      });

      //  singlevalue
      Object.entries(singleparams).forEach(([key, val]) => {
        if (val) {
          params.set(key, val);
        } else {
          params.delete(key);
        }
      });

      // router.replace(`?${params.toString()}`);
      setPendinParams(`?${params.toString()}`);
    },
    [searchParams]
  );

  useEffect(() => {
    if (pendingParams) {
      router.replace(pendingParams, { scroll: false });
    }
  }, [pendingParams, router]);

  const clearAll = useCallback(() => {
    setFilters({
      category: [],
      brands: [],
      discount: [],
      rating: [],
      availability: [],
    });
    setPriceRange({ min: 0, max: 50000 });

    const baseParams = new URLSearchParams();
    if (search) baseParams.set("search", search);
    if (category) baseParams.set("cat", category);
    router.replace(`?${baseParams.toString()}`, { scroll: false });
  }, [search, category, router]);

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
    const updated = { ...filters, [key]: value ? [value] : [] };
    setFilters(updated);
    updateUrlParams(updated, {});
  };

  const filterContent = (filter?: FilterProps) => {
    const currentFilter = filterOptions.find((f) => f.id === activeFilter);
    if (!currentFilter) return null;
    // console.log(currentFilter);
    // console.log(filter);

    const filterType = filter ? filter : currentFilter;

    switch (filterType.type) {
      case "range":
        return (
          <div className="space-y-4">
            <div className=" flex gap-3 items-center justify-between">
              <div className="">
                <label htmlFor="" className=" block text-xs to-gray-50 mb-1">
                  MinPrice
                </label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => {
                    const val = e.target.value;
                    const newMin = val === "" ? 0 : parseInt(val);
                    const newPriceRange = { min: newMin, max: priceRange.max };
                    setPriceRange(newPriceRange);
                    updateUrlParams(
                      {},
                      {
                        minPrice: newPriceRange.min.toString(),
                        maxPrice: newPriceRange.max.toString(),
                      }
                    );
                  }}
                  className=" w-full px-3 py-1 border border-gray-400 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Min Price"
                />
              </div>

              <div className="">
                <label htmlFor="" className=" block text-xs to-gray-50 mb-1">
                  MaxPrice
                </label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value);
                    const newPriceRange = { min: priceRange.min, max: newMax };
                    setPriceRange(newPriceRange);
                    updateUrlParams(
                      {},
                      {
                        minPrice: newPriceRange.min.toString(),
                        maxPrice: newPriceRange.max.toString(),
                      }
                    );
                  }}
                  className=" w-full px-3 py-1 border border-gray-400 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Max Price"
                />
              </div>
            </div>

            <div className=" relative w-full mt-5 flex items-center">
              <div className=" absolute h-2 w-full bg-gray-200 rounded-lg" />
              <div
                className=" absolute h-2 bg-gradient-to-r from-red-400 to-purple-400 rounded-lg"
                style={{
                  left: `${(priceRange.min / 50000) * 100}%`,
                  right: `${100 - (priceRange.max / 50000) * 100}%`,
                }}
              />

              <input
                type="range"
                min={0}
                max={50000}
                step={50}
                value={priceRange.min}
                onChange={(e) => {
                  setActiveSlider("min");
                  let newMin = parseInt(e.target.value);
                  if (newMin >= priceRange.min) {
                    newMin = priceRange.max - 50;
                  }
                  const newPriceRange = { min: newMin, max: priceRange.max };
                  setPriceRange(newPriceRange);
                  updateUrlParams(
                    {},
                    {
                      minPrice: newPriceRange.min.toString(),
                      maxPrice: newPriceRange.max.toString(),
                    }
                  );
                }}
                className={`absolute w-full h-2 bg-transparent appearance-none pointer-events-none thumb-red ${
                  activeSlider === "min" ? "z-20 " : "z-10"
                }`}
              />
              <input
                type="range"
                min={0}
                max={50000}
                step={50}
                value={priceRange.max}
                onChange={(e) => {
                  setActiveSlider("max");
                  let newMax = parseInt(e.target.value);
                  if (newMax <= priceRange.min) {
                    newMax = priceRange.min + 50;
                  }
                  const newPriceRange = { min: priceRange.min, max: newMax };
                  setPriceRange(newPriceRange);
                  updateUrlParams(
                    {},
                    {
                      minPrice: newPriceRange.min.toString(),
                      maxPrice: newPriceRange.max.toString(),
                    }
                  );
                }}
                className={`absolute w-full h-2 bg-transparent appearance-none pointer-events-none thumb-purple ${
                  activeSlider === "max" ? "z-20" : "z-10"
                }`}
              />
            </div>
            <div className=" -mt-1 flex justify-between text-xs text-gray-600">
              <span>₹{0}</span>
              <span>₹{50000}</span>
            </div>

            <div className="md:hidden mt-8 p-4 bg-gray-100 rounded-lg">
              <div className=" text-xs text-gray-600 mb-2">Popular Ranges:</div>
              <div className=" flex flex-wrap gap-2">
                {[
                  { min: 500, max: 2000, label: "Under 2000" },
                  { min: 2000, max: 5000, label: "2000 to 5000" },
                  { min: 5000, max: 10000, label: "5000 to 10000" },
                  { min: 10000, max: 50000, label: "10000+" },
                  { min: 25000, max: 50000, label: "25000+" },
                ].map((opt, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setPriceRange({ min: opt.min, max: opt.max });
                      updateUrlParams(
                        {},
                        {
                          minPrice: opt.min.toString(),
                          maxPrice: opt.max.toString(),
                        }
                      );
                    }}
                    className=" px-3 py-1 bg-white border-2 border-gray-200 rounded-full text-xs hover:bg-purple-100 hover:border-red-300 transition-colors"
                  >
                    <p className=" text-xs font-medium">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div className=" space-y-3">
            {filterType.options?.map((opt, index) => {
              const val = String(opt.value);
              const checked = filters[filterType.id]?.includes(val) ?? false;
              return (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCheckboxChange(filterType.id, val)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border-2 rounded ${
                        checked
                          ? "bg-red-400 border-red-500"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {checked && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <span className="text-gray-700">{opt.label}</span>
                </label>
              );
            })}
          </div>
        );

      case "radio":
        return (
          <div className=" space-y-3">
            {filterType.options?.map((opt, index) => {
              const val = String(opt.value);
              const checked = filters[filterType.id]?.includes(val) ?? false;
              return (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="radio"
                      // name={}
                      checked={checked}
                      onChange={() => handleRadioChange(filterType.id, val)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border-2 rounded-full ${
                        checked
                          ? "bg-red-400 border-pink-500"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {checked && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700">{opt.label}</span>
                </label>
              );
            })}
          </div>
        );
    }
  };

  // paginated products
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  useEffect(() => {
    if (paginatedProducts?.length <= 0 && currentPage > 1) setCurrentPage(1);
  }, [paginatedProducts, currentPage]);

  console.log(filterOptions);

  return (
    <div className="relative px-1 md:px-6 xl:px-10 mb-8 pt-3 md:pt-6">
      <h1 className=" text-xl font-semibold">
        {search
          ? `Search results for "${search}"`
          : category
          ? `Products in category "${category}"`
          : "All Products"}
      </h1>

      {/* mobile filter and sort option */}
      <div className=" flex justify-between items-center gap-2">
        <button
          onClick={() => {
            setMobileFilters((prev) => !prev);
            setMobileSort(false);
          }}
          className="md:hidden w-1/2 mb-4 px-4 py-2 bg-gray-100 border rounded"
        >
          Filters
        </button>
        <button
          onClick={() => {
            setMobileSort((prev) => !prev);
            setMobileFilters(false);
          }}
          className="md:hidden w-1/2 mb-4 px-4 py-2 bg-gray-100 border rounded"
        >
          Sort by
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="hidden lg:block gap-3 w-2/5 lg:w-1/4 ">
          <DesktopFilters
            onClearAll={clearAll}
            filters={filters}
            filterOptions={filterOptions}
            filterContent={filterContent}
          />
        </div>
        <div className=" w-full h-full flex flex-col justify-between">
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-1 md:gap-3">
            {paginatedProducts.flatMap((product, index) => {
              const elements: React.ReactNode[] = [
                <ProductCard key={`p-${index}`} product={product} />,
              ];

              // Determine screen width (responsive insertion)
              const isClient = typeof window !== "undefined";
              const isMdUp = isClient && window.innerWidth >= 768;

              // Set insertion interval based on screen size
              const interval = isMdUp ? 3 : 2; // md+ -> after 3 products, mobile -> after 2
              const bannerInsertions = [
                { index: 1, type: "category", key: "banner-category" },
                { index: 3, type: "brand", key: "banner-brand" },
                { index: 5, type: "price", key: "banner-price" },
              ];

              const bannerToInsert = bannerInsertions.find(
                (b) => b.index === index
              );
              if (bannerToInsert) {
                elements.push(
                  <FilterBanner
                    key={bannerToInsert.key}
                    type={bannerToInsert.type as "category" | "brand" | "price"}
                    categories={
                      filterOptions
                        .find((p) => p.id === "category")
                        ?.options?.map((opt) => String(opt.value)) || []
                    }
                    brands={
                      filterOptions
                        .find((p) => p.id === "brands")
                        ?.options?.map((opt) => String(opt.value)) || []
                    }
                    filters={{
                      category: filters.category,
                      brands: filters.brands,
                      priceRange: priceRange, // assuming FilterBanner reads priceRange for price
                      discount: [],
                      rating: [],
                      availabilityStatus: [],
                    }}
                    onChange={(newFilters) => {
                      const updatedFilters: Record<string, string[]> = {
                        ...filters,
                        ...(newFilters.category && {
                          category: newFilters.category,
                        }),
                        ...(newFilters.brands && { brands: newFilters.brands }),
                        ...(newFilters.discount && {
                          discount: newFilters.discount.map(String),
                        }),
                        ...(newFilters.rating && {
                          rating: newFilters.rating.map(String),
                        }),
                        ...(newFilters.availabilityStatus && {
                          availability: newFilters.availabilityStatus,
                        }),
                        // Don't include priceRange here!
                      };

                      setFilters(updatedFilters);

                      // Update URL params separately for priceRange
                      updateUrlParams(updatedFilters, {
                        minPrice: newFilters.priceRange?.min.toString() || "0",
                        maxPrice:
                          newFilters.priceRange?.max.toString() || "50000",
                      });
                    }}
                  />
                );
              }
              return elements;
            })}
          </div>

          {/* pagination */}
          {totalPages > 1 && (
            <Paginations
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      {/* mobileFilters Modal */}
      <FilterModal
        open={mobileFilters}
        onClose={() => setMobileFilters(false)}
        onClear={clearAll}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filterOptions={filterOptions}
        filterContent={filterContent}
      />

      {/* mobileSort Modal */}
      <SortModal
        open={mobileSort}
        onClose={() => setMobileSort(false)}
        sortOptions={sortOptions}
        activeSort={sort}
        onSortChange={(val) => updateUrlParams({}, { sort: val })}
      />
    </div>
  );
};

export default function ListingPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ListingPageContent />
    </Suspense>
  );
}
