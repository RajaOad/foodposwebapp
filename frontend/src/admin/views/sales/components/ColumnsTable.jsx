import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import CardMenu from "../../../components/card/CardMenu";
import Card from "../../../components/card/index";
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Make sure to import Link if you haven't
import { ConfirmDailog } from "../../../components/ConfirmDailog";
import UpdateSaleForm from "../../../components/UpdateSaleForm";

const ColumnsTable = ({ handleDelete, handleUpdateSale, sales }) => { 

  const [isOpenMap, setIsOpenMap] = useState({});
  const [showUpdateSaleMap, setShowUpdateSaleMap] = useState({});

  const toggleDeleteDialog = (saleId) => {
    setIsOpenMap(prevState => ({ ...prevState, [saleId]: !prevState[saleId] }));
  };

  const toggleUpdateDialog = (saleId) => {
    setShowUpdateSaleMap(prevState => ({ ...prevState, [saleId]: !prevState[saleId] }));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
      Sales Overview
      </h1>
    </header>

    {/* Sales Content Structure */}
    <div className="container mx-auto"> 
      <ul>
        {sales.map((sale) => (
          <div key={sale._id} className="mb-6">
            <li className="border rounded-lg p-6 shadow-md relative">
              <Link to={`/admin/sale/${sale._id}`} className="text-blue-500 hover:underline text-lg mb-2 block">
                Sale ID: {sale._id}
              </Link>
              <p className="text-black mb-2">
                Date: {formatDate(sale.saleDate)}
              </p>
              <p className="text-black mb-2">
                Total Quantity: {sale.totalQuantity}
              </p>
              <p className="text-black mb-2">
                Total Items: {sale.totalItems}
              </p>
              <p className="text-black mb-4">
                Grand Total: ${sale.grandTotal}
              </p>
              <div className="absolute top-4 right-4 flex space-x-4">
                <span onClick={() => toggleDeleteDialog(sale._id)} className="cursor-pointer">
                  <TrashIcon className="h-6 w-6 text-red-900 hover:text-red-700" />
                </span>
                {/* Uncomment below if needed */}
                <span onClick={() => toggleUpdateDialog(sale._id)} className="cursor-pointer">
                    <PencilSquareIcon className="h-6 w-6 text-blue-900 hover:text-blue-700" />
                </span>
              </div>
            </li>
            <ConfirmDailog 
                isOpen={isOpenMap[sale._id] || false} 
                setIsOpen={(value) => setIsOpenMap(prevState => ({ ...prevState, [sale._id]: value }))}
                onConfirm={handleDelete} 
                itemId={sale._id} 
              />
              <UpdateSaleForm 
                isOpen={showUpdateSaleMap[sale._id] || false} 
                setIsOpen={(value) => setShowUpdateSaleMap(prevState => ({ ...prevState, [sale._id]: value }))}
                saleData={sale} 
                handleUpdateSale={handleUpdateSale} 
                saleId={sale._id} 
              />
          </div>
        ))}
      </ul>
    </div>

  </Card>
  );
};

export default ColumnsTable;
