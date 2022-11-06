import React from "react";
import { useEffect } from "react";
import { Card, Button } from "flowbite-react";

function PaymentFooter() {
  useEffect(() => {
    console.log("Submit the Data to Stripe");
  }, []);

  return (
    <Card>
      Process the Payment
      <Button color="purple" onClick={() => console.log("Payment Processed")}>
        Pay
      </Button>
    </Card>
  );
}
export default PaymentFooter;
