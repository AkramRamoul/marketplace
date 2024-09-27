import { GetUserProducts } from "@/actions/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Product from "../components/Product";

async function ProductsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const products = await GetUserProducts(user.id);
  return (
    <section className="max-w-7xl mx-auto px-auto px-4 md:px-8">
      <h1 className="text-2xl font-bold">My Products</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-4">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            images={product.images}
            price={product.price}
            smallDescription={product.smallDescription}
            name={product.name}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
