import { Card, Button } from "flowbite-react";
import React from "react";
import PaymentInstrument from "./PaymentInstrument";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConsentModel from "../../components/Payment/ConsentModel";
import { useEffect } from "react";

function InvoiceFooter({ id, email, totalPrice, children, paymentStatus }) {
  const [returnValue, setReturnValue] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    console.log(isOpen);
    setIsOpen(true);
    // console.log(isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log("Return" + returnValue);
    if (returnValue) {
      axios
        .delete(`http://localhost:8080/api/v1/invoice?id=${id}`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          navigate("/profile/invoices");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("cancel");
    }
  }, [returnValue]);

  return (
    <Card>
      <p></p>
      <div className="flex gap-2 flex-col items-center pb-10">
        {!paymentStatus ? (
          <Button color="purple">
            Pay <PaymentInstrument total={totalPrice} email={email} />
          </Button>
        ) : (
          ""
        )}
        {children}
        <Button color="warning" onClick={openModal}>
          Delete
        </Button>
        <ConsentModel
          closeModal={closeModal}
          show={isOpen}
          setReturnValue={setReturnValue}
        />
      </div>
    </Card>
  );
}
export default InvoiceFooter;
