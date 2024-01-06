import React, { useState, useEffect, useContext } from 'react';
import AddCategory from './AddCategory';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../context/user/UserContext';

const AddProduct = () => {
  const navigate = useNavigate();
  const { authenticated, authToken } = useContext(UserContext);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]); // State for categories
  const [selectedCategory, setSelectedCategory] = useState(''); // State for the selected category
  const [description, setDescription] = useState('');

  // Fetch categories from the server when the component mounts
  useEffect(() => {
    
    if(!authenticated) {
      navigate('/login');
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categories', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('categoryId', selectedCategory); // Append selected category ID
      formData.append('productImage', selectedFile);

      const response = await fetch('http://localhost:3001/api/addproduct', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if(data.success) {

        setName('');
        setPrice('');
        setDescription('');
        setSelectedFile(null);
        setSelectedCategory('');

        Swal.fire({
          title: data.msg,
          icon: "success"
        });

      } else {
        Swal.fire({
          title: data.error,
          icon: "error"
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>

    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        
        <div>
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Product Image:</label>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Product
        </button>
      </form>
    </div>
    <AddCategory />
    </>
  );
};

export default AddProduct;
