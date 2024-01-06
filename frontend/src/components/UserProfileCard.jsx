import { PencilSquareIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import UpdateProfileImg from './UpdateProfileImg';
import UpdateBannerBg from './UpdateBannerBg';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const UserProfileCard = ({ userData, isAdmin, updateUserImage, updateUserBanner }) => {

  const [isOpenImgUpdate, setIsOpenImgUpdate] = useState(false);
  const [isOpenBgUpdate, setIsOpenBgUpdate] = useState(false);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <>
      <div className="dark:bg-navy-800 shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-[80%] flex-col items-center bg-white bg-cover bg-clip-border p-[16px] dark:text-white dark:shadow-none">
        
        {/* User Profile Picture */}
        <div className="relative mt-1 flex h-[40vh] w-full justify-center rounded-xl">
  {/* Banner Image */}
  <img 
    className="absolute top-0 left-0 h-full w-full object-cover rounded-xl" 
    src={userData.bannerBg ? (serverUrl + userData.bannerBg) : 'https://placehold.co/1200x300'} 
    alt="Banner Background" 
  />

  {/* User Image */}
  <div className="absolute -bottom-12 flex h-40 w-40 items-center justify-center rounded-full border-[4px] border-white">
    <div className='relative'>
      <img 
        className="h-40 w-40 object-cover rounded-full" 
        src={userData.imgUrl ? (serverUrl + userData.imgUrl) : 'https://placehold.co/400'} 
        alt={userData.username || 'Username'} 
      />
      <span className="cursor-pointer">
        <PencilSquareIcon onClick={() => setIsOpenImgUpdate(true)} className="h-6 w-6 text-blue-900 hover:text-blue-700 absolute bottom-0 right-0" />
      </span>
    </div>
  </div>

  {/* Edit Background Icon */}
  <span className="cursor-pointer">
    <PencilSquareIcon onClick={() => setIsOpenBgUpdate(true)} className="h-6 w-6 text-blue-900 hover:text-blue-700 absolute bottom-4 right-4" />
  </span>
</div>

        
        {/* User Details */}
        <div className="mt-16 flex flex-col items-center">
          <h4 className=" text-xl font-bold capitalize">{userData.username || 'Username'}</h4>
         {isAdmin && <h4 className="font-bold my-2">{userData.email || 'Email'}</h4>}
          <p className="text-base font-normal mt-2">Member since {userData.createdAt ? formatDate(userData.createdAt) : 'Date'}</p>
        </div>
        

       {!isAdmin && <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
          <div className="flex flex-col items-center justify-center">
            <h3 className=" text-2xl font-bold">{userData.orders && userData.orders.length || '0'}</h3>
            <p className=" text-sm font-normal">Orders</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className=" text-2xl font-bold">{userData.reviews || '0'}</h3>
            <p className=" text-sm font-normal">Reviews</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className=" text-2xl font-bold">{userData.points || '0'}</h3>
            <p className=" text-sm font-normal">Points</p>
          </div>
        </div>}

       {isAdmin && <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
          <div className="flex flex-col items-center justify-center">
            <h3 className=" text-2xl font-bold">{userData.products && userData.products.length || '0'}</h3>
            <p className=" text-sm font-normal">Products</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className=" text-2xl font-bold">{userData.categories && userData.categories.length || '0'}</h3>
            <p className=" text-sm font-normal">Categories </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className=" text-2xl font-bold">{userData.sales && userData.sales.length || '0'}</h3>
            <p className=" text-sm font-normal">Sales</p>
          </div>
        </div>}

      </div>

      <UpdateProfileImg isOpen={isOpenImgUpdate} setIsOpen={setIsOpenImgUpdate} updateUserImage={updateUserImage} />
      <UpdateBannerBg isOpen={isOpenBgUpdate} setIsOpen={setIsOpenBgUpdate} updateUserBanner={updateUserBanner} />
    </>
  );
}

export default UserProfileCard;
