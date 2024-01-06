import { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../user/UserContext";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const SaleContext = createContext();

export const SaleContextProvider = ({ children })=> {

    const { authenticated, isAdmin } = useContext(UserContext);
    const [sales, setSales] = useState([]);

    const [mounted, setMounted] = useState(false)

    const authToken = localStorage.getItem('authToken');





    // functions for frontend update sale form logic

    const fetchSales = async () => {
      try {

        const response = await fetch(`${serverUrl}sales`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if(data.success) {
          setSales(data.sales);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };



    const fetchSingleSale = async (saleId, setSale) => {
      try {
        const response = await fetch(`${serverUrl}sale/${saleId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if(data.success) {
          
          setSale(data.sale);
        } else {

          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching sale:', error);
      }
    };



    const handleMakeSale = async (cartItems, setCartItems, toggleOpenState, calculateTotal) => {
      try {

        const saleItems = cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity
        }));
  
        const { totalQuantity, totalItems, grandTotal } = calculateTotal();
  
        const response = await fetch(`${serverUrl}makesale`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            products: saleItems,
            totalItems,
            totalQuantity,
            grandTotal
          })
        });

        const res = await response.json();
  
        if (res.success) {
          // Clear the cart after successful sale
          setCartItems([]);
          toggleOpenState();
          fetchSales();
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.msg,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: res.error,
            showConfirmButton: false,
            timer: 1500
          });
        }
  
      } catch (error) {
        console.error('Error making sale:', error);       
      }
    };



    const handleUpdateSale = async (sale, saleId, setSale, handleOpen) => {
      try {
        // Convert sale items to send only product IDs
        const updatedSaleItems = sale.items.map(item => ({
          product: item.product._id,  // Only sending the product ID
          quantity: item.quantity,
          totalPrice: item.totalPrice
        }));
    
        const updatedSaleData = {
          ...sale,
          items: updatedSaleItems
        };
    
        const response = await fetch(`${serverUrl}updatesale/${saleId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedSaleData) // Sending the updated sale data with only product IDs
        });
    
        const data = await response.json();

        if(data.success) {
          handleOpen();
          if(setSale) {
            fetchSingleSale(saleId, setSale)
          }
          fetchSales();
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: data.error,
            showConfirmButton: false,
            timer: 1500
          });
        }

      } catch (error) {
        console.error('Error updating sale:', error);
      }
    };



    const handleDeleteSale = async (saleId) => {

        try {
    
          const response = await fetch(`${serverUrl}deletesale/${saleId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          });
    
          const data = await response.json();
    
          if (data.success) {
            fetchSales();
            Swal.fire({
              title: data.msg,
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              title: data.error,
              icon: "error",
              showConfirmButton: false,
              timer: 1500
            });
          }
    
        } catch (error) {
          console.error('Error deleting sale:', error);
        }
    
      }
    

      
      useEffect(() => {

        if(isAdmin) {
          fetchSales();
        }
  
          setMounted(true)
      }, [authenticated, isAdmin]) 

    
    if(mounted) {
        return <SaleContext.Provider value={{ sales, fetchSingleSale, handleDeleteSale, handleMakeSale, handleUpdateSale }}>{children}</SaleContext.Provider>
    }
    

}