import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UserContext } from '../../../context/user/UserContext';
import CardMenu from '../../components/card/CardMenu';
import { ConfirmDailog } from '../../components/ConfirmDailog';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Card from '../../components/card/index';
import { SaleContext } from '../../../context/sale/SaleContext';
import UpdateSaleForm from '../../components/UpdateSaleForm';


const SingleSale = () => {
  const navigate = useNavigate();
  const { authenticated, isAdmin } = useContext(UserContext);
  const { handleDeleteSale, handleUpdateSale, fetchSingleSale } = useContext(SaleContext);
  const { id } = useParams();
  const [sale, setSale] = useState(null);

  
  const [isOpen, setIsOpen] = useState(false);
  const [showUpdateSale, setShowUpdateSale] = useState(false);
  
  
  useEffect(() => {
    
    if(!authenticated) {
      navigate('/login');
    }
    
    if (!isAdmin) {
      navigate("/");
    }


    fetchSingleSale(id, setSale);
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!sale) {
    return <div className="container flex h-screen justify-center items-center text-4xl font-bold">Sale Not Found</div>;
  }

  return (
    <>
    <Card extra={"w-full pb-10 p-4 m-5 h-full"}>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-700 dark:text-white">Sale Details</h1>
      </header>

      <div className="bg-white p-8 rounded-md shadow-md relative dark:border dark:bg-navy-800">
      <div className="flex space-x-4 absolute top-4 right-4">
          <span onClick={() => setIsOpen(true)} className="text-red-600 cursor-pointer">
            <TrashIcon className="h-6 w-6 hover:text-red-700" />
          </span>
          <span onClick={() => setShowUpdateSale(true)} className="text-blue-600 cursor-pointer">
            <PencilSquareIcon className="h-6 w-6 hover:text-blue-700" />
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-4">Sale ID: {sale._id}</h2>
        <p className="text-gray-600 dark:text-white mb-2">Date: {formatDate(sale.saleDate)}</p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Products:</h3>
          <ul className="list-disc pl-5">
            {sale.items.map((item) => (
              <li key={item._id} className="text-gray-700 dark:text-white">
                {item.product.name} - Quantity: {item.quantity} - Total Price: ${item.totalPrice}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-700 dark:text-white mb-2">Total Quantity: {sale.totalQuantity}</p>
        <p className="text-gray-700 dark:text-white mb-2">Total Items: {sale.totalItems}</p>
        <p className="text-gray-700 dark:text-white mb-4">Grand Total: ${sale.grandTotal}</p>
      </div>
    </Card>
        <ConfirmDailog isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={handleDeleteSale} itemId={id} />
        <UpdateSaleForm isOpen={showUpdateSale} setIsOpen={setShowUpdateSale} saleData={sale} setSaleData={setSale} handleUpdateSale={handleUpdateSale} saleId={id} />
        </>
  );
};

export default SingleSale;
