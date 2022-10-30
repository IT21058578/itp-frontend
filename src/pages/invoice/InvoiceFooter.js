import { Card, Button } from "flowbite-react";
import React from "react";
import PaymentInstrument from "./PaymentInstrument";

function InvoiceFooter({id, email, totalPrice}){
  return(<Card><p>This has button to CRUD</p>
  <div className="flex flex-wrap gap-2">
  <Button color="purple">
    Pay <PaymentInstrument 
      total = {totalPrice}
      email =  {email}
    />
  </Button>

  <Button color="success">
    Save
  </Button>

  <Button color="warning">
    Delete
  </Button>
  </div>
  </Card>);
}
export default InvoiceFooter