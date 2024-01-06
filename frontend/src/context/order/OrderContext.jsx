import { createContext, useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../user/UserContext";
import { useNavigate } from "react-router-dom";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const OrderContext = createContext();


export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderContextProvider = ({ children }) => {
  const { isAdmin, authenticated } = useContext(UserContext)
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); // This will hold the user's orders
  const [userOrders, setUserOrders] = useState([]);
  const [singleOrder, setSingleOrder] = useState(null);
  const [adminSingleOrder, setAdminSingleOrder] = useState(null);
  
  const authToken = localStorage.getItem('authToken');

  const fetchOrders = async () => {
    try {
        const response = await fetch(`${serverUrl}orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setUserOrders(data.orders);
    } catch (err) {
      console.log(err)
    }
};


  const adminFetchOrders = async () => {
    try {
        // Assuming you have a more secure method to get admin token
        const authToken = localStorage.getItem('authToken'); // You might need a different method for admin authentication
        const response = await fetch(`${serverUrl}admin/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch admin orders');
        }

        const data = await response.json();
        setOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
};

useEffect(() => {
  if(isAdmin) {
    adminFetchOrders();
  }
  if(!isAdmin && authenticated) {
    fetchOrders();
  }
}, [isAdmin]);



const placeOrder = async (orderData, calculateTotal, deliveryDetails, deliveryOption, setCartItems) => {
  try {
    const orderItems = orderData.map(item => ({
      product: item._id,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity
    }));

    const { totalQuantity, totalItems, grandTotal } = calculateTotal();

    const response = await fetch(`${serverUrl}placeorder`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        products: orderItems,
        totalQuantity,
        totalItems,
        grandTotal,
        deliveryDetails,
        deliveryOption
      })
    });
    const res = await response.json();
    if (res.success) {
      setCartItems([]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: res.msg,
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/orders");
      fetchOrders();
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
    console.error('Error placing order:', error);
  }
};



const fetchSingleOrder = async (id) => {
  
  try {
    
    const response = await fetch(`${serverUrl}orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    const data = await response.json();
    setSingleOrder(data.order)
  } catch (err) {
    console.log(err);
  }
};



  const fetchAdminSingleOrder = async (id) => {
    try {
        const response = await fetch(`${serverUrl}admin/order/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }

        const data = await response.json();
        setAdminSingleOrder(data.order);
    } catch (err) {
      console.log(err)
    }
};




  // Function to cancel an order by the user
const cancelUserOrder = async (orderId) => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`${serverUrl}order/cancel/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    if(data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      });
      fetchOrders();
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
    console.error('Error canceling user order:', error);
  }
};

// Function to cancel an order by an admin
const cancelAdminOrder = async (orderId) => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`${serverUrl}admin/order/cancel/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    if(data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      });
      adminFetchOrders();
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
    console.log('Error canceling admin order:', error);
  }
};

// Function to complete an order by an admin
const completeAdminOrder = async (orderId) => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`${serverUrl}admin/order/complete/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    if(data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      });
      adminFetchOrders();
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
    console.log('Error completing admin order:', error);
  }
};



async function deleteOrder(orderId) {
  try {
    const response = await fetch(`${serverUrl}admin/order/delete/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    if (data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      });
      adminFetchOrders();
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
    console.error('Error deleting order:', error);
  }
}



const updateOrder = async (updatedOrderData, orderId, closeDialog) => {
  try {
    const response = await fetch(`${serverUrl}admin/order/update/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(updatedOrderData),
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      });
      closeDialog();
      adminFetchOrders();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: data.error,
        showConfirmButton: false,
        timer: 1500
      });
      closeDialog();
    }
  } catch (error) {
    console.error('Error updating order:', error);
  }
};






  return (
    <OrderContext.Provider value={{ orders, userOrders, singleOrder, adminSingleOrder, placeOrder, cancelUserOrder, fetchSingleOrder, fetchAdminSingleOrder, cancelAdminOrder, completeAdminOrder, deleteOrder, updateOrder }}>
      {children}
    </OrderContext.Provider> 
  );
};
