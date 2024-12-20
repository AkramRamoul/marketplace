import { GetProductById } from "@/actions/actions";
import AddToCartButton from "@/app/components/AddToCartButton";
import ProductDescription from "@/app/components/ProductDescription";
import { unstable_noStore as noStore } from "next/cache";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/utils";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import React from "react";

async function ProductPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  noStore();

  const product = await GetProductById(id);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-y-10 xl:gap-x-16 mb-24">
      <Carousel className="lg:row-end-1 lg:col-span-4">
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <Image
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  fill
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {product.name}
        </h1>
        <p className="mt-2">{product.smallDescription}</p>
        <AddToCartButton product={product} />
        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="text-sm font-medium col-span-1 text-muted-foreground">
              Released :
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(product.createdAt)}
            </h3>
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Category :
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {product.category}
            </h3>
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Price :
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {formatPrice(product.price)}
            </h3>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-10"></div>
      </div>
      <div className="text-primary w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
        <ProductDescription content={product.description as JSONContent} />
      </div>
    </section>
  );
}

export default ProductPage;
