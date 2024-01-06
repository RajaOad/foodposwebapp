import { useState } from "react";
import Card from "./index";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ConfirmDailog } from "../../components/ConfirmDailog";
import UpdateProduct from "../../components/UpdateProduct";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const NftCard = ({ product, handleDelete, handleUpdate, extra }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  return (
    <>
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={(serverUrl + product.imageUrl) || ""}
            className="mb-3 h-[34vh] w-full rounded-xl 3xl:h-full 3xl:w-full object-cover"
            alt=""
          />
          <span
            className="absolute top-3 left-3 flex items-center justify-center rounded-full bg-brand-500 p-2 text-white"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-xs">
             {product.category.name}
            </div>
          </span>
        </div>

        <div className="flex space-x-4 justify-end">
            <span onClick={()=> setIsOpen(true)}  className="cursor-pointer">
                <TrashIcon className="h-6 w-6 text-red-900 hover:text-red-700" />
            </span>
            <span onClick={()=> setShowUpdateForm(true)}  className="cursor-pointer">
                <PencilSquareIcon className="h-6 w-6 text-blue-900 hover:text-blue-700" />
            </span>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {product.name}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              {product.description}
            </p>
          </div>

        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              Price:  &#x20A8;{product.price}
            </p>
          </div>
          
        </div>
      </div>
    </Card>

<ConfirmDailog isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={handleDelete} itemId={product._id} />
<UpdateProduct isOpen={showUpdateForm} setIsOpen={setShowUpdateForm} handleUpdate={handleUpdate} productData={product} />

</>
  );
};

export default NftCard;
