"use server";
import { ProductPage } from "@/components/ProductPage";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

const Product = async ({ params }: Props) => {
  const { slug } = params;

  if (!slug) return notFound();

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 py-6 flex flex-col gap-y-6">
      <ProductPage slug={slug} />
    </div>
  );
};

export default Product;
