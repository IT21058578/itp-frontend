import { React, useState, useEffect } from "react";
import InvoiceCustomer from "./invoiceCustomer";
import { Card } from "flowbite-react";
import InvoiceBody from "./InvoiceBody";
import InvoiceFooter from "./InvoiceFooter";
import { ReactSession } from "react-client-session";
import axios from "axios";

function InvoicePage() {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/invoice`, {
        params: { email: ReactSession.get("email") },
      })
      .then((response) => setInvoice(response.data))
      .catch((err) => console.log(err))
      .then(() => console.log("function run"));
  }, []);

  //:TODO function to select the customer based on the login

  return (
    <div className="max-w-4xl">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>  */}
      <Card>
        <Card>
          <h1 className="object-right-top text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            INVOICE
          </h1>
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src={require("../../images/new_logo.jpg")}
            alt=""
          />
          <h1>Quick Clean(Pvt)Ltd</h1>
          <p>No 3, Battaramulla, Sri Lanka</p>
        </Card>
        <InvoiceCustomer
          id={invoice.id}
          firstName={invoice.customer.firstName}
          lastName={invoice.customer.lastName}
          address={invoice.customer.address}
          email={invoice.customer.email}
          invoiceDate={invoice.invoiceDate}
          expireDate={invoice.invoiceExpireDate}
          paymentStatus={invoice.paymentStatus}
        />
        <InvoiceBody
          services={invoice.services}
          totalPrice={invoice.invoiceTotal}
        />
        <InvoiceFooter
          id={invoice.id}
          email={invoice.customer.email}
          totalPrice={invoice.invoiceTotal}
        />
      </Card>
    </div>
  );
}

export default InvoicePage;
