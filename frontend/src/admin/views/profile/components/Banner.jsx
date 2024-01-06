import React from "react";
import Card from "../../../components/card/index";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Banner = ({ userData }) => {
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div className="relative mt-1 flex h-32 w-full justify-center rounded-xl">
  {/* Banner Image */}
  <img 
    className="absolute inset-0 h-full w-full object-cover rounded-xl" 
    src={`${ userData.bannerBg && (serverUrl + userData.bannerBg) || 'https://placehold.co/1200x300'}`} 
    alt="Banner" 
  />

  {/* Overlay Image */}
  <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
    <img 
      className="h-full w-full rounded-full" 
      src={`${ userData.imgUrl && (serverUrl + userData.imgUrl) || 'https://placehold.co/400'}`} 
      alt="" 
    />
  </div>
</div>


      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white capitalize">
          {userData.username || "Username"}
        </h4>
        <p className="text-base font-normal text-gray-600">{userData.email || "Email"}</p>
      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">{userData.products && userData.products.length || "0"}</p>
          <p className="text-sm font-normal text-gray-600">Products</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {userData.categories && userData.categories.length || "0"}
          </p>
          <p className="text-sm font-normal text-gray-600">Categories</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {userData.sales && userData.sales.length || "0"}
          </p>
          <p className="text-sm font-normal text-gray-600">Sales</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
