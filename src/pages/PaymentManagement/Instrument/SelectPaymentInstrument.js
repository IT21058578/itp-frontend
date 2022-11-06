import React from "react";
import { useEffect, useState } from "react";
import { Card, Button, Spinner, Select } from "flowbite-react";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import StripePayment from "../../../components/PaymentManagement/StripePayment";
import Stripe from "react-stripe-checkout";

function SelectPaymentInstrument({ email, totalAmount, invoiceId }) {
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
  const [stripeStatus, setStripeStatus] = useState(false);
  const [invoice, setInvoice] = useState({});

  async function handleToken(token) {
    console.log(token);
    token.email = email;

    // axios
    //   .get(`http://localhost:8080/api/v1/instrument`, {
    //     params: { instId: instId },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setToken(response.data);
    //   })
    //   .catch((err) => console.log(err))
    //   .then(() => console.log("function ran"));

    await axios
      .post("http://localhost:8080/api/v1/payment/charge", "", {
        headers: {
          token: token.id,
          amount: totalAmount,
          email: email,
        },
      })
      .then(() => {
        setStripeStatus(true);
        updateInstrument();
      })
      .catch((error) => {
        alert(error);
      });
  }

  function updateInstrument() {
    axios
      .get(`http://localhost:8080/api/v1/invoice?invoiceId=${invoiceId}`)
      .then((response) => {
        setInvoice(response.data);
        console.log(invoice);
        console.log(response.data);

        // const newPaymentStatus = { paymentStatus: true };
        // const new_obj = { ...response.data, ...newPaymentStatus };

        // console.log("This is the new obj");
        // console.log(new_obj);

        const options = {
          method: "PUT",
          url: "http://localhost:8080/api/v1/invoice",
          params: { id: invoiceId },
          headers: { "Content-Type": "application/json" },
          data: {
            id: invoiceId,
            email: email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            address: response.data.address,
            services: [response.data.services.map((service) => service)],
            invoiceDate: response.data.invoiceDate,
            invoiceTotal: response.data.invoiceTotal,
            paymentStatus: true,
            invoiceExpireDate: response.data.invoiceExpireDate,
            total: response.data.total,
          },
        };

        axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });

        // const config = { headers: { "Content-Type": "application/json" } };
        // axios.put(`http://localhost:8080/api/v1/invoice?id=${invoiceId}`, {
        //   data: { new_obj },
        //   config,
        // });
      })
      .catch((err) => console.log(err));
  }

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
    console.log(cardType);
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
      processPayment();
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

        <div className="App">
          <Stripe
            stripeKey="pk_test_51Ln0qXJfShQL4M87u0Y78wO5oE7ooyx8xqbzsm3h7o4hADKinVM2bsM9rg9F9it5gS094kf5ay1Ytt2191Wi5FLL009sHMZFNp"
            token={handleToken}
            label={"Confirm Payment"}
            email={email}
          />
        </div>
        <div>
          {stripeStatus ? (
            <span className="text-green-600">{"Payment Successful"}</span>
          ) : (
            ""
          )}
        </div>
        {/* <Button
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
        </Button> */}
      </div>
    </Card>
  );
}

export default SelectPaymentInstrument;
