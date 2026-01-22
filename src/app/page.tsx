"use client";

import Cta from "@/components/Cta";
import Product from "@/components/Product";
import { ProductType } from "@/interfaces";
import Statistic from "@/components/Statistic";

export default async function Home() {
  let products: ProductType[] = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    products = await res.json();
    
  } catch (e) {
    console.error("API ishlamadi:", e);
  }

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0">
      <section className="flex flex-col space-y-12 mt-[100px]">
        <h1 className="text-center text-5xl font-bold">
          MY SHOP <span className="text-blue-600">DEALS</span>
        </h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </div>
      </section>
      <Cta />
      <Statistic />
    </main>
  );
}
