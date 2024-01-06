import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Chip,
  } from "@material-tailwind/react";
  
  const serverUrl = import.meta.env.VITE_SERVER_URL;
   
  export function ProductCard({ product, cardStyles, cardHeaderStyles, addToCart, darkMode }) {

    return (
      <>
      <Card className={`${cardStyles} relative bg-lightGray dark:bg-navy-800 dark:text-white`}>
        <Chip value={product.category.name} className={`${darkMode ? "bgDarkFull": "gradientOrange"} absolute text-white top-6 left-6 z-20`} />
        <CardHeader shadow={false} floated={false} className={`${cardHeaderStyles}`}>
          <img
            src={(serverUrl + product.imageUrl) || ""} 
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex justify-between">
            <Typography color="blue-gray" className="font-bold gradientText dark:text-white">
              {product.name}
            </Typography>
            <Typography color="blue-gray" className="font-bold gradientText dark:text-white">
            &#x20A8;{product.price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75 text-gray-900 dark:text-white"
          >
            {product.description}
          </Typography>
        </CardBody>
        <CardFooter className="mt-auto">
          <Button
            ripple={false}
            fullWidth={true}
            onClick={() => addToCart(product)} 
            className={`${darkMode ? "bgDarkFull": "gradientButton"} dark:bg-navy-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100`}
          >
            Add to Cart
          </Button>
          
     
          
        </CardFooter>
      </Card>

      </>
    );
  }