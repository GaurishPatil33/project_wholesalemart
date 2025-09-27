
"use client"
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, Grid, List, Star, Heart, ShoppingCart, Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  discount?: number;
}

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

const WomensFashionListing: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [searchQuery, setSearchQuery] = useState('');

  // Mock product data
  const products: Product[] = [
    {
      id: '1',
      name: 'Floral Print Maxi Dress',
      brand: 'Zara',
      category: 'dresses',
      price: 2499,
      originalPrice: 3299,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
      colors: ['Red', 'Blue', 'Pink'],
      sizes: ['S', 'M', 'L', 'XL'],
      isNew: true,
      discount: 24
    },
    {
      id: '2',
      name: 'Casual Cotton T-Shirt',
      brand: 'H&M',
      category: 'tops',
      price: 799,
      rating: 4.2,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      colors: ['White', 'Black', 'Grey'],
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: '3',
      name: 'High Waist Skinny Jeans',
      brand: 'Levis',
      category: 'jeans',
      price: 3299,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop',
      colors: ['Blue', 'Black'],
      sizes: ['28', '30', '32', '34']
    },
    {
      id: '4',
      name: 'Silk Blouse',
      brand: 'Mango',
      category: 'tops',
      price: 1899,
      originalPrice: 2499,
      rating: 4.3,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      colors: ['Cream', 'Black', 'Navy'],
      sizes: ['S', 'M', 'L'],
      discount: 24
    },
    {
      id: '5',
      name: 'A-Line Midi Skirt',
      brand: 'Forever21',
      category: 'skirts',
      price: 1299,
      rating: 4.1,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=300&h=400&fit=crop',
      colors: ['Black', 'Navy', 'Burgundy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: '6',
      name: 'Leather Jacket',
      brand: 'Zara',
      category: 'jackets',
      price: 4999,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
      colors: ['Black', 'Brown'],
      sizes: ['S', 'M', 'L']
    },
    {
      id: '7',
      name: 'Summer Crop Top',
      brand: 'H&M',
      category: 'tops',
      price: 699,
      rating: 4.0,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1564257577-2b0e3de5b9b3?w=300&h=400&fit=crop',
      colors: ['White', 'Pink', 'Yellow'],
      sizes: ['XS', 'S', 'M']
    },
    {
      id: '8',
      name: 'Formal Blazer',
      brand: 'Mango',
      category: 'blazers',
      price: 3799,
      originalPrice: 4999,
      rating: 4.6,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      colors: ['Black', 'Navy', 'Grey'],
      sizes: ['S', 'M', 'L', 'XL'],
      discount: 24
    },
    {
      id: '9',
      name: 'Bohemian Wrap Dress',
      brand: 'Free People',
      category: 'dresses',
      price: 2899,
      rating: 4.4,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
      colors: ['Floral', 'Paisley'],
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: '10',
      name: 'Wide Leg Trousers',
      brand: 'Zara',
      category: 'pants',
      price: 2199,
      rating: 4.2,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop',
      colors: ['Black', 'Beige', 'Navy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    }
  ];

  const categories: FilterOption[] = [
    { id: 'dresses', label: 'Dresses', count: 2 },
    { id: 'tops', label: 'Tops', count: 3 },
    { id: 'jeans', label: 'Jeans', count: 1 },
    { id: 'skirts', label: 'Skirts', count: 1 },
    { id: 'jackets', label: 'Jackets', count: 1 },
    { id: 'blazers', label: 'Blazers', count: 1 },
    { id: 'pants', label: 'Pants', count: 1 }
  ];

  const brands: FilterOption[] = [
    { id: 'zara', label: 'Zara', count: 3 },
    { id: 'hm', label: 'H&M', count: 2 },
    { id: 'levis', label: 'Levis', count: 1 },
    { id: 'mango', label: 'Mango', count: 2 },
    { id: 'forever21', label: 'Forever21', count: 1 },
    { id: 'free-people', label: 'Free People', count: 1 }
  ];

  // Filter products based on selections
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand.toLowerCase().replace(/\s+/g, '-'));
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  }, [products, searchQuery, selectedCategories, selectedBrands, priceRange]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  // Filter Banner Component
  const FilterBanner: React.FC<{ index: number }> = ({ index }) => {
    const bannerTypes = [
      {
        title: "Shop by Category",
        content: (
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 4).map(category => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategories.includes(category.id)
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-pink-300'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        )
      },
      {
        title: "Filter by Brand",
        content: (
          <div className="flex flex-wrap gap-2">
            {brands.slice(0, 4).map(brand => (
              <button
                key={brand.id}
                onClick={() => toggleBrand(brand.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedBrands.includes(brand.id)
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-pink-300'
                }`}
              >
                {brand.label}
              </button>
            ))}
          </div>
        )
      },
      {
        title: "Price Range",
        content: (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">₹</span>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                className="w-20 px-2 py-1 text-sm border rounded"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 5000 }))}
                className="w-20 px-2 py-1 text-sm border rounded"
                placeholder="Max"
              />
            </div>
            <button
              onClick={() => setPriceRange({ min: 0, max: 5000 })}
              className="px-3 py-1 text-sm text-pink-600 border border-pink-300 rounded hover:bg-pink-50"
            >
              Reset
            </button>
          </div>
        )
      }
    ];

    const bannerType = bannerTypes[index % bannerTypes.length];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-full my-6 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{bannerType.title}</h3>
        {bannerType.content}
      </motion.div>
    );
  };

  // Product Card Component
  const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {product.discount}% OFF
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
            NEW
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50">
            <Heart size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center mb-3">
          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color, idx) => (
              <div
                key={idx}
                className="w-4 h-4 rounded-full border-2 border-gray-200"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
            )}
          </div>
          
          <button className="flex items-center gap-1 px-3 py-1 bg-pink-600 text-white rounded-md text-sm hover:bg-pink-700 transition-colors">
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Women's Fashion</h1>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-pink-600 text-white' : 'text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-pink-600 text-white' : 'text-gray-600'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Sort Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} products found
                </span>
              </div>
              
              {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
                <div className="flex items-center gap-2">
                  {selectedCategories.map(categoryId => {
                    const category = categories.find(c => c.id === categoryId);
                    return (
                      <span
                        key={categoryId}
                        className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full flex items-center gap-1"
                      >
                        {category?.label}
                        <button onClick={() => toggleCategory(categoryId)} className="ml-1">×</button>
                      </span>
                    );
                  })}
                  {selectedBrands.map(brandId => {
                    const brand = brands.find(b => b.id === brandId);
                    return (
                      <span
                        key={brandId}
                        className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full flex items-center gap-1"
                      >
                        {brand?.label}
                        <button onClick={() => toggleBrand(brandId)} className="ml-1">×</button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <React.Fragment key={product.id}>
              <ProductCard product={product} index={index} />
              {/* Insert filter banner after every 4 products */}
              {(index + 1) % 3 === 0 && index < filteredProducts.length - 1 && (
                <FilterBanner index={Math.floor(index / 3)} />
              )}
            </React.Fragment>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredProducts.length > 0 && (
        <div className="text-center py-8">
          <button className="px-8 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default WomensFashionListing;