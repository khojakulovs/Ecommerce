"use client";

import CustomImage from "@/components/Image";
import { ProductType } from "@/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactStars from "react-stars";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();
  const router = useRouter();

  //UseEffect
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await res.json();
        setProduct(product);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [id]);

  //HandleClick
  const handleClick = () => {
    const products:ProductType[] = JSON.parse(localStorage.getItem("carts") as string) || [];
    const isExist = products.find((item) => item.id === product?.id);

    if (isExist) {
      const updateData = products.map((item) => {
        if (item.id === product?.id)
          return { ...item, quantity: item.quantity + 1 };
        else return item;
      });

      localStorage.setItem("carts", JSON.stringify(updateData));
    } else {
      const data = [...products, { ...product, quantity: 1 }];
      localStorage.setItem("carts", JSON.stringify(data));
    }
    toast("Product added to your Bag!");
  };

  return (
    <div className="max-w-4xl flex flex-row min-h-screen mt-[110px] mx-auto py-3">
      <div className="flex-1 relative hidden md:inline">
        <div className="w-[300px] h-[400px] relative">
          {product && <CustomImage product={product} fill />}
        </div>
      </div>
      <div className="flex-1 flex flex-col max-md:px-6">
        <h3 className="font-semibold text-[30px] line-clamp-2">{product?.title}</h3>
        <h3 className="font-semibold text-[25px] text-gray-600 mb-2">
          ${product?.price}
        </h3>

        <div className="flex items-center gap-x-3 text-[19px] mb-2">
          {product?.rating.rate}
          <ReactStars value={product?.rating.rate} edit={false} />
          <p className="text-blue-600 hover:underline cursor-pointer text-sm ml-6">
            See all {product?.rating.count} reviews
          </p>
        </div>

        <div>
          <p className="line-clamp-4 mb-2 text-[16px] text-gray-500">
            {product?.description}
          </p>
        </div>

        <div className="flex flex-col mt-2 gap-y-3">
          <button
            onClick={handleClick}
            className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-blue-700 "
          >
            Add to bag
          </button>

          <button
            onClick={() => router.push("/")}
            className="button bg-transparent text-blue-600 border-blue-500 hover:border-transparent hover:bg-blue-600 hover:text-white"
          >
            Back to products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
