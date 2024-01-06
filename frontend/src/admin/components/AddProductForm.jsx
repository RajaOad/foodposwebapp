import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Card, Input, Button, Typography, Select, Option, Textarea } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user/UserContext';
import { CategoryContext } from '../../context/category/CategoryContext';

const AddProductForm = ({ isOpen, setIsOpen, handleAddProduct }) => {
  const navigate = useNavigate();
  const { authenticated } = useContext(UserContext);
  const { categories } = useContext(CategoryContext);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    categoryId: '',
    image: null,
  });

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    }

  }, [authenticated, navigate]);

  const handleOpen = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isOpen} handler={handleOpen}>
      <DialogHeader>Add Product</DialogHeader>
      <DialogBody className="max-h-[60vh] overflow-y-auto">
        <Card className='p-8' color="transparent" shadow={false}>
          <Typography color="gray" className="mt-1 mb-4 font-normal">
            Add a new product with the necessary details.
          </Typography>
          <form className="space-y-4">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Product Name
              </Typography>
              <Input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                size="lg"
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Product Price
              </Typography>
              <Input
                type="number"
                name="price"
                placeholder="Product Price"
                value={product.price}
                onChange={handleChange}
                size="lg"
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Product Description
              </Typography>
              <Textarea
                name="description"
                placeholder="Product Description"
                value={product.description}
                onChange={handleChange}
                size="lg"
              />
            </div>
            <div className="mb-4">
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Select Product Category
              </Typography>
              <Select
                value={selectedCategory}
                onChange={(categoryId) => setSelectedCategory(categoryId)}
              >
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Upload Product Image
              </Typography>
              <Input
                type="file"
                name="image"
                onChange={(e) => setProduct((prevData) => ({ ...prevData, image: e.target.files[0] }))}
                size="lg"
              />
            </div>
            <Button onClick={()=> handleAddProduct(product, selectedCategory, setProduct, setSelectedCategory, setIsOpen)} fullWidth variant="gradient" color="blue">
              Add Product
            </Button>
          </form>
        </Card>
      </DialogBody>
      <DialogFooter>
        <Button onClick={handleOpen} color="red">
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddProductForm;
