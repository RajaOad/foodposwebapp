import React, { useContext, useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { CategoryContext } from '../../context/category/CategoryContext';

export default function UpdateProduct({ isOpen, setIsOpen, productData, handleUpdate }) {

  const { categories } = useContext(CategoryContext);

  const [selectedCategoryId, setSelectedCategoryId] = useState(productData.category._id);

  const [updatedProduct, setUpdatedProduct] = useState({
    name: productData.name,
    price: productData.price,
    description: productData.description,
    categoryId: selectedCategoryId,
    image: null,
  });

  const handleOpen = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isOpen} handler={handleOpen}>
      <DialogHeader>Update Product</DialogHeader>
      <DialogBody className="max-h-[60vh] overflow-y-auto">
        <Card className='p-8' color="transparent" shadow={false}>
          <Typography color="gray" className="mt-1 mb-4 font-normal">
            Modify the product details and submit to update.
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
                value={updatedProduct.name}
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
                value={updatedProduct.price}
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
                value={updatedProduct.description}
                onChange={handleChange}
                size="lg"
              />
            </div>
            <div className="mb-4">
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Select Product Category
              </Typography>
              <Select
                value={selectedCategoryId || ''}
                onChange={(categoryId) => {
                  // Directly set the selectedCategoryId with the passed categoryId value
                  setSelectedCategoryId(categoryId);
                }}
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))
                ) : (
                  <Option value="">No categories available</Option>
                )}
              </Select>
            </div>

            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Upload Product Image
              </Typography>
              <Input
                type="file"
                name="image"
                onChange={(e) => setUpdatedProduct((prevData) => ({ ...prevData, image: e.target.files[0] }))}
                size="lg"
              />
            </div>
            <Button onClick={()=> handleUpdate(updatedProduct, selectedCategoryId, productData._id, setIsOpen)} fullWidth variant="gradient" color="blue">
              Update Product
            </Button>
          </form>
        </Card>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => setIsOpen(false)} color="red">
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
