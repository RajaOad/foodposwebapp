import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography, Select, Option } from "@material-tailwind/react";
import { ProductContext } from '../../../../context/product/ProductContext';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const UpdateOrderDialog = ({ orderId, orderData, onUpdateOrder, isOpen, setIsOpen }) => {
  const { products } = useContext(ProductContext);
  
  const [order, setOrder] = useState({
    ...orderData,
    totalItems: orderData.products.length,
  });
  const [selectedProductId, setSelectedProductId] = useState('');
  const [deliveryDetails, setDeliveryDetails] = useState(orderData.deliveryDetails || {});
  const [deliveryOption, setDeliveryOption] = useState(orderData.deliveryOption || 'Delivery');
  const [status, setStatus] = useState(orderData.status || 'Pending');
  const [completionStatus, setCompletionStatus] = useState(orderData.completionStatus || 'Not Completed');
  const [cancellationStatus, setCancellationStatus] = useState(orderData.cancellationStatus || 'Not Cancelled');
  const [totalQuantity, setTotalQuantity] = useState(0); // Initialize totalQuantity


  useEffect(() => {
    const calculatedTotalQuantity = orderData.products.reduce((acc, item) => acc + item.quantity, 0);
    setOrder(prevOrder => ({
      ...prevOrder,
      ...orderData,
      totalItems: orderData.products.length,
    }));
    setTotalQuantity(calculatedTotalQuantity); // Update totalQuantity here
  }, [orderData]);

  const updateOrder = (updatedItems) => {
    let totalAmount = 0;
    updatedItems.forEach((item) => {
      totalAmount += item.totalPrice;
    });
    setOrder({ ...order, products: updatedItems, grandTotal: totalAmount });
  };

// ...

const handleQuantityChange = (index, change) => {
    const updatedItems = [...order.products];
    
    if (updatedItems[index].quantity === 1 && change === -1) {
      return;
    }
  
    updatedItems[index].quantity += change;
    updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].productId.price;
  
    updateOrder(updatedItems);
  
    // Update totalQuantity when quantity changes
    setTotalQuantity(prevTotalQuantity => prevTotalQuantity + change);
  };
  
  const handleAddProduct = (productId) => {
    const selectedProduct = products.find(product => product._id === productId);
  
    if (!selectedProduct) {
      console.error('Selected product not found');
      return;
    }
  
    const existingItemIndex = order.products.findIndex(item => item.productId._id === productId);
  
    if (existingItemIndex !== -1) {
      const updatedItems = [...order.products];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].totalPrice = updatedItems[existingItemIndex].quantity * selectedProduct.price;
      updateOrder(updatedItems);
    } else {
      const newItem = {
        productId: selectedProduct,
        quantity: 1,
        totalPrice: selectedProduct.price
      };
  
      setOrder(prevOrder => ({
        ...prevOrder,
        products: [...prevOrder.products, newItem],
        totalItems: prevOrder.totalItems + 1,
      }));
    }
  
    // Increase totalQuantity by 1 when a new product is added
    setTotalQuantity(prevTotalQuantity => prevTotalQuantity + 1);
  };
  
  const handleRemoveProduct = (index) => {
    const removedItem = order.products[index];
  
    setOrder(prevOrder => ({
      ...prevOrder,
      products: prevOrder.products.filter((_, i) => i !== index),
      totalItems: prevOrder.totalItems - 1,
    }));
  
    // Decrease totalQuantity by the quantity of the removed product
    setTotalQuantity(prevTotalQuantity => prevTotalQuantity - removedItem.quantity);
  };
  
  // ...
  
  

  return (
    <Dialog size='xxl' open={isOpen} handler={() => setIsOpen(!isOpen)} className="w-[80%]  dark:bg-navy-800 dark:text-white">
      <DialogHeader>Update Order</DialogHeader>
      <DialogBody className="max-h-[100vh] space-x-16 flex overflow-y-auto p-6 px-16">

        <div className='flex-1'>

      <div className="mb-4">
        <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">Delivery Details</Typography>
        <input 
          type="text" 
          value={deliveryDetails.address || ''} 
          onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })} 
          placeholder="Enter Address" 
          className="w-full p-2 border rounded-md"
        />
        <input 
          type="text" 
          value={deliveryDetails.city || ''} 
          onChange={(e) => setDeliveryDetails({ ...deliveryDetails, city: e.target.value })} 
          placeholder="Enter City" 
          className="w-full p-2 border rounded-md mt-2"
        />
        <input 
          type="tel" 
          value={deliveryDetails.phone || ''} 
          onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })} 
          placeholder="Enter Phone" 
          className="w-full p-2 border rounded-md mt-2"
        />
        <input 
          type="text" 
          value={deliveryDetails.zipCode || ''} 
          onChange={(e) => setDeliveryDetails({ ...deliveryDetails, zipCode: e.target.value })} 
          placeholder="Enter Zip Code" 
          className="w-full p-2 border rounded-md mt-2"
        />
      </div>

      {/* Dropdowns for New Details */}
      <div className="mb-4">
        <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">Delivery Option</Typography>
        <Select
          value={deliveryOption}
          onChange={(value) => setDeliveryOption(value)}
          className="w-full"
        >
          <Option value="Delivery">Delivery</Option>
          <Option value="Pickup">Pickup</Option>
        </Select>
      </div>

      <div className="mb-4">
        <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">Status</Typography>
        <Select
          value={status}
          onChange={(value) => setStatus(value)}
          className="w-full"
        >
          <Option value="Pending">Pending</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Picked Up">Picked Up</Option>
        </Select>
      </div>

      <div className="mb-4">
        <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">Completion Status</Typography>
        <Select
          value={completionStatus}
          onChange={(value) => setCompletionStatus(value)}
          className="w-full"
        >
          <Option value="Not Completed">Not Completed</Option>
          <Option value="Completed">Completed</Option>
          <Option value="In Progress">In Progress</Option>
        </Select>
      </div>

      <div className="mb-4">
        <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">Cancellation Status</Typography>
        <Select
          value={cancellationStatus}
          onChange={(value) => setCancellationStatus(value)}
          className="w-full"
        >
          <Option value="Not Cancelled">Not Cancelled</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      </div>

      </div>

<div className='flex-1'>

{order.products.map((item, index) => (
  <div key={index} className="border p-2 flex items-center justify-between relative rounded-md shadow-sm mb-2 hover:shadow-md transition duration-200">
    <div className='flex items-center'>
    <img src={(serverUrl + item.productId.imageUrl) || ""} alt="Item" className="h-16 w-16 mr-2 object-cover rounded-md" />
    <div className="flex-grow">
      <p className="font-semibold text-base">{item.productId.name}</p>
      <p className="text-gray-600 text-sm">&#x20A8;{item.productId.price} | Qty: {item.quantity}</p>
    </div>
    </div>

    <div>
    <p className="font-semibold text-base mt-1">Total &#x20A8;{item.totalPrice}</p>
    </div>
    
    <div className="flex items-center space-x-2">
      <button onClick={() => handleQuantityChange(index, -1)} className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-sm">-</button>
      <span className="text-base">{item.quantity}</span>
      <button onClick={() => handleQuantityChange(index, 1)} className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-sm">+</button>
    </div>
    <button onClick={() => handleRemoveProduct(index)} className="text-red-500 mr-4 hover:text-red-700 font-bold transition duration-200">X</button>
  </div>
))}


        <div className="mb-6">
          <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">
            Add Product to Order
          </Typography>
          <Select
            value={selectedProductId}
            onChange={(id) => {
              setSelectedProductId(id);
              handleAddProduct(id);
            }}
            className="w-full  dark:bg-navy-900"
          >
            <Option value="" disabled>Select a Product</Option>
            {products.map((product) => (
              <Option key={product._id} value={product._id} className=' dark:bg-navy-900'>
                {product.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mb-4 flex space-x-4 items-center">
        <Typography variant="small" color="blue-gray" className=" font-semibold">Total Quantity</Typography>
        <p className='border-2 border-[#000] font-semibold px-2 rounded-md'>{totalQuantity}</p>
      </div>

        <div className="mb-4 flex space-x-4 items-center">
      <Typography variant="small" color="blue-gray" className=" font-semibold">Total Items</Typography>
      <p className='border-2 border-[#000] font-semibold px-2 rounded-md'>{order.totalItems}</p>
    </div>

        <p className="font-semibold text-xl mt-2">Grand Total:  &#x20A8;{order.grandTotal}</p>
        
        </div>

      </DialogBody>
      <DialogFooter>
        <Button onClick={() => setIsOpen(!isOpen)} color="red">
          Close
        </Button>
        <Button onClick={() => {
          onUpdateOrder({
            ...order,
            deliveryDetails,
            deliveryOption,
            status,
            completionStatus,
            cancellationStatus,
            totalQuantity
          }, orderId, () => setIsOpen(!isOpen));
        }} color="blue">
          Update Order
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateOrderDialog;
