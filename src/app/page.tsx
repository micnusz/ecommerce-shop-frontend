"use server";

import { ProductsGrid } from "@/components/ProductsGrid";

export default async function Home() {
  return (
    <div className="flex flex-col container-padding">
      <ProductsGrid />
    </div>
  );
}
