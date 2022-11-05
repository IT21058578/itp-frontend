import React from "react";
import { useEffect } from "react";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function ConsentModel({ show, closeModal, setReturnValue }) {
  console.log(show);
  return (
    <Modal show={show} size="md" popup={true} onClose={closeModal}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete ?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => {
                setReturnValue(true);
              }}
            >
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={closeModal}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConsentModel;
