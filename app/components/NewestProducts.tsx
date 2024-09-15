import { GetData } from "@/actions/actions";
import Link from "next/link";
import Product from "./Product";

async function NewestProducts() {
  const products = await GetData();

  return (
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          Newest Products
        </h2>
        <Link
          href="#"
          className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {products.map((product) => (
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
    </section>
  );
}

export default NewestProducts;
