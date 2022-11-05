import React from "react";
import { useEffect } from "react";
import { Card } from "flowbite-react";
import { useSearchParams } from "react-router-dom";

import PaymentFooter from "./PaymentFooter";
import SelectPaymentInstrument from "../Instrument/SelectPaymentInstrument";
import AddPaymentInstrument from "../Instrument/AddInstrument";

function PaymentPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("invoiceID"));
    console.log(searchParams.get("email"));
    console.log(searchParams.get("totalPrice"));
  }, []);

  return (
    <div className="max-w-4xl">
      <Card>
        <Card>
          <h1 className="object-right-top text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Reference ID: {searchParams.get("invoiceID")}
            <p>Payment of Rs: {searchParams.get("totalPrice")}</p>
          </h1>

          <h1>To: Quick Clean(Pvt)Ltd, No 3, Battaramulla, Sri Lanka</h1>
        </Card>

        <SelectPaymentInstrument email={searchParams.get("email")} />
        <AddPaymentInstrument />
      </Card>
    </div>
  );
}

export default PaymentPage;
