import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Card, Input, Button, Typography, Textarea } from "@material-tailwind/react";

const UpdateCategoryDialog = ({ isOpen, setIsOpen, category, handleUpdateCategory }) => {

  useEffect(() => {
    setUpdatedCategory({
      name: category.name,
      description: category.description,
      image: null
    });
  }, [category]);

  const [updatedCategory, setUpdatedCategory] = useState({
    name: '',
    description: '',
    image: null
  });

  const handleOpen = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setUpdatedCategory((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  return (
    <Dialog open={isOpen} handler={handleOpen}>
      <DialogHeader>Update Category</DialogHeader>
      <DialogBody className="max-h-[60vh] overflow-y-auto">
        <Card className='p-8' color="transparent" shadow={false}>
          <Typography color="gray" className="mt-1 mb-4 font-normal">
            Update the category
          </Typography>
          <form className="space-y-4">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Category Name
              </Typography>
              <Input
                type="text"
                name="name"
                placeholder="Category Name"
                value={updatedCategory.name}
                onChange={handleChange}
                size="lg"
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Category Description
              </Typography>
              <Textarea
                label="Category Description"
                name="description"
                placeholder="Category Description"
                value={updatedCategory.description}
                onChange={handleChange}
                size="lg"
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Update Category Image
              </Typography>
              <Input
                type="file"
                name="image"
                onChange={handleImageChange}
                size="lg"
              />
            </div>
            <Button onClick={()=> handleUpdateCategory(updatedCategory, category._id, setIsOpen)} fullWidth variant="gradient" color="blue">
              Update Category
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
};

export default UpdateCategoryDialog;
