"use client";

import { ProductType } from "@/interfaces";
import { FC } from "react";
import Link from "next/link";
import CustomImage from "./Image";

const Product: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="h-96 flex flex-col p-6 rounded-lg group hover:scale-105 transition-transform duration-300 ease-out border"
    >
      <div className="relative max-h-80 flex-1">
        <CustomImage product={product} fill/>
      </div>

      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font mt-5">
        {product.category}
      </h3>
      <div className="flex items-center justify-between mt-4 mb-2 font-semibold">
        <p className="w-44 truncate">{product.title}</p>
        <p>${product.price}</p>
      </div>
      <p className="leading-relaxed text-base line-clamp-2">
        {product.description}
      </p>
    </Link>
  );
};

export default Product;
