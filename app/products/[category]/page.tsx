import { GetProductBycat } from "@/actions/actions";
import Product from "@/app/components/Product";
import { categoryTypes } from "@prisma/client";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

const getData = async (category: string) => {
  let input;

  switch (category) {
    case "template": {
      input = "template";
      break;
    }
    case "uikit": {
      input = "uikit";
      break;
    }
    case "icon": {
      input = "icon";
      break;
    }
    case "all": {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }
  const data = await GetProductBycat(input as categoryTypes);

  return data;
};
async function CategoryPage({ params }: { params: { category: string } }) {
  noStore();
  const products = await getData(params.category);
  return (
    <section className="max-7xl mx-auto px-4 md:px-8 mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {products.map((product) => (
          <Product
            key={product.id}
            images={product.images}
            price={product.price}
            name={product.name}
            id={product.id}
            smallDescription={product.smallDescription}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;
