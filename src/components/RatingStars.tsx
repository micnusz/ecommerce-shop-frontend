"use client";

import { Star } from "lucide-react";

type RatingStarsProps = {
  rating: number;
  maxRating?: number;
  size?: number;
};

export const RatingStars = ({
  rating,
  maxRating = 5,
  size = 20,
}: RatingStarsProps) => {
  const stars = Array.from({ length: maxRating }).map((_, i) => {
    const fillLevel = Math.min(Math.max(rating - i, 0), 1);
    return fillLevel;
  });

  return (
    <div className="flex items-center gap-1">
      {stars.map((fill, i) => (
        <div key={i} className="relative w-[20px] h-[20px]">
          <Star size={size} className="text-gray-600 absolute top-0 left-0" />

          <Star
            size={size}
            className="text-yellow-400 absolute top-0 left-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }}
          />
        </div>
      ))}
    </div>
  );
};
