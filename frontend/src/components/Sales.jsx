import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user/UserContext';
// import { ConfirmDailog } from './ConfirmDailog';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';

const Sales = () => {
  const navigate = useNavigate();
  const { authenticated, authToken } = useContext(UserContext);


  const [sales, setSales] = useState([]);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {

    if (!authenticated) {
      navigate('/login');
    }

    const fetchSales = async () => {
      try {

        const response = await fetch('http://localhost:3001/api/sales', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDeleteSale = async (saleId) => {

    try {

      if (!authToken) {
        // Handle the case where the user is not authenticated
        return;
      }

      const response = await fetch(`http://localhost:3001/api/deletesale/${saleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sale deleted successfully:', data);
        Swal.fire({
          title: data.msg,
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        // Optionally, you can update your UI or perform other actions after successful deletion
      } else {
        console.error('Failed to delete sale:', data.error);
        Swal.fire({
          title: data.error,
          icon: "error",
          showConfirmButton: false,
          timer: 1500
        });
        // Handle error, e.g., display an error message to the user
      }

    } catch (error) {
      console.error('Error deleting sale:', error);
      Swal.fire({
        title: "Error deleting sale",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      });
      // Handle other errors, e.g., network issues, etc.
    }

  }



  if (sales.length <= 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-5xl font-bold text-red-700 mb-6">No Sales to Display</h1>
          <p className="text-xl text-gray-600 mb-8">Currently, there are no sales transactions available.</p>
          <p className="text-gray-500 text-center">Please create some sales or check back later to view transactions.</p>
        </div>
      </div>

    );
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Sales</h1>
      <ul>
        {sales.map((sale) => (
          <div key={sale._id}>
            <li className="border p-4 mb-4 rounded relative">
              <Link to={`/sales/${sale._id}`} className="text-blue-500 hover:underline">
                Sale ID: {sale._id}
              </Link>
              <p>Date: {formatDate(sale.saleDate)}</p>
              <p>Total Items: {sale.totalQuantity}</p>
              <p>Grand Total: ${sale.grandTotal}</p>
              <div className="flex space-x-4 mb-4 justify-end absolute top-4 right-4">
                <span onClick={() => setIsOpen(true)} className="cursor-pointer">
                  <TrashIcon className="h-6 w-6 text-red-900 hover:text-red-700" />
                </span>
                {/* <span onClick={() => setShowUpdateForm(true)} className="cursor-pointer">
                <PencilSquareIcon className="h-6 w-6 text-blue-900 hover:text-blue-700" />
            </span> */}
              </div>
            </li>
            {/* <ConfirmDailog isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={handleDeleteSale} itemId={sale._id} /> */}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sales;
