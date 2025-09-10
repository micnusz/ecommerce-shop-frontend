"use client";
import { Product } from "@/app/types/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { RatingStars } from "./RatingStars";
import { useCartStore } from "@/lib/store/useStore";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addItem);

  const finalPrice = (price: number, discountPercentage: number): number => {
    return +(price * (1 - discountPercentage / 100)).toFixed(2);
  };
  return (
    <Card className="flex flex-col rounded-lg shadow-lg overflow-hidden relative">
      <div className="absolute top-2 right-2">
        <Badge variant="outline">{product.category}</Badge>
      </div>
      <CardContent className="px-4 py-2 flex flex-col gap-y-6">
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 25vw"
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <div>
            <h3 className="text-sm text-gray-400">{product.brand}</h3>
            <h3 className="text-md font-semibold">{product.title}</h3>
          </div>
          <div className="flex flex-row gap-x-2">
            <span>
              <RatingStars rating={product.rating} />
            </span>
            <span className="text-gray-400 text-sm">
              ({product.rating.toPrecision(2)})
            </span>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-xs text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-md font-bold text-red-400">
              ${finalPrice(product.price, product.discountPercentage)}
            </p>
          </div>
        </div>
        <div>
          <Button
            className="rounded-2xl hover:bg-accent transition duration-300 "
            variant="destructive"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
