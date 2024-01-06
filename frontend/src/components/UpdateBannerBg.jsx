import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Card, Input, Button } from "@material-tailwind/react";

const UpdateBannerBg = ({ isOpen, setIsOpen, updateUserBanner }) => {
  const [bannerBgImage, setBannerBgImage] = useState(null);

  const handleOpen = () => setIsOpen(!isOpen);

  const handleImageChange = (e) => {
    setBannerBgImage(e.target.files[0]);
  };

  return (
    <Dialog size='xs' open={isOpen} handler={handleOpen}>
      <DialogHeader>Update Banner Background</DialogHeader>
      <DialogBody>
        <Card className='p-8' color="transparent" shadow={false}>
          <Input
            type="file"
            onChange={handleImageChange}
          />
        </Card>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => updateUserBanner(bannerBgImage, setIsOpen)} color="blue">
          Update Banner
        </Button>
        <Button onClick={() => setIsOpen(false)} color="red">
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateBannerBg;
