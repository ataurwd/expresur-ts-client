"use client";

import { useState } from "react";
import { Star, ShoppingCart, Search, ChevronDown } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  des: string;
  img: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Nike Air Max 270 React",
    price: 89.99,
    rating: 4.8,
    category: "Sneakers",
    des: "Lightweight running shoes with React foam cushioning.",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
  {
    id: 2,
    title: "Timberland 6-Inch Boots",
    price: 129.99,
    rating: 4.5,
    category: "Boots",
    des: "Classic waterproof leather boots.",
    img: "https://images.unsplash.com/photo-1605733513597-a8f8341080e8?w=800",
  },
  {
    id: 3,
    title: "Adidas Trefoil Tee",
    price: 64.99,
    rating: 4.9,
    category: "T-Shirt",
    des: "Iconic cotton t-shirt.",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
  },
  {
    id: 4,
    title: "Champion Hoodie",
    price: 49.99,
    rating: 4.7,
    category: "Hoodie",
    des: "Cozy fleece hoodie.",
    img: "https://images.unsplash.com/photo-1556821845-9f1e7ed1ed04?w=800",
  },
  {
    id: 5,
    title: "Vans Old Skool",
    price: 95.0,
    rating: 4.7,
    category: "Casual Shoes",
    des: "Classic skate shoes.",
    img: "https://images.unsplash.com/photo-1524010349062-860def6649c3?w=800",
  },
  {
    id: 6,
    title: "Levi's 511 Jeans",
    price: 39.99,
    rating: 4.4,
    category: "Jeans",
    des: "Slim fit stretch jeans.",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
  },
  {
    id: 7,
    title: "Balenciaga Triple S",
    price: 220.0,
    rating: 5.0,
    category: "Luxury Sneakers",
    des: "Chunky dad sneaker.",
    img: "https://images.unsplash.com/photo-1590670016136-8d00a44e42ff?w=800",
  },
  {
    id: 8,
    title: "North Face Jacket",
    price: 55.0,
    rating: 4.2,
    category: "Jacket",
    des: "Waterproof rain jacket.",
    img: "https://images.unsplash.com/photo-1551028719-00167b629994?w=800",
  },
];

export default function TiendaProduct() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState(500);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredAndSorted = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (p) => selectedRating === null || Math.round(p.rating) === selectedRating
    )
    .filter((p) => p.price <= priceRange)
    .filter((p) => !selectedCategory || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-orange-400 text-orange-400"
            : i < rating
            ? "fill-orange-200 text-orange-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Header */}

        <div className="max-w-7xl mx-auto flex gap-8 px-6 py-8">
          {/* Sidebar Filters */}
          <aside className="w-80 space-y-8">
            {/* Rating Filter */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-green-700">Rating</h3>
                <button className="text-sm text-orange-500 hover:text-orange-600">
                  Reset
                </button>
              </div>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((r) => (
                  <label
                    key={r}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === r}
                      onChange={() =>
                        setSelectedRating(selectedRating === r ? null : r)
                      }
                      className="w-5 h-5 text-orange-500 focus:ring-orange-400"
                    />
                    <div className="flex items-center gap-1">
                      {renderStars(r)}
                      <span className="text-sm text-gray-600 ml-1">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-green-700 mb-4">
                Price range
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #FB923C 0%, #FB923C ${
                      (priceRange / 500) * 100
                    }%, #E5E7EB ${(priceRange / 500) * 100}%, #E5E7EB 100%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span className="font-semibold text-orange-600">
                    ${priceRange}
                  </span>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-green-700 mb-4">
                Category
              </h3>
              <div className="space-y-3">
                {[
                  "Sneakers",
                  "Boots",
                  "T-Shirt",
                  "Hoodie",
                  "Jeans",
                  "Jacket",
                ].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() =>
                        setSelectedCategory(
                          selectedCategory === cat ? null : cat
                        )
                      }
                      className="w-5 h-5 text-orange-500 focus:ring-orange-400"
                    />
                    <span className="text-gray-700">
                      Category {cat.split(" ")[0]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar producto"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-full border border-orange-200 focus:outline-none focus:border-orange-400 text-gray-700"
                    />
                    <Search className="absolute left-4 top-3.5 w-6 h-6 text-orange-400" />
                  </div>
                </div>

                <div className="flex items-center gap-6 ml-8">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-6 py-3 rounded-full bg-orange-50 text-orange-700 font-medium border border-orange-200 focus:outline-none appearance-none cursor-pointer flex items-center gap-2"
                  >
                    <option value="rating">Organizar por</option>
                    <option value="rating">Mejor valoración</option>
                    <option value="price">Precio: menor a mayor</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-orange-700 -ml-12 pointer-events-none" />
                </div>
              </div>
            </header>
            <div className="grid grid-cols-3 gap-6 mt-5">
              {filteredAndSorted.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="relative">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-64 object-cover"
                    />
                    <button className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition">
                      <ShoppingCart className="w-6 h-6 text-green-600" />
                    </button>
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-orange-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex ml-auto">
                        {renderStars(product.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
