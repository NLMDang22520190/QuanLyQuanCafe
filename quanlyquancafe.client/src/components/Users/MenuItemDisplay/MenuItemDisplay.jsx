import React from "react";

const MenuItemDisplay = ({ product, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex md:flex-col border rounded-lg p-4 overflow-hidden bg-white shadow-2xl relative"
    >
      {product.bestSeller && (
        <div className="absolute -rotate-45 top-5 text-center w-32 -left-8 bg-red-500 text-white text-xs px-2 py-1">
          BEST SELLER
        </div>
      )}
      <img
        src={product.image}
        alt={product.alt}
        className="md:w-full w-40 h-40 object-cover mb-4 rounded-2xl"
      />

      <div className="ml-4 md:ml-0 w-full flex h-full flex-col justify-between">
        <h2 className="text-base font-semibold text-start ">{product.name}</h2>
        <div className="flex justify-between  justify-self-start">
          <p className="text-orange-500 content-center font-bold mb-2">
            {product.price}
          </p>
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-primary-200 text-white p-2 font-medium transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-full hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default MenuItemDisplay;
