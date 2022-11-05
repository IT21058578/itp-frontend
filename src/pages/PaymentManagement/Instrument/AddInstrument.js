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
} from "flowbite-react";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { ReactSession } from "react-client-session";

function AddInstrument() {
  const navigate = useNavigate();
  const email = ReactSession.get("email");
  const crntDate = 0; //Date.now().toISOString().split("T").toString();

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

  const [cardTypesAccepted, setcardTypesAccepted] = useState(false);

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
    if (securityNumber.length <= 0) {
      setcardNumberHasErr(true);
      setcardNumberErrMsg("Card Number Cannot be empty");
      hasAnyErr = true;
    }

    setsecurityNumberHasErr(false);
    if (securityNumber.length <= 0) {
      setsecurityNumberHasErr(true);
      setsecurityNumberErrMsg("CVV cannot be empty");
      hasAnyErr = true;
    }

    //Check date of birth.
    setexpiryDateHasErr(false);
    const expiryDateAsDate = new Date(expiryDate);
    const today = Math.abs(new Date(Date.now()).getUTCFullYear - 1970);
    if (expiryDateAsDate < today) {
      setexpiryDateHasErr(true);
      setexpiryDateErrMsg("Pls enter a Future Date");
      hasAnyErr = true;
    }

    //Check cardType.
    setcardTypeHasErr(false);
    if (
      !cardType.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setcardTypeHasErr(true);
      setcardTypeErrMsg("Must be a valid cardType!");
      hasAnyErr = true;
    }

    if (!hasAnyErr) {
      sendRegistrationRequest();
    }
  }

  function sendRegistrationRequest() {
    let cvv = securityNumber;
    setIsLoading(true);

    if (cardTypesAccepted) {
      axios
        .post(`localhost:8080/api/v1/instrument`, {
          email,
          cardNumber,
          cardType,
          cvv,
          expiryDate,
        })
        .then((response) => {
          //navigate somwhere
          // send the data to STRIPE
          console.log("Sending the data to Stripe");
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
                onChange={(e) => setcardNumber(e.target.value)}
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
                type="date"
                placeholder={crntDate}
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
            <div>
              <TextInput
                type="text"
                value={cardType}
                onChange={(e) => setcardType(e.target.value)}
                placeholder="Type your Card Type here..."
                disabled={isLoading}
                color={cardTypeHasErr ? "failure" : "gray"}
                helperText={
                  cardTypeHasErr ? (
                    <span className="text-red-600">{cardTypeErrMsg}</span>
                  ) : (
                    ""
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 w-full h-full border-t py-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                value={saveCard}
                onChange={(e) => setsaveCard(e.target.value)}
                defaultChecked={false}
                disabled={isLoading}
                color={saveCardHasErr ? "failure" : "gray"}
              />
              <Label>
                Save this Card for Later Use{" "}
                <a
                  href="/forms"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                ></a>
                .
              </Label>
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
    </Card>
  );
}

export default AddInstrument;
