"use client";

import { Product, Review } from "@/app/types/types";
import { RatingStars } from "./RatingStars";

type ProductPageReviewsProps = {
  product: Product;
};

export const ProductPageReviews = ({ product }: ProductPageReviewsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {product.reviews.map((review: Review) => (
        <div
          key={review.reviewerEmail}
          className="border rounded-md p-4 shadow-sm flex flex-col gap-y-1"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-400">
              {review.reviewerName}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString("en-EN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="mb-2">
            <div className="flex flex-row gap-x-2 items-center">
              <RatingStars rating={product.rating} />
              <span className="text-gray-400 text-sm">
                ({product.rating.toPrecision(2)})
              </span>
            </div>
          </div>
          <p className="text-foreground">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};
