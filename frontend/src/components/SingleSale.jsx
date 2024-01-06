import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/user/UserContext';

const SingleSale = () => {
  const navigate = useNavigate();
  const { authenticated, authToken } = useContext(UserContext);


  const { id } = useParams();
  const [sale, setSale] = useState(null);

  useEffect(() => {

    if(!authenticated) {
      navigate('/login');
    }

    const fetchSingleSale = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/sale/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setSale(data);
      } catch (error) {
        console.error('Error fetching single sale:', error);
      }
    };

    fetchSingleSale();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!sale) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Sale Details</h1>
      <div className="border p-4 rounded">
        <h2 className="text-xl mb-2">Sale ID: {sale._id}</h2>
        <h3>Date: {formatDate(sale.saleDate)}</h3>
        <h3 className="text-lg mt-4">Products:</h3>
        <ul>
          {sale.items.map((item) => (
            <li key={item._id}>
              Product ID: {item.product._id} - Product Name: {item.product.name} - Quantity: {item.quantity} - Total Price: ${item.totalPrice}
            </li>
          ))}
        </ul>
        <p>Total Quantity: {sale.totalQuantity}</p>
        <p>Grand Total: ${sale.grandTotal}</p>
      </div>
    </div>
  );
};

export default SingleSale;
