export const dynamic = "force-dynamic";

import Feature from "@/components/Feature";
import { ProductType } from "@/interfaces";
import Product from "@/components/Product";
import Cta from "@/components/Cta";

async function ProductsPage() {
  let products: ProductType[] = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.log("API ishlamadi, fallback data");
  }

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0">
      <Feature />
      <section className="flex flex-col space-y-12">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </div>
      </section>
      <Cta />
    </main>
  );
}

export default ProductsPage;
