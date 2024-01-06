import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const UserContext = createContext();

const getFromLocalStorage = () => {

    const token = localStorage.getItem("authToken");
    return token || null;

};

export const UserContextProvider = ({ children })=> {

    const [authenticated, setAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [authToken, setAuthToken] = useState(()=> {
        return getFromLocalStorage()
    })
    const [userData, setUserData] = useState({});
    const [mounted, setMounted] = useState(false)
    const token = localStorage.getItem("authToken");

    const fetchUserData = async () => {

        try {
            const response = await fetch(`${serverUrl}api/userdata`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });


            const data = await response.json();

            if(data.success) {

                setUserData(data.user);
                setIsAdmin(data.user.isAdmin)
            } else {
                throw new Error(data.error);
            }


        } catch (err) {
            console.log('Failed to fetch user data:', err)
        }
    };

    useEffect(() => {

        setAuthToken(()=> {
            return getFromLocalStorage()
        })
        setMounted(true)

        if(token) {
            setAuthenticated(true)
            fetchUserData();
        } else {
            setAuthenticated(false)
        }
        
        
    }, [authenticated, isAdmin]);

    const updateUserDetails = async (updatedUser) => {
        try {
            const response = await fetch(`${serverUrl}api/updateuser`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });
    
            const data = await response.json();
            if (data.success) {
                fetchUserData();
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
            console.error('Error updating user details:', error);
        }
    };



    const updateUserImage = async (imgFile, setIsOpen) => {
        try {
            const formData = new FormData();
            
            // Append the images to the formData object
            if (imgFile) {
                formData.append('profileImg', imgFile); // Assuming you have a field name 'imgFile'
            }

            const response = await fetch(`${serverUrl}api/updateuser/images/profile`, {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
                body: formData  // Pass formData directly without setting Content-Type
            });
    
            const data = await response.json();
            if (data.success) {
                setIsOpen(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  fetchUserData();
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
            console.error('Error updating user images:', error);
        }
    };

    const updateUserBanner = async (bannerFile, setIsOpen) => {
        try {
            const formData = new FormData();
            
            if (bannerFile) {
                formData.append('bannerImg', bannerFile); // Assuming you have a field name 'bannerFile'
            }
    
            const response = await fetch(`${serverUrl}api/updateuser/images/banner`, {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
                body: formData  // Pass formData directly without setting Content-Type
            });
    
            const data = await response.json();
            if (data.success) {
                setIsOpen(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  fetchUserData();
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
            console.error('Error updating user images:', error);
        }
    };
    
    if(mounted) {
        return <UserContext.Provider value={{authenticated, setAuthenticated, authToken, userData, isAdmin, setIsAdmin, updateUserBanner, updateUserDetails, updateUserImage}}>{children}</UserContext.Provider>
    }
    

}