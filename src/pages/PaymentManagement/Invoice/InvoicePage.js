import { React, useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Card } from "flowbite-react";

import InvoiceCustomer from "./invoiceCustomer";
import InvoiceBody from "./InvoiceBody";
import InvoiceFooter from "./InvoiceFooter";

import GenericPdfDownloader from "../../../components/PaymentManagement/GenericPDFDownloader";

function InvoicePage() {
  const [invoice, setInvoice] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("id"));
    axios
      .get(`http://localhost:8080/api/v1/invoice`, {
        params: { invoiceId: searchParams.get("id") },
      })
      .then((response) => setInvoice(response.data))
      .catch((err) => console.log(err))
      .then(() => console.log("function ran"));
  }, []);

  function saveInvoice() {
    axios
      .post(`http://localhost:8080/api/v1/invoice`, invoice)
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
      .then(() => console.log("function ran"));
  }

  return (
    <div className="max-w-4xl">
      <Card>
        <Card id="toDownload">
          <Card>
            <h1 className="object-right-top text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              INVOICE
            </h1>
            <img
              className="mb-3 h-24 w-24 rounded-full shadow-lg"
              src={require("../../../images/new_logo.jpg")}
              alt=""
            />
            <h1>Quick Clean(Pvt)Ltd</h1>
            <p>No 3, Battaramulla, Sri Lanka</p>
          </Card>
          <InvoiceCustomer
            id={invoice?.id || "500"}
            firstName={invoice?.firstName || "John"}
            lastName={invoice?.lastName}
            address={invoice?.address}
            email={invoice?.email}
            invoiceDate={invoice?.invoiceDate}
            expireDate={invoice?.invoiceExpireDate}
            paymentStatus={invoice?.paymentStatus}
          />
          <InvoiceBody
            services={invoice?.services}
            totalPrice={invoice?.invoiceTotal}
          />
        </Card>
        <InvoiceFooter
          id={invoice?.id}
          email={invoice?.email}
          totalPrice={invoice?.invoiceTotal}
          paymentStatus={invoice?.paymentStatus}
        >
          <GenericPdfDownloader
            downloadFileName="InvoicePDF"
            rootElementId="toDownload"
          />
        </InvoiceFooter>
      </Card>
    </div>
  );
}

export default InvoicePage;
