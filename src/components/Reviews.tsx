import { Product } from "@/lib/types";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

export default function Reviews({ product }: { product: Product }) {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll
    ? product.reviews
    : product.reviews.slice(0, 3);

  return (
    <div className="space-y-1 md:space-y-3">
      <div className="bg-white py-2 px-3 md:px-6 md:py-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex  justify-between mb-2 md:mb-4 flex-col md:flex-row ">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-xs text-gray-600">
              ({product.reviews.length} reviews)
            </span>
          </div>
        </div>

        <div className="md:gap-3 md:mb-4 flex flex-col md:grid md:grid-cols-5 justify-between">
          {[5, 4, 3, 2, 1].map((rating) => {
            const total = product.reviews.length;
            const count = product.reviews.filter(
              (r) => r.rating === rating
            ).length;
            const percentage = Math.round(total ? (count / total) * 100 : 0);

            return (
              <div className="flex items-center space-px-2 gap-1" key={rating}>
                <span className="text-xs text-gray-600">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80%]">
                  <div
                    className={`bg-yellow-400 h-2 rounded-full `}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 ">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>{" "}
      {displayedReviews.map((review, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 py-2 px-3 md:px-6 md:py-4 rounded-xl shadow-sm "
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-xs md:text-sm  text-gray-900">
                    {review.username}
                  </h4>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Verified Purchase
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(review.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(review.date)
                      .toLocaleDateString()
                      .replaceAll("/", "-")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="font-medium text-xs text-gray-900">
            {review.comment}
          </div>

          <div className="flex items-center justify-between mt-2 border-t-gray-500">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-xs">Helpful</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors">
                <ThumbsDown className="h-4 w-4" />
                <span className="text-xs">Not helpful</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      {product.reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full text-center text-sm font-medium text-gray-800 hover:text-blue-500 hover:underline mt-2"
        >
          {showAll ? "Show Less Reviews" : "Show All Reviews"}
        </button>
      )}
    </div>
  );
}
