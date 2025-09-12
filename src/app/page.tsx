"use server";

import { ProductsGrid } from "@/components/ProductsGrid";

export default async function Home() {
  return (
    <div className="flex flex-col px-4 py-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 gap-y-4">
      <ProductsGrid />
    </div>
  );
}
