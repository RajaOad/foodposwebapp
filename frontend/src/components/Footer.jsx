import { Typography } from "@material-tailwind/react";
import { useDarkMode } from '../context/darkmode/DarkModeContext';
 
export default function Footer() {
    const { darkMode } = useDarkMode();

  return (
    <footer className={`${darkMode ? "bgDarkFull": "gradientOrange"} w-full text-white p-8`}>
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
      <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-white"
        >
          LOGO
        </Typography>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-gray-900 focus:text-gray-900"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-gray-900 focus:text-gray-900"
            >
              Menu
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-gray-900 focus:text-gray-900"
            >
               Events
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-gray-900 focus:text-gray-900"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2023 Brand Name
      </Typography>
    </footer>
  );
}