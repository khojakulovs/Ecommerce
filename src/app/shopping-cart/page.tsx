"use client";
import CustomImage from "@/components/Image";
import ReactStars from "react-stars";
import { IoClose } from "react-icons/io5";
import { ProductType } from "@/interfaces";
import { useEffect, useState } from "react";
import Link from "next/link";

function ShoppingCart() {
  const [products, setProducts] = useState<ProductType[]>(
    JSON.parse(localStorage.getItem("carts") as string) || [],
  );
  const [total, setTotal] = useState<number>(0);

  //RemoveCart
  const removeCart = (id: number) => {
    const updateCart = products.filter((item) => item.id !== id);
    localStorage.setItem("carts", JSON.stringify(updateCart));
    setProducts(updateCart);
  };

  //HandleIncrement
  const handleIncrement = (id: number) => {
    const updateIncrement = products.map((item) => {
      if (item.id === id) return { ...item, quantity: item.quantity + 1 };
      else return item;
    });
    localStorage.setItem("carts", JSON.stringify(updateIncrement));
    setProducts(updateIncrement);
  };

  //HandleDecrement
  const handleDecrement = (id: number) => {
    const existProduct = products.find((item) => item.id === id);

    if (existProduct?.quantity === 1) {
      removeCart(existProduct.id);
    } else {
      const updataDecrement = products.map((item) => {
        if (item.id === id) return { ...item, quantity: item.quantity - 1 };
        else return item;
      });
      localStorage.setItem("carts", JSON.stringify(updataDecrement));
      setProducts(updataDecrement);
    }
  };

  //Total
  useEffect(() => {
    const updataTotal = products.reduce((acc, curVal) => {
      return acc + curVal.price * curVal.quantity;
    }, 0);
    setTotal(updataTotal);
  }, [products]);

  return (
    <>
      {products.length ? (
        <div className="min-h-screen max-w-[950px] mx-auto mt-20">
          <h1 className="text-center font-semibold text-3xl mb-6">Cart Items</h1>

          <div className="flex max-md:flex-col flex-row gap-x-5">
            {/* List Cart */}
            <div className="flex flex-[2] flex-col gap-x-7 mt-5">
              {products.length !== 0 &&
                products.map((item) => {
                  return (
                    <div key={item.id} className="flex flex-col flex-[2] py-3 border rounded shadow-md mb-6">
                      <div className="flex flex-row">
                        <div className="flex flex-1">
                          <div className="w-32 h-32 relative">
                            <CustomImage product={item} fill />
                          </div>
                        </div>
                        <div className="flex flex-col flex-[2] gap-y-2">
                          <h3 className="font-semibold line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 text-[12px] line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex gap-x-2">
                            {item?.rating?.rate}
                            <ReactStars
                              value={item?.rating?.rate}
                              edit={false}
                            />
                            <p className="text-blue-600 hover:underline cursor-pointer text-xs ml-6">
                              See all {item?.rating?.count} reviews
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 gap-y-6">
                          <div className="flex justify-center gap-x-[2px]">
                            <span
                              onClick={() => handleDecrement(item.id)}
                              className="bg-gray-200 rounded px-3 hover:bg-blue-600 hover:text-white"
                            >
                              -
                            </span>
                            <span className="bg-white rounded px-3">
                              {item.quantity}
                            </span>
                            <span
                              onClick={() => handleIncrement(item.id)}
                              className="bg-gray-200 rounded px-3 hover:bg-blue-600 hover:text-white"
                            >
                              +
                            </span>
                          </div>
                          <div className="flex items-center flex-row justify-center gap-x-4">
                            <p className="text-[17px] font-semibold">
                              {(
                                item.price * (item.quantity ?? 1)
                              ).toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </p>
                            <IoClose
                              onClick={() => removeCart(item.id)}
                              className="text-[18px] cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Summary */}
            <div className="flex flex-col border flex-1 p-5 rounded shadow-md max-h-[200px]">
              <div className="flex flex-row justify-between mb-4">
                <div className="flex flex-col">
                  <p className="text-[15px]">Subtotal</p>
                  <p className="text-[15px]">Shipping</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[15px]">
                    {total.toLocaleString("en-Us", {
                      currency: "usd",
                      style: "currency",
                    })}
                  </p>
                  <p className="text-[15px]">
                    {(10).toLocaleString("en-US", {
                      currency: "usd",
                      style: "currency",
                    })}
                  </p>
                </div>
              </div>

              <div className="border-t flex justify-between py-4">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">
                  {(total + 10).toLocaleString("en-US", {
                    currency: "usd",
                    style: "currency",
                  })}{" "}
                  USD
                </p>
              </div>
              <button className="font-semibold border bg-blue-600 text-white py-2 rounded hover:text-blue-600 hover:bg-inherit hover:border-blue-600 transition duration-200 ease-in-out">
                Check out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <section className="bg-white mt-[100px]">
          <div className="py-8 px-4 mx-auto max-w-screen lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="text-5xl font-semibold">
                Shopping cart is empty!
              </h1>
              <p className="my-6 text-lg font-light text-gray-600 dark:text-gray-400">
                Your cart is feeling a little lonely It’s empty right now — no
                snacks, no shoes, not even one tiny item. Go ahead, explore our
                store and give your cart something to be happy about!{" "}
              </p>
              <Link href="/products">
                <button className="button px-7 mt-7 py-2 bg-blue-600 text-white hover:bg-transparent hover:text-blue-600 hover:border-blue-600">
                  Products
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ShoppingCart;
