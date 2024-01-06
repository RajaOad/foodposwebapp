import React, { useEffect, useState } from 'react';
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const UserDetailsSection = ({ userData, updateUserDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

   useEffect(() => {
    setEditedData({
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      city: userData.city,
      zipCode: userData.zipCode,
      address: userData.address,
    });
  }, [userData]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    updateUserDetails(editedData);
    setIsEditing(false);
  };

  return (
    <div className="dark:bg-navy-800 shadow-shadow-500 shadow-3xl rounded-primary mx-auto w-[80%] flex flex-col items-center bg-white p-8 dark:text-white dark:shadow-none">
      <div className="w-4/5 px-4 relative">
        <h5 className="text-bluePrimary text-xl font-semibold mb-6">User Details:</h5>
        
        {isEditing ? (
          <>
            {/* Edit Mode */}
            <div className="flex justify-between items-center mb-6">
              <input 
                type="text" 
                name="username" 
                value={editedData.username} 
                onChange={handleInputChange} 
                placeholder="Username" 
                className="text-lg bg-[#f4f4f4] dark:bg-navy-900 dark:text-white p-2 rounded-lg font-medium" 
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <input 
                type="email" 
                name="email" 
                value={editedData.email} 
                readOnly 
                className="text-lg bg-[#f4f4f4] dark:bg-navy-900 dark:text-white p-2 rounded-lg font-medium" 
              />
              <input 
                type="text" 
                name="phone" 
                value={editedData.phone} 
                onChange={handleInputChange} 
                placeholder="Phone" 
                className="text-lg bg-[#f4f4f4] dark:bg-navy-900 dark:text-white p-2 rounded-lg font-medium" 
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <input 
                type="text" 
                name="city" 
                value={editedData.city} 
                onChange={handleInputChange} 
                placeholder="City" 
                className="text-lg bg-[#f4f4f4] dark:bg-navy-900 dark:text-white p-2 rounded-lg font-medium" 
              />
              <input 
                type="text" 
                name="zipCode" 
                value={editedData.zipCode} 
                onChange={handleInputChange} 
                placeholder="Zip" 
                className="text-lg bg-[#f4f4f4] dark:bg-navy-900 dark:text-white p-2 rounded-lg font-medium" 
              />
            </div>

            <div className="mb-6">
              <textarea
                name="address" 
                value={editedData.address} 
                onChange={handleInputChange} 
                placeholder="Address" 
                rows="4"
                className="text-lg bg-[#f4f4f4] dark:bg-navy-900 dark:text-white w-full p-2 rounded-lg font-medium" 
              />
            </div>

            <div className="flex justify-between">
              <button onClick={handleUpdate} className="bg-gray-300 hover:bg-gray-500 dark:bg-navy-900 dark:hover:bg-navy-700 px-4 py-2 rounded-md">Update</button>
              <button onClick={() => setIsEditing(false)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md">Close</button>
            </div>
          </>
        ) : (
          <>
               {/* First Row: Username */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-medium">
            <strong>Username:</strong> {userData.username || 'Not provided'}
          </div>
        </div>

        {/* Second Row: Email and Phone Number */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-medium">
            <strong>Email:</strong> {userData.email || 'Not provided'}
          </div>
          <div className="text-lg font-medium">
            <strong>Phone:</strong> {userData.phone || 'Not provided'}
          </div>
        </div>

        {/* Third Row: City and Zip Code */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-medium">
            <strong>City:</strong> {userData.city || 'Not provided'}
          </div>
          <div className="text-lg font-medium">
            <strong>Zip:</strong> {userData.zipCode || 'Not provided'}
          </div>
        </div>

        {/* Fourth Row: Address */}
        <div className="mb-6">
          <p className="text-lg font-medium">
            <strong>Address:</strong> {userData.address || 'Not provided'}
          </p>
        </div>
            <div className="absolute top-0 -right-8">
                <span onClick={() => setIsEditing(true)} className="cursor-pointer">
                  <PencilSquareIcon className="h-6 w-6 text-blue-900 hover:text-blue-700" />
                </span>
              </div>
          </>
        )}

      </div>
    </div>
  );
}

export default UserDetailsSection;
