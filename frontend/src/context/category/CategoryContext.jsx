import { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { UserContext } from "../user/UserContext";
import Swal from "sweetalert2";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children })=> { 

    const { authenticated } = useContext(UserContext);

    const [categories, setCategories] = useState([]);

    const [mounted, setMounted] = useState(false)

    const authToken = localStorage.getItem('authToken');

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${serverUrl}api/categories`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if(data.success) {
          setCategories(data.categories);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };




      const handleAddCategory = async (category, setCategory, setIsOpen) => {
    
        try {

          const formData = new FormData();

          // Append category details to formData
          formData.append('name', category.name);
          formData.append('description', category.description);
      
          // Check if an image file exists in the category object
          if (category.image) {
            formData.append('categoryImage', category.image);  // 'image' is the key on the server-side for the uploaded image
          }
          
          const response = await fetch(`${serverUrl}api/addcategory`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
            body: formData,
          });
    
          const data = await response.json();
          if(data.success) {

            fetchCategories();
            setCategory({
              name: '',
              description: '',
              image: null
            })
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
          console.error('Error adding category');
        }
      };



      const handleUpdateCategory = async (updatedCategory, categoryId, setIsOpen) => {
        try {

          const formData = new FormData();

          // Append category details to formData
          formData.append('name', updatedCategory.name);
          formData.append('description', updatedCategory.description);
      
          // Check if an image file exists in the updatedCategory
          if (updatedCategory.image) {
            formData.append('updatedCatImg', updatedCategory.image);  // 'image' is the key on the server-side for the uploaded image
          }
    
          const response = await fetch(`${serverUrl}api/updatecategory/${categoryId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
            body: formData,
          });
    
          const data = await response.json();
    
          if (data.success) {
            fetchCategories();
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
          console.error('Error updating category');
        }
      };



      const handleDeleteCategory = async (categoryId) => {

        try {
    
          const response = await fetch(`${serverUrl}api/deletecategory/${categoryId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
          });
    
          const data = await response.json();
    
          if (data.success) {
            fetchCategories();
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
          console.error('Error deleting category');
        }
      };
      


    useEffect(() => {
     
if(authToken) {
  fetchCategories();
}

    setMounted(true)

    }, [authenticated])
    
    

    
    if(mounted) {
        return <CategoryContext.Provider value={{ categories, handleAddCategory, handleDeleteCategory, handleUpdateCategory }}>{children}</CategoryContext.Provider>
    }
    

}