import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
  
  const serverUrl = import.meta.env.VITE_SERVER_URL;
   
  export function CategoryCard({ category }) {
    return (
      <Card className="w-full max-w-[34rem] md:h-[50vh] bg-lightGray dark:bg-navy-800 dark:text-white flex-row my-4 md:m-4">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src={(serverUrl + category.imgUrl) || ""} 
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-4 uppercase gradientText dark:text-white">
          {category.name}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal text-gray-900 dark:text-gray-700">
            {category.description}
          </Typography>
          <Link to={`/products/${category.name}`} className="inline-block">
            <Button variant="text">
              <span className="flex items-center gap-2 gradientText dark:text-white dark:hover:bg-navy-900">
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
              </span>
            </Button>
          </Link>
        </CardBody>
      </Card>
    );
  }