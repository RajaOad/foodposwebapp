import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export function ConfirmDailog({ isOpen, setIsOpen, itemId, onConfirm }) {
  
  const handleOpen = () => setIsOpen(!isOpen);

 const handleOnConfirm = () => {
  onConfirm(itemId);
  setIsOpen(false);
  }
 
  return (
    <>
      <Dialog size="xs" open={isOpen} handler={handleOpen}>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>
        Are you sure you want to delete this product?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleOnConfirm}>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}