import React from "react";
import { useEffect, useState } from "react";
import { Card, Button, Spinner, Select } from "flowbite-react";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

function SelectPaymentInstrument({ email }) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cardObject, setCardObject] = useState({});
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardNumberHasErr, setcardNumberHasErr] = useState(false);
  const [cardNumberErrMsg, setcardNumberErrMsg] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/instrument`, {
        params: { email: ReactSession.get("email") },
      })
      .then((response) => setData(response.data))
      .catch((err) => console.log(err))
      .then(() => console.log("function ran"));

    setCardObject(data.find((o) => o.cardNumber === value));
    //console.log(cardObject);
    setCardNumber(value);
    setCvv(cardObject?.cvv);
    setExpiryDate(cardObject?.expiryDate);
    setCardType(cardObject?.cardType);
    //console.log(cardType);
  }, [value]);

  function validateInstrument({ setcardNumber }) {
    let hasAnyErr = false;

    console.log("value: " + value);

    setcardNumberHasErr(false);
    if (value == 0 || value == 1) {
      setcardNumberHasErr(true);
      setcardNumberErrMsg("Pls select a valid card");
      hasAnyErr = true;
    }

    if (!hasAnyErr) {
      // processPayment();
      setcardNumber(cardNumber);
    }
  }

  function processPayment() {
    setIsLoading(true);
    console.log("Sending the data to Stripe");
    axios
      .post(`http://localhost:8080/api/v1/payment/charge`, {
        email,
        cardNumber,
        cardType,
        cvv,
        expiryDate,
      })
      .then((response) => {
        console.log("Payment successful");
      })
      .catch((err) => {
        setcardNumberHasErr(true);
        setcardNumberErrMsg("Failed to connect to server. Please try again.");
        if (err.response !== undefined) {
          //For errors with response
          if (err.response.status === 0) {
            setcardNumberErrMsg(
              "Failed to connect to server. Please try again."
            );
          }
        } else {
          setcardNumberHasErr("Request couldn't be made. Please try again.");
        }
      })
      .then(() => setIsLoading(false));
  }

  return (
    <Card>
      <label
        htmlFor="instruments"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        <h2>Select Existing Payment Instrument</h2>
        {cardNumberHasErr ? (
          <span className="text-red-600">{cardNumberErrMsg}</span>
        ) : (
          ""
        )}
      </label>
      <div className="flex flex-row gap-2 w-full h-full">
        <Select
          id="instruments"
          defaultValue={value}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            console.log(e.target.value);
            setValue(e.target.value);
            if (value !== 0 || value !== 1) {
              setcardNumberHasErr(false);
            }
          }}
        >
          <option value={0}>Select Saved Instrument</option>
          {data == null ? (
            <option value={1}>No Saved Instruments</option>
          ) : (
            data?.map((item) => (
              <option
                value={item.cardNumber}
                key={item.id}
              >{`${item.cardType} - ${item.cardNumber}  `}</option>
            ))
          )}
        </Select>
        <Button
          style={{ width: "70%" }}
          onClick={validateInstrument}
          disabled={isLoading}
          color="success"
        >
          <CheckBadgeIcon className="h-6 w-6 mx-2" />
          {isLoading ? (
            <div>
              Processing... <Spinner />
            </div>
          ) : (
            <div>Confirm Payment</div>
          )}
        </Button>
      </div>
    </Card>
  );
}

export default SelectPaymentInstrument;
