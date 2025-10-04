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
} from "@/app/listingPage/components/MobileFilterAndSort";
import { DesktopFilters } from "@/app/listingPage/components/DesktopFiltersAndSort";
import Paginations from "@/components/Paginations";
import {
  fetchAllProducts,
  fetchProductByCategory,
  searchProduct,
} from "@/lib/productfetching";
import FilterBanner from "./components/FilterBanner";
import MobileFilterSortBar from "./components/mobileFilterSortBar";
import { TbCircleDashedPercentage } from "react-icons/tb";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuBadgeIndianRupee } from "react-icons/lu";
import { FaFire } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { ProductCard, ProductCardType2 } from "@/components/ProductCard";

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
  const badges = useMemo(() => searchParams.getAll("badges"), [searchParams]);

  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 50000,
  });

  const [products, setproducts] = useState<Product[]>([]);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [mobileSort, setMobileSort] = useState(false);
  const [pendingParams, setPendinParams] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<Record<string, string[]>>({
    category: [],
    brands: [],
    discount: [],
    availability: [],
    // discount: discount ? [discount.toString()] : [],
    rating: [],
    badges: [],
  });

  const [activeSlider, setActiveSlider] = useState<"min" | "max" | null>(null);

  useEffect(() => {
    setFilters({
      category: categories || [],
      brands: brands || [],
      discount: discount || [],
      availability: availability || [],
      rating: rating ? [rating?.toString()] : [],
      badges: badges || [],
    });
  }, [categories, brands, discount, rating, availability, badges]);

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
        setLoading(true);
        let fetchproducts: Product[] = [];
        if (search) {
          fetchproducts = await searchProduct(search);
        } else if (category) {
          fetchproducts = await fetchProductByCategory(category);
        } else {
          fetchproducts = await fetchAllProducts();
        }
        setproducts(fetchproducts);
        setLoading(false);
        // setFilterProducts(fetchproducts);
      } catch (error) {
        console.error("Error :", error);
        setproducts([]);
      } finally {
        setLoading(false);
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

    if (filters.badges?.length > 0) {
      filters.badges.forEach((badge) => {
        switch (badge) {
          case "crazyDeal":
            filtered = filtered.filter((p) => p.discount > 30);
            break;

          case "newArriwals":
            filtered = filtered.sort(
              (a, b) =>
                new Date(a.updatedAt).getTime() -
                new Date(b.updatedAt).getTime()
            );
            break;

          case "bestSellers":
            filtered = filtered.filter((p) => p.sales && p.sales > 150);
            break;

          case "under5000":
            filtered = filtered.filter((p) => p.price < 5000);
            break;

          case "trending":
            filtered = filtered.filter((p) => p.isTrending);
            break;
        }
      });
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
  }, [products, filters, minPrice, maxPrice, sort, priceRange]);

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

  const filterContent = (
    filter?: FilterProps,
    filterOptions?: FilterProps[]
  ) => {
    const currentFilter = filterOptions?.find((f) => f.id === activeFilter);
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
                className=" absolute h-2 bg-gradient-to-r from-[#900001]/30 to-red-500 rounded-lg"
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
                    newMax = priceRange.min + 150;
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
                className={`absolute w-full h-2 bg-transparent appearance-none pointer-events-none thumb-red ${
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
                          ? "bg-red-400/40 border-red-400"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {checked && <Check className="w-3 h-3 text-red-700" />}
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
                          ? "bg-red-500/40 border-red-400"
                          : "border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {checked && (
                        <div className="w-2 h-2 bg-red-400/50 rounded-full" />
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
  const productsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  useEffect(() => {
    if (paginatedProducts?.length <= 0 && currentPage > 1) setCurrentPage(1);
    scrollToTop();
  }, [paginatedProducts, currentPage]);

  console.log(filterOptions);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative  md:px-6 xl:px-10 mb-8 pt-4 md:pt-6">
      <h1 className="text-lg md:hidden px-2 font-semibold">
        {search ? (
          <>
            Search results for &quot;
            <span className="font-bold text-[#900001]">{search}</span>&quot;
          </>
        ) : category ? (
          <>
            Products in Category &quot;
            <span className="font-bold text-[#900001]">{category}</span>&quot;
          </>
        ) : (
          "All Products"
        )}
      </h1>

      {/* Mobile Filter and Sort Bar */}
      <MobileFilterSortBar
        setMobileFilters={setMobileFilters}
        setMobileSort={setMobileSort}
      />
      {/* <div className="flex md:hidden justify-between items-center gap-3 mb-4 sticky top-[3.5rem] bg-white z-30 py-2 px-2 border-b">
        <button
          onClick={() => {
            setMobileFilters((prev) => !prev);
            setMobileSort(false);
          }}
          className="flex items-center justify-center flex-1 gap-2 py-2 rounded-full border border-gray-300 text-gray-700 font-medium bg-white shadow-sm active:scale-95 transition"
        >
          <span className="material-icons text-gray-500 text-base">
            filter_list
          </span>
          <span className="text-sm">Filters</span>
        </button>
        <button
          onClick={() => {
            setMobileSort((prev) => !prev);
            setMobileFilters(false);
          }}
          className="flex items-center justify-center flex-1 gap-2 py-2 rounded-full border border-gray-300 text-gray-700 font-medium bg-white shadow-sm active:scale-95 transition"
        >
          <span className="material-icons text-gray-500 text-base">sort</span>
          <span className="text-sm">Sort</span>
        </button>
      </div> */}

      <div className="flex flex-col md:flex-row gap-4 mt-1 ">
        <div className="hidden md:block gap-3 w-2/5 lg:w-1/4 ">
          <DesktopFilters
            onClearAll={clearAll}
            filters={filters}
            filterOptions={filterOptions}
            filterContent={filterContent}
          />
        </div>

        {/* mobile capsule filters */}
        <div className="md:hidden flex  items-center pl-2 mt-1 py-1 justify overflow-x-auto gap-2 snap-x snap-mandatory scroll-smooth scrollbar-hide -mb-2">
          {[
            {
              title: "Crazy Deal",
              key: "crazyDeal",
              icon: TbCircleDashedPercentage,
              color: "text-purple-400 border-purple-300 bg-purple-100",
            },
            {
              title: "New Arrivals",
              key: "newArriwals",
              icon: MdFiberNew,
              color: "text-blue-400 border-blue-300 bg-blue-100",
            },
            {
              title: "Best Sellers",
              key: "bestSellers",
              icon: FaFire,
              color: "text-orange-400 border-orange-300 bg-orange-100",
            },
            {
              title: "Under 5000",
              key: "under5000",
              icon: LuBadgeIndianRupee,
              color: "text-green-400 border-green-300 bg-green-100",
            },
            {
              title: "Trending",
              key: "trending",
              icon: FaArrowTrendUp,
              color: "text-red-400 border-red-300 bg-red-100",
            },
          ]
            .reverse()
            .map((item, i) => {
              const isActive = filters.badges?.[0] === item.key;
              return (
                <div
                  key={i}
                  onClick={() => {
                    // const newBadges = isActive
                    //   ? filters.badges.filter((b) => b !== item.key)
                    //   : [...(filters.badges || []), item.key];

                    const updatedFilters = {
                      ...filters,
                      badges: isActive ? [] : [item.key],
                    };
                    setFilters(updatedFilters);
                    updateUrlParams(updatedFilters, {});
                  }}
                  className={` flex items-center w-full justify-center rounded-full border px-2 py-1 gap-1 transition-all duration-150 cursor-pointer ${
                    item.color
                  } ${isActive ? "scale-105 " : "hover:scale-105"}`}
                >
                  <item.icon className="size-4" />
                  <div className=" text-xs font-semibold truncate">
                    {item.title}
                  </div>
                </div>
              );
            })}
        </div>

        <div className=" w-full h-full flex flex-col justify-between">
          <h1 className=" hidden md:block text-lg px-2 font-semibold">
            {search ? (
              <>
                Search results for &quot;
                <span className="font-bold text-[#900001]">{search}</span>&quot;
              </>
            ) : category ? (
              <>
                Products in Category &quot;
                <span className="font-bold text-[#900001]">{category}</span>
                &quot;
              </>
            ) : (
              "All Products"
            )}
          </h1>
          <div className="">
            {paginatedProducts && !loading ? (
              <>
                <div className="md:hidden grid grid-cols-2  gap-1">
                  {paginatedProducts.flatMap((product, index) => {
                    const elements: React.ReactNode[] = [
                      <ProductCard key={`p-${index}`} product={product} />,
                    ];
                    const bannerInsertions = [
                      // { index: 3, type: "category", key: "banner-category" },
                      { index: 3, type: "price", key: "banner-price" },
                      { index: 5, type: "brand", key: "banner-brand" },
                    ];

                    const bannerToInsert = bannerInsertions.find(
                      (b) => b.index === index
                    );
                    if (bannerToInsert) {
                      elements.push(
                        <FilterBanner
                          key={bannerToInsert.key}
                          type={
                            bannerToInsert.type as
                              | "category"
                              | "brand"
                              | "price"
                          }
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
                              ...(newFilters.brands && {
                                brands: newFilters.brands,
                              }),
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
                              minPrice:
                                newFilters.priceRange?.min.toString() || "0",
                              maxPrice:
                                newFilters.priceRange?.max.toString() ||
                                "50000",
                            });
                          }}
                        />
                      );
                    }
                    return elements;
                  })}
                </div>
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {paginatedProducts.map((p) => (
                    <ProductCardType2 product={p} key={p.id} />
                  ))}
                </div>
                {paginatedProducts.length <= 0 && !loading && (
                  <div className=" p-3">
                    Products not found! Try to adjust your filters{" "}
                  </div>
                )}
              </>
            ) : (
              <Skeleton />
            )}
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
