"use server";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

const ProductPage = async ({ params }: Props) => {
  const { slug } = params;

  if (!slug) return notFound();

  return <h1>hej</h1>;
};

export default ProductPage;
