import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../features/AxiosInstance/AxiosInstance";

const HomeItemDisplay = ({ product }) => {
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const [image, setImage] = useState("https://placehold.co/600x400");

  useEffect(() => {
    console.log(product.picture);
    const fetchImage = async () => {
      try {
        if (product.picture === "https://placehold.co/600x400") {
          return;
        }
        const imageResponse = await api.get(`api/Image/${product.picture}`, {
          responseType: "blob",
        });
        if (imageResponse.data) {
          const imageUrl = URL.createObjectURL(imageResponse.data);
          setImage(imageUrl);
        } else {
          setImage("https://placehold.co/600x400");
        }
      } catch (error) {
        console.log(error);
        setImage("https://placehold.co/600x400");
      }
    };

    fetchImage();
  }, []);

  return (
    <Link to="/MenuAll" className="">
      <div className="bg-white w-full rounded-lg shadow-2xl p-4">
        <img
          src={image}
          alt="Strawberry drink with cheese"
          className="w-full rounded-lg"
        />
        <div className="mt-2">
          <h3 className="text-lg font-bold mt-2 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex justify-between items-center 0">
            <p>{formatPrice(product.price)}</p>
            <div className=" flex items-center justify-center">
              <button className="p-2 rounded-full font-medium bg-primary-200 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeItemDisplay;
