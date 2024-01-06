import React, { useContext, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  PlusCircleIcon,
  HomeIcon,
  Squares2X2Icon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { GiKnifeFork } from 'react-icons/gi';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../context/user/UserContext";
import { CartContext } from "../context/cart/CartContext";
import { useDarkMode } from "../context/darkmode/DarkModeContext";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: "/profile",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    link: "",
  },
];

function ProfileMenu({ onLogout }) {

  const { userData } = useContext(UserContext);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 hover:bg-[#f4f4f4] hover:text-[#ff6b53] dark:hover:bg-navy-900 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt=""
            className="border border-white p-0.5"
            src={userData.imgUrl ? `http://localhost:3001/${userData.imgUrl}` : 'https://placehold.co/400'}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 bg-[#f4f4f4] dark:bg-navy-800">
        {profileMenuItems.map(({ label, icon, link }) => {
          return (
            <Link to={link} key={label}>
            <MenuItem
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded hover:bg-lightGray dark:hover:bg-navy-900 dark:hover:text-white hover:text-gray-900 dark:text-white`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="inherit"
              >
                {label}
              </Typography>
            </MenuItem>
            </Link>
          );
        })}
        
        <MenuItem
          onClick={() => {
            closeMenu();
            onLogout();
          }}
          
          className={`flex items-center gap-2 rounded  hover:bg-red-500/10 dark:hover:bg-red-500/50 focus:bg-red-500/10 active:bg-red-500/10`}
        >
          {React.createElement(PowerIcon, {
            className: `h-4 w-4 text-red-500`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="red"
          >
            Sign Out
          </Typography>
        </MenuItem>

      </MenuList>
    </Menu>
  );
}

// nav list menu
// const navListMenuItems = [
//   {
//     title: "@material-tailwind/html",
//     description:
//       "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
//   },
//   {
//     title: "@material-tailwind/react",
//     description:
//       "Learn how to use @material-tailwind/react, packed with rich components for React.",
//   },
//   {
//     title: "Material Tailwind PRO",
//     description:
//       "A complete set of UI Elements for building faster websites in less time.",
//   },
// ];

// function NavListMenu() {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);

//   const renderItems = navListMenuItems.map(({ title, description }) => (
//     <a href="#" key={title}>
//       <MenuItem>
//         <Typography variant="h6" color="blue-gray" className="mb-1">
//           {title}
//         </Typography>
//         <Typography variant="small" color="gray" className="font-normal">
//           {description}
//         </Typography>
//       </MenuItem>
//     </a>
//   ));

//   return (
//     <React.Fragment>
//       <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
//         <MenuHandler>
//           <Typography as="a" href="#" variant="small" className="font-normal">
//             <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
//               <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
//               Pages{" "}
//               <ChevronDownIcon
//                 strokeWidth={2}
//                 className={`h-3 w-3 transition-transform ${
//                   isMenuOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </MenuItem>
//           </Typography>
//         </MenuHandler>
//         <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
//           <Card
//             color="blue"
//             shadow={false}
//             variant="gradient"
//             className="col-span-3 grid h-full w-full place-items-center rounded-md"
//           >
//             <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
//           </Card>
//           <ul className="col-span-4 flex w-full flex-col gap-1">
//             {renderItems}
//           </ul>
//         </MenuList>
//       </Menu>
//       <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
//         <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
//         Pages{" "}
//       </MenuItem>
//       <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
//         {renderItems}
//       </ul>
//     </React.Fragment>
//   );
// }



function NavList() {
  const { authenticated, isAdmin } = useContext(UserContext);

  let navListItems; 

  if(isAdmin) {
    navListItems = [
     {
       label: "Home",
       icon: HomeIcon,
       link: "/",
     },
     {
       label: "Menu",
       icon: GiKnifeFork,
       link: "/menu",
     },
     {
       label: "Dashboard",
       icon: Squares2X2Icon,
       link: "/admin",
     },
   ];
 } else {
 
   navListItems = [
     {
       label: "Home",
       icon: HomeIcon,
       link: "/",
     },
     {
       label: "Menu",
       icon: GiKnifeFork,
       link: "/menu",
     },
     {
       label: "Orders",
       icon: ShoppingBagIcon,
       link: "/orders",
     },
   ];
 
 }
  

// nav list component


  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, link }, key) => (
        <Link to={ authenticated ? link: "/login"} key={label}>
          <Typography
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <MenuItem className="flex text-white hover:bg-[#f4f4f4] hover:text-[#ff6b53] dark:hover:text-white dark:text-white dark:hover:bg-navy-900 items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Typography>
        </Link>
      ))}
    </ul>
  );
}

export function ComplexNavbar() {
  const { authenticated, setAuthenticated } = useContext(UserContext);
  const { toggleOpenState } = useContext(CartContext)
  const { darkMode, toggleDarkMode } = useDarkMode();

  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('authToken');
    setAuthenticated(false)

    Swal.fire({
      position: "top-start",
      icon: "info",
      title: "Successfully Loged Out",
      showConfirmButton: false,
      timer: 1500
    });

    // Redirect to the login page using React Router's useHistory hook
    navigate('/login');
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  const loginAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Login Required",
      showConfirmButton: false,
      timer: 1500
    });
  }

  return (
    <Navbar className={`max-w-full ${darkMode ? "bgDark" : "gradientOrange"} p-2 py-6 rounded-none lg:px-6 border-none`}>
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-white dark:text-white"
        >
          LOGO
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden text-white hover:bg-[#eceff1] hover:text-[#263238] dark:text-white"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <div className="flex items-center gap-2 text-white">
          <IconButton onClick={toggleDarkMode} size="sm" color="blue-gray" variant="text" className="hover:bg-[#f4f4f4] dark:hover:bg-navy-900">
            {darkMode ? <SunIcon className="h-6 w-6 text-white dark:hover:text-white" /> : <MoonIcon className="h-6 w-6 hover:text-[#ff6b53]" />}
          </IconButton>
          
          <IconButton onClick={authenticated ? toggleOpenState : loginAlert} size="sm" color="blue-gray" variant="text" className="hover:bg-[#f4f4f4] hover:text-[#ff6b53] dark:hover:bg-navy-900 dark:hover:text-white dark:text-white">
            <ShoppingCartIcon className="h-6 w-6" />
          </IconButton>

          {authenticated ? (
            <ProfileMenu onLogout={handleLogout} />
          ) : (
            <div>
              <Link to="/login">
                <Button size="sm" variant="text" className="text-white hover:bg-[#f4f4f4] hover:text-[#ff6b53] dark:hover:text-white dark:text-white dark:hover:bg-navy-900">
                  <span>Log In</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" variant="outlined" className="ml-2 text-white border-white dark:hover:text-white">
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          )}

        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}