import { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { UserContext } from "../user/UserContext";
import Swal from "sweetalert2";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const ProductContext = createContext();


export const ProductContextProvider = ({ children })=> {

    const { authenticated } = useContext(UserContext);

    const [products, setProducts] = useState([]);

    const [mounted, setMounted] = useState(false)

    const authToken = localStorage.getItem('authToken');

    const fetchProducts = async () => {
      try {
        
        const response = await fetch(`${serverUrl}api/products`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          let errorMessage = 'Failed to fetch products';
          
          if (response.status === 404) {
            errorMessage = 'Products not found';
          } else if (response.status === 500) {
            errorMessage = 'Internal server error';
          }
          
          throw new Error(errorMessage);
        }
        
        const data = await response.json();
        setProducts(data);

      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };



    const handleAddProduct = async (product, selectedCategory, setProduct, setSelectedCategory, setIsOpen) => {
  
      try {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('categoryId', selectedCategory);
        formData.append('productImage', product.image);
  
        const response = await fetch(`${serverUrl}api/addproduct`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
          body: formData,
        });
  
        const data = await response.json();
  
        if (data.success) {
          fetchProducts();
          setProduct({
            name: '',
            price: '',
            description: '',
            categoryId: '',
            image: null,
          })
          setSelectedCategory('')
          setIsOpen(false)
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
        console.error('Error adding product:', error);
      }
    };




    const handleUpdateProduct = async (updatedProduct, selectedCategoryId, productId, setIsOpen) => {

        const formData = new FormData();
    
        formData.append('name', updatedProduct.name);
        formData.append('price', updatedProduct.price);
        formData.append('description', updatedProduct.description);
        formData.append('categoryId', selectedCategoryId);
        formData.append('updatedImage', updatedProduct.image);
    
        try {
          const response = await fetch(`${serverUrl}api/updateproduct/${productId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${authToken}` // Send the token for authentication
            },
            body: formData // Data you want to update
          });
    
          const data = await response.json();
    
          if (data.success) {
            fetchProducts();
            setIsOpen(false);
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
          console.error('Error updating product:', error);
        }
      };
    
    
    
      const handleDeleteProduct = async (productId) => {
        try {
          const response = await fetch(`${serverUrl}api/deleteproduct/${productId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
              // You can add other headers like authentication if needed
            },
          });
      
          const data = await response.json();
      
          if (data.success) {
            fetchProducts();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: data.msg,
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: data.error,
              showConfirmButton: false,
              timer: 1500
            });
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };

      const fetchProductsByCategory = async (categoryName, setProducts, setCategory) => {
        try {
          const response = await fetch(`${serverUrl}api/categories/${categoryName}/products`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
          });
          
          const data = await response.json();
          if (data.success) {
            // Assuming you want to set these products to some state variable named 'products'
            setProducts(data.products);
            setCategory(data.category)
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };



    useEffect(() => {

      if(authToken) {
        fetchProducts();
      }

        setMounted(true)
    }, [authenticated])

    
    if(mounted) {
        return <ProductContext.Provider value={{ products, handleAddProduct, handleDeleteProduct, handleUpdateProduct, fetchProductsByCategory }}>{children}</ProductContext.Provider>
    }
    

}