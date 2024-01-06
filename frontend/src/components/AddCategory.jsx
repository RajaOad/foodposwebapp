import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../context/user/UserContext';

const AddCategory = () => {
  const { authToken } = useContext(UserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:3001/api/addcategory', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await response.json();
      if(data.success) {

        setName('');
        setDescription('');

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
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Add Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
