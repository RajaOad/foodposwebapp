import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Card, Input, Button } from "@material-tailwind/react";

const UpdateProfileImg = ({ isOpen, setIsOpen, updateUserImage }) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleOpen = () => setIsOpen(!isOpen);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  return (
    <Dialog size='xs' open={isOpen} handler={handleOpen}>
      <DialogHeader>Update Profile Image</DialogHeader>
      <DialogBody>
        <Card className='p-8' color="transparent" shadow={false}>
          <Input
            type="file"
            onChange={handleImageChange}
          />
        </Card>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => updateUserImage(profileImage, setIsOpen)} color="blue">
          Update Image
        </Button>
        <Button onClick={() => setIsOpen(false)} color="red">
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateProfileImg;
