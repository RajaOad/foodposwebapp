import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography, Select, Option } from "@material-tailwind/react";
import { ProductContext } from '../../context/product/ProductContext';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const UpdateSaleForm = ({ saleId, saleData, setSaleData, handleUpdateSale, isOpen, setIsOpen }) => {
  const { authToken } = useContext(UserContext);
  const { products } = useContext(ProductContext);
  const [selectedProductId, setSelectedProductId] = useState('');

  const handleOpen = ()=> {
    setIsOpen(!isOpen)
  }

  const [sale, setSale] = useState({
    items: [],
    totalQuantity: 0,
    totalItems: 0,
    grandTotal: 0
  });

  useEffect(() => {

    setSale(saleData)

  }, [saleId, authToken]);

  const updateSale = (updatedItems) => {
    let uniqueProductCount = updatedItems.length; // Count of unique products
    let grandTotal = 0;
    let totalQuantity = 0; // Initialize totalQuantity
    updatedItems.forEach((item) => {
      grandTotal += item.totalPrice;
      totalQuantity += item.quantity; // Sum up quantities
    });
    setSale({ ...sale, items: updatedItems, totalItems: uniqueProductCount, grandTotal, totalQuantity }); // Add totalQuantity to the state
  };
  

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...sale.items];
    if (updatedItems[index].quantity === 1 && change === -1) {
      return; // Prevent decreasing quantity below 1
    }
    updatedItems[index].quantity += change;
    updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].product.price;
    updateSale(updatedItems);
  };
  
  const handleRemoveProduct = (index) => {
    const removedQuantity = sale.items[index].quantity;
    const updatedItems = sale.items.filter((_, i) => i !== index);
    
    // Calculate the new total quantity after removing the product
    const newTotalQuantity = sale.totalQuantity - removedQuantity;
    
    // Ensure the new total quantity is not negative
    const positiveTotalQuantity = Math.max(0, newTotalQuantity);
    
    // Calculate the new total items count after removing the product
    const newTotalItems = updatedItems.length;
    
    // Update the sale state
    setSale(prevSale => ({ 
      ...prevSale, 
      items: updatedItems,
      totalQuantity: positiveTotalQuantity,  // Use the new total quantity value
      totalItems: newTotalItems  // Update the totalItems count
    }));
  };
  

  const handleAddProduct = (productId) => {
    const selectedProduct = products.find(product => product._id === productId);
    if (!selectedProduct) {
      console.error('Selected product not found');
      return;
    }
    const existingItemIndex = sale.items.findIndex(item => item.product._id === productId);
    if (existingItemIndex !== -1) {
      const updatedItems = [...sale.items];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].totalPrice = updatedItems[existingItemIndex].quantity * selectedProduct.price;
      updateSale(updatedItems);
    } else {
      const newItem = {
        product: selectedProduct,
        quantity: 1,
        totalPrice: selectedProduct.price
      };
      setSale(prevSale => ({
        ...prevSale,
        items: [...prevSale.items, newItem],
        totalItems: prevSale.totalItems + 1,
        grandTotal: prevSale.grandTotal + selectedProduct.price,
        totalQuantity: prevSale.totalQuantity + 1 // Add quantity of the new product
      }));
    }
    setSelectedProductId('');
  };
  




  


  
  return (
     <Dialog size='lg' open={isOpen} handler={handleOpen} className="w-[80%] dark:bg-navy-800 dark:text-white">
      <DialogHeader>Update Sale</DialogHeader>
      <DialogBody className="max-h-[60vh] overflow-y-auto p-6">

        {/* Display Items */}
        {sale ? sale.items.map((item, index) => (
  <div key={index} className="border p-2 flex  dark:bg-navy-900 items-center justify-between relative rounded-md shadow-sm mb-2 hover:shadow-md transition duration-200">
    <div className='flex items-center'>
      <img src={item.product.imageUrl ? (serverUrl + item.product.imageUrl) : ""} alt="Item" className="h-16 w-16 mr-2 object-cover rounded-md" />
      <div className="flex-grow">
        <p className="font-semibold text-base">{item.product.name}</p>
        <p className="text-gray-600 text-sm">&#x20A8;{item.product.price} | Qty: {item.quantity}</p>
      </div>
    </div>

    <div>
      <p className="font-semibold text-base mt-1">&#x20A8;{item.totalPrice}</p>
    </div>

    <div className="flex items-center space-x-2">
      <button onClick={() => handleQuantityChange(index, -1)} className="bg-gray-200 hover:bg-gray-300  dark:bg-navy-700  dark:hover:bg-navy-800 px-2 py-1 rounded-md text-sm">-</button>
      <span className="text-base">{item.quantity}</span>
      <button onClick={() => handleQuantityChange(index, 1)} className="bg-gray-200 hover:bg-gray-300  dark:bg-navy-700  dark:hover:bg-navy-800 px-2 py-1 rounded-md text-sm">+</button>
    </div>
    <button onClick={() => handleRemoveProduct(index)} className="text-red-500 hover:text-red-700 font-bold transition duration-200 mr-4">X</button>
  </div>
)) : null}


        {/* Dropdown for Product Selection */}
        <div className="mb-6">
          <Typography variant="small" color="blue-gray" className="mb-2 font-semibold">
            Add Product to Sale
          </Typography>
          <Select
            value={selectedProductId}
            onChange={(id) => {
              setSelectedProductId(id);
              handleAddProduct(id);
            }}
            className="w-full dark:bg-navy-900"
          >
            <Option value="" disabled>Select a Product</Option>
            {products ? products.map((product) => (
              <Option key={product._id} value={product._id} className='dark:bg-navy-900'>
                {product.name}
              </Option>
            )) : null}
          </Select>
        </div>

        {/* Total Quantity and Grand Total */}
        <p className="font-semibold text-xl">Total Quantities: {sale.totalQuantity}</p>
        <p className="font-semibold text-xl">Total Items: {sale.totalItems}</p>
        <p className="font-semibold text-xl mt-2">Grand Total:  &#x20A8;{sale.grandTotal}</p>

        {/* Additional form fields for updating sale can be added below */}
      </DialogBody>
      <DialogFooter>
        <Button onClick={handleOpen} color="red">
          Close
        </Button>
        <Button onClick={() => {
          handleUpdateSale(sale, saleId, setSaleData, handleOpen)
        }} color="blue">
          Update Sale
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateSaleForm;
