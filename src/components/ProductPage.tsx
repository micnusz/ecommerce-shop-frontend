"use client";

import { fetchProductBySlug } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/lib/store/useStore";
import { useState, useEffect } from "react";
import { RatingStars } from "./RatingStars";

type ProductPageProps = {
  slug: string;
};

export const ProductPage = ({ slug }: ProductPageProps) => {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
  });

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const addItem = useCartStore((state) => state.addItem);

  const finalPrice = (price: number, discountPercentage: number): number => {
    return +(price * (1 - discountPercentage / 100)).toFixed(2);
  };

  useEffect(() => {
    if (product) setMainImage(product.thumbnail);
  }, [product]);

  if (isLoading || !product) {
    return (
      <div className="flex items-center justify-center py-16">
        <span className="text-gray-500 animate-pulse">Loading product...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-16 lg:px-24 py-8 flex flex-col md:flex-row gap-8 rounded-md shadow-md ">
      {/* Lewa kolumna: zdjęcia */}
      <div className="w-full md:w-1/2 flex flex-col items-center gap-4  rounded-md p-4">
        {/* Duże zdjęcie */}
        <div className="w-full flex items-center justify-center rounded-md p-2">
          <Image
            src={mainImage!}
            alt={product.title}
            className="object-contain"
            width={400}
            height={400}
          />
        </div>

        {/* Miniaturki */}
        <div className="flex flex-row gap-2 overflow-x-auto">
          {product.images.map((image) => (
            <div
              key={image}
              className={`border rounded cursor-pointer ${
                mainImage === image ? "border-gray-500" : ""
              }`}
              onClick={() => setMainImage(image)}
            >
              <Image
                src={image}
                alt={product.title}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prawa kolumna: info */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold break-all w-full">
            {product.title}
          </h1>
          <h2 className="text-lg text-gray-400">{product.brand}</h2>
        </div>

        <p className="text-md">{product.description}</p>

        <div className="flex flex-row gap-x-2 items-center">
          <RatingStars rating={product.rating} />
          <span className="text-gray-400 text-sm">
            ({product.rating.toPrecision(2)})
          </span>
        </div>

        <div className="text-xl font-semibold text-destructive">
          ${finalPrice(product.price, product.discountPercentage)}
        </div>

        <div className="flex flex-col gap-y-2">
          <span className="text-sm text-gray-400">
            {product.availabilityStatus} (
            <span className="text-gray-400">{product.stock}</span>)
          </span>

          <div className="flex flex-row gap-x-2 items-center ">
            <span>Quantity:</span>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 border rounded px-2 py-1 text-center"
            />
          </div>

          <Button onClick={() => addItem(product, quantity)}>
            Add to cart
          </Button>
        </div>

        <div>
          <span className="text-xs text-gray-400">Sku: {product.sku}</span>
        </div>
      </div>
    </div>
  );
};
