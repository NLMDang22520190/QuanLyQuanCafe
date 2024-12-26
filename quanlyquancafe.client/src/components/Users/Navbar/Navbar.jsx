import React from "react";
import logo from "../../../assets/radlogo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCartDetailsByCustomerId } from "../../../features/Cart/Cart";

const Navbar = () => {
  const [itemsCount, setItemsCount] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  // Fetch cart details when the component renders or when auth or cart.items change
  useEffect(() => {
    if (auth.isAuthenticated) {
      // Fetch cart items only when the user is authenticated
      dispatch(fetchCartDetailsByCustomerId(auth.user));
    }
  }, [auth.isAuthenticated, cart.items, dispatch]); // Dependencies: khi cart.items hoặc auth.isAuthenticated thay đổi

  useEffect(() => {
    if (cart.items.length !== itemsCount) {
      setItemsCount(cart.items.length);
      console.log("Cart items changed:", cart.items.length);
    }
  }, [cart.items, itemsCount]);
  return (
    <nav className="bg-primary-50 opacity-90 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-16"></img>
            <span className="invisible md:visible w-0 md:w-full text-2xl text-primary-500 font-bold">
              Rise And Drink
            </span>
          </Link>
          <div className="ml-4 md:ml-8 space-x-4">
            <Link
              to="/MenuAll"
              className="text-lg font-medium text-primary-400 hover:underline hover:underline-offset-8"
            >
              Menu
            </Link>
            <Link
              to="/"
              className="text-lg whitespace-nowrap text-primary-400 hover:underline hover:underline-offset-8"
            >
              Theo dõi đơn hàng
            </Link>
          </div>
        </div>
        <div className="flex gap-4">
          <Link
            to="/auth/login"
            class="flex group items-center justify-center p-2 bg-white transition-colors  hover:bg-primary-500 rounded-full"
          >
            <svg
              className="scale-75 size-10 text-primary-500 transition-colors group-hover:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
          <Link
            to="/order-confirmation"
            class="flex group items-center justify-center p-2 bg-white transition-colors  hover:bg-primary-500 rounded-full"
          >
            <div class="relative scale-75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-10 text-primary-500 transition-colors group-hover:text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <span class="absolute -top-2 left-6 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
                {itemsCount}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
