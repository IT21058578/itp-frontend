import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Label,
  TextInput,
  Checkbox,
  Spinner,
  Select,
} from "flowbite-react";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { ReactSession } from "react-client-session";
import Stripe from "react-stripe-checkout";
import { FormHelperText } from "@mui/material";

function AddInstrument({ invoiceId }) {
  const navigate = useNavigate();
  const email = ReactSession.get("email");
  const [invoice, setInvoice] = useState({});

  const [savedStatus, setSavedStatus] = useState(false);
  const [savedCardMsg, setSavedCardMsg] = useState("");

  const [cardNumber, setcardNumber] = useState(""); //cannot be empty
  const [cardNumberHasErr, setcardNumberHasErr] = useState(false);
  const [cardNumberErrMsg, setcardNumberErrMsg] = useState("");

  const [securityNumber, setsecurityNumber] = useState(""); //cannot be empty
  const [securityNumberHasErr, setsecurityNumberHasErr] = useState(false);
  const [securityNumberErrMsg, setsecurityNumberErrMsg] = useState("");

  const [expiryDate, setexpiryDate] = useState("");
  const [expiryDateHasErr, setexpiryDateHasErr] = useState(false);
  const [expiryDateErrMsg, setexpiryDateErrMsg] = useState("");

  const [cardType, setcardType] = useState("");
  const [cardTypeHasErr, setcardTypeHasErr] = useState(false);
  const [cardTypeErrMsg, setcardTypeErrMsg] = useState("");

  const [saveCard, setsaveCard] = useState(false);
  const [saveCardHasErr, setsaveCardHasErr] = useState(false);
  const [saveCardErrMsg, setsaveCardErrMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [instrumentHasErr, setinstrumentHasErr] = useState(false);
  const [registerErrMsg, setRegisterErrMsg] = useState("");

  //For showing password hints
  useEffect(() => {
    console.log("cardNumber: " + cardNumber);
  }, []);

  function validateInstrument() {
    let hasAnyErr = false;
    setinstrumentHasErr(false);

    setcardNumberHasErr(false);
    if (cardNumber.length < 15) {
      setcardNumberHasErr(true);
      setcardNumberErrMsg("Card Number Cannot be empty");
      hasAnyErr = true;
    }

    setsecurityNumberHasErr(false);
    if (securityNumber.length != 3) {
      setsecurityNumberHasErr(true);
      setsecurityNumberErrMsg("CVV cannot be empty");
      hasAnyErr = true;
    }

    //Check date of birth.
    setexpiryDateHasErr(false);
    if (
      expiryDate.length <= 0 ||
      !expiryDate.match(/[0-3][1-9][\/][2-9][0-9]/gm)
    ) {
      setexpiryDateHasErr(true);
      setexpiryDateErrMsg("Pls enter a valid Date MM/YY");
      hasAnyErr = true;
    }

    //Check cardType.
    setcardTypeHasErr(false);
    if (cardType == 0) {
      setcardTypeHasErr(true);
      setcardTypeErrMsg("Must be a valid cardType!");
      hasAnyErr = true;
    }

    if (!hasAnyErr) {
      sendPaymentProcessingRequest();
    }
  }

  function sendPaymentProcessingRequest() {
    let cvv = securityNumber;
    setIsLoading(true);

    if (saveCard) {
      axios
        .post(`http://localhost:8080/api/v1/instrument`, {
          email,
          cardNumber,
          cardType,
          cvv,
          expiryDate,
        })
        .then((response) => {
          //navigate somwhere
          // send the data to STRIPE
          setSavedStatus(true);
          setSavedCardMsg("Card Saved Successfully");
          console.log("Data Saved Successfully & Sending Data to Stripe");
        })
        .catch((err) => {
          setinstrumentHasErr(true);
          if (err.response !== undefined) {
            //For errors with response
            if (err.response.status === 0) {
              setRegisterErrMsg(
                "Failed to connect to server. Please try again."
              );
            } else if (err.response.status === 409) {
              setRegisterErrMsg(
                "Card already exist, Please enter a different card."
              );
              setcardTypeHasErr(true);
              setcardTypeErrMsg(
                "Card alreayd exist, Please enter a different card."
              );
            } else {
              setRegisterErrMsg("An error occured. Please try again.");
            }
          } else {
            setRegisterErrMsg("Request couldn't be made. Please try again.");
          }
        })
        .then(() => setIsLoading(false));
    }
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

    console.log("Sending the data to Stripe");
  }

  return (
    <Card>
      Add New Card & Process the Payment
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 w-full h-full">
          <div className="flex-1 w-1/2 block">
            <div className="mb-2 block">
              <Label value="Card Number" />
            </div>
            <div>
              <TextInput
                value={cardNumber}
                onChange={(e) => {
                  setcardNumber(e.target.value);
                }}
                type="text"
                placeholder="Card Number"
                disabled={isLoading}
                color={cardNumberHasErr ? "failure" : "gray"}
                helperText={
                  cardNumberHasErr ? (
                    <span className="text-red-600">{cardNumberErrMsg}</span>
                  ) : (
                    ""
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 w-full h-full">
          <div className="flex-1 w-1/2">
            <div className="mb-2 block">
              <Label value="Card Expiry Date" />
            </div>
            <div>
              <TextInput
                value={expiryDate}
                onChange={(e) => setexpiryDate(e.target.value)}
                type="text"
                placeholder={"MM/YY"}
                color={expiryDateHasErr ? "failure" : "gray"}
                disabled={isLoading}
                helperText={
                  expiryDateHasErr ? (
                    <span className="text-red-600">{expiryDateErrMsg}</span>
                  ) : (
                    ""
                  )
                }
              />
            </div>
          </div>

          <div className="flex-1 w-1/2 ">
            <div className="mb-2 block">
              <Label value="CVV Security Code" />
            </div>
            <div>
              <TextInput
                value={securityNumber}
                onChange={(e) => setsecurityNumber(e.target.value)}
                type="text"
                placeholder="CVV Security Code"
                disabled={isLoading}
                color={securityNumberHasErr ? "failure" : "gray"}
                helperText={
                  securityNumberHasErr ? (
                    <span className="text-red-600">{securityNumberErrMsg}</span>
                  ) : (
                    ""
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 w-full h-full">
          <div className="flex-1">
            <div className="mb-2 block">
              <Label value="Card Type" />
            </div>
            {cardTypeHasErr ? (
              <span className="text-red-600">{cardTypeErrMsg}</span>
            ) : (
              ""
            )}
            <div>
              <Select
                id="cardTypes"
                defaultValue={0}
                onChange={(e) => {
                  setcardType(e.target.value);
                  if (cardType != 0) {
                    setcardTypeHasErr(false);
                  }
                }}
                disabled={isLoading}
                color={cardTypeHasErr ? "failure" : "gray"}
              >
                <option value={0} key={1}>
                  Select Card Type
                </option>
                <option value={"visa"} key={2}>
                  Visa
                </option>
                <option value={"master"} key={3}>
                  Master
                </option>
                <option value={"amex"} key={4}>
                  Amex
                </option>
                <option value={"discover"} key={5}>
                  Discover
                </option>
                FormHelperText=
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 w-full h-full border-t py-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                value={saveCard}
                onChange={(e) => {
                  setsaveCard(e.target.checked);
                }}
                disabled={isLoading}
                color={saveCardHasErr ? "failure" : "gray"}
              />
              <Label>Save this Card for Later Use .</Label>
              {saveCardHasErr ? (
                <span className="text-red-600 text-sm">{saveCardErrMsg}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full h-full border-t py-2 items-center">
          {instrumentHasErr ? (
            <span className="text-red-600 text-sm">{registerErrMsg}</span>
          ) : (
            ""
          )}
          <Button
            style={{ width: "100%" }}
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
      </div>
      {savedStatus ? (
        <span className="text-green-600">{savedCardMsg}</span>
      ) : (
        ""
      )}
    </Card>
  );
}

export default AddInstrument;

// function App() {
//   async function handleToken(token) {
//     console.log(token);
//     await axios
//       .post("http://localhost:8080/api/v1/payment/charge", "", {
//         headers: {
//           token: token.id,
//           amount: 500,
//         },
//       })
//       .then(() => {
//         alert("Payment Success");
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   }
//   return (
//     <div className="App">
//       <Stripe
//         stripeKey="pk_test_51Ln0qXJfShQL4M87u0Y78wO5oE7ooyx8xqbzsm3h7o4hADKinVM2bsM9rg9F9it5gS094kf5ay1Ytt2191Wi5FLL009sHMZFNp"
//         token={handleToken}
//       />
//     </div>
//   );
// }
