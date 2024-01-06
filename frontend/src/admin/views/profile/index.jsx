import { useContext, useEffect } from "react";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import { UserContext } from "../../../context/user/UserContext"
import { useNavigate } from "react-router-dom";

const ProfileOverview = () => {

   const { isAdmin, authenticated, userData } = useContext(UserContext)
 
   const navigate = useNavigate();
 
   useEffect(() => {
 
     if(!authenticated) {
       navigate('/login');
     }
 
     if (!isAdmin) {
       navigate("/");
     }
 
   }, [])

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-12 lg:!mb-0">
          <Banner userData={userData} />
        </div>

      </div>

      {/* <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
      <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
       
      </div> */}
    </div>
  );
};

export default ProfileOverview;
