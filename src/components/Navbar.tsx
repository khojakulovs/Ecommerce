import Link from "next/link";
import { FaShopify } from "react-icons/fa";

function Navbar() {
  return (
    <header className="bg-gray-200 flex items-center justify-between px-4 sm:px-12 py-2.5 w-full fixed top-0 left-0 z-50 shadow-md">
      <Link href={"/"}>
        <div className="flex items-center space-x-2">
          <FaShopify className="shop-icon text-4xl text-blue-600" />
          <h2 className="text-3xl font-semibold">MyShop</h2>
        </div>
      </Link>

      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <Link href={"/"} className="mr-5 hover:text-gray-900">
          Home Page
        </Link>
        <Link href={"/products"} className="mr-5 hover:text-gray-900">
          All products
        </Link>
        <Link href={"/contacts"} className="mr-5 hover:text-gray-900">
          Contacts
        </Link>
      </nav>

      <Link href={"/shopping-cart"}>
        <button className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-blue-700">
          My Bag
        </button>
      </Link>
    </header>
  );
}

export default Navbar;
