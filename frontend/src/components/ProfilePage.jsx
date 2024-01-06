import React, { useContext } from 'react';
import { UserContext } from '../context/user/UserContext';
import UserProfileCard from './UserProfileCard';
import UserDetailsSection from './UserDetailsSection';

const ProfilePage = () => {

    const { userData, isAdmin, updateUserBanner, updateUserDetails, updateUserImage } = useContext(UserContext);

    return (
      <>
        <div className="min-h-screen dark:bg-navy-900 py-6 flex flex-col justify-center sm:py-12">
           <UserProfileCard userData={userData} isAdmin={isAdmin} updateUserImage={updateUserImage} updateUserBanner={updateUserBanner} />
        </div>

        {!isAdmin && <div className='pb-12'>
        <UserDetailsSection userData={userData} updateUserDetails={updateUserDetails} />
        </div>}

      
        </>
    );
};

export default ProfilePage;
