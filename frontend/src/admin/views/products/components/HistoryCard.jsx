import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Card from "../../../components/card/index";
import UpdateCategoryDialog from "../../../components/UpdateCategoryDialog";
import { ConfirmDailog } from "../../../components/ConfirmDailog";

const HistoryCard = ({ categories, handleUpdateCategory, handleDeleteCategory }) => {
  const [isOpenMap, setIsOpenMap] = useState({});
  const [isDelCategoryOpenMap, setIsDelCategoryOpenMap] = useState({});

  const toggleDialog = (categoryId) => {
    setIsOpenMap(prevState => ({ ...prevState, [categoryId]: !prevState[categoryId] }));
  };

  const toggleDeleteDialog = (categoryId) => {
    setIsDelCategoryOpenMap(prevState => ({ ...prevState, [categoryId]: !prevState[categoryId] }));
  };

  return (
    <Card extra="mt-3 overflow-hidden">
       <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Categories
        </div>
        <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          See all
        </button>
      </div>

      <div className="px-4 py-2">
        {categories.map((category) => (
          <div key={category._id} className="mb-4 bg-white shadow-md rounded-lg p-4 hover:shadow-xl dark:bg-navy-800 dark:hover:shadow-none">
            <div className="flex justify-between items-center">
              <h5 className="text-lg font-semibold text-navy-700 dark:text-white">{category.name}</h5>
              <div className="space-x-4 flex">
                <span onClick={() => toggleDeleteDialog(category._id)} className="cursor-pointer">
                  <TrashIcon className="h-6 w-6 text-red-900 hover:text-red-700" />
                </span>
                <span onClick={() => toggleDialog(category._id)} className="cursor-pointer">
                  <PencilSquareIcon className="h-6 w-6 text-blue-900 hover:text-blue-700" />
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
            <UpdateCategoryDialog
              isOpen={isOpenMap[category._id] || false}
              setIsOpen={(value) => setIsOpenMap(prevState => ({ ...prevState, [category._id]: value }))}
              category={category}
              handleUpdateCategory={handleUpdateCategory}
            />
            <ConfirmDailog
              isOpen={isDelCategoryOpenMap[category._id] || false}
              setIsOpen={(value) => setIsDelCategoryOpenMap(prevState => ({ ...prevState, [category._id]: value }))}
              onConfirm={handleDeleteCategory}
              itemId={category._id}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HistoryCard;
