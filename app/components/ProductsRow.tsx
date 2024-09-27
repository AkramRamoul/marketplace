import Link from "next/link";
import Product, { LoadingProduct } from "./Product";
import { GetData, GetProductByCategory } from "@/actions/actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface iAppProps {
  category: "newest" | "template" | "uikit" | "icon";
}

const getData = async ({ category }: iAppProps) => {
  switch (category) {
    case "newest": {
      return await GetData();
    }
    case "template":
    case "uikit":
    case "icon":
      return await GetProductByCategory(category);
    default:
      notFound();
  }
};
function ProductsRow({ category }: iAppProps) {
  return (
    <section className="mt-12">
      <Suspense fallback={<LoadingState />}>
        <LaodingRows category={category} />
      </Suspense>
    </section>
  );
}

export default ProductsRow;

async function LaodingRows({ category }: iAppProps) {
  const data = await getData({ category: category });
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          {data.title}
        </h2>
        <Link
          href={data.link}
          className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {data.data.map((product) => (
          <Product
            images={product.images}
            name={product.name}
            price={product.price}
            smallDescription={product.smallDescription}
            id={product.id}
            key={product.id}
          />
        ))}
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <div>
      <Skeleton className="h-8 w-56 " />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
      </div>
    </div>
  );
}
