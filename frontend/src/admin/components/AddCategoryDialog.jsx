import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Card, Input, Button, Typography, Textarea } from "@material-tailwind/react";

const AddCategoryDialog = ({ isOpen, setIsOpen, handleAddCategory }) => {

  const [category, setCategory] = useState({
    name: '',
    description: '',
    image: null
  });

  const handleOpen = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setCategory((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  return (
    <Dialog open={isOpen} handler={handleOpen}>
      <DialogHeader>Add Category</DialogHeader>
      <DialogBody className="max-h-[60vh] overflow-y-auto">
        <Card className='p-8' color="transparent" shadow={false}>
          <Typography color="gray" className="mt-1 mb-4 font-normal">
            Add a new category
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
                value={category.name}
                onChange={handleChange}
                size="lg"
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Category Description
              </Typography>
              <Textarea
                name="description"
                placeholder="Category Description"
                value={category.description}
                onChange={handleChange}
                size="lg"
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Upload Category Image
              </Typography>
              <Input
                type="file"
                name="image"
                onChange={handleImageChange}
                size="lg"
              />
            </div>
            <Button onClick={()=> handleAddCategory(category, setCategory, setIsOpen)} fullWidth variant="gradient" color="blue">
              Add Category
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

export default AddCategoryDialog;
