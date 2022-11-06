import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Label,
  TextInput,
  Checkbox,
  Spinner,
  Select,
} from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { ReactSession } from "react-client-session";
import ConsentModel from "../../../components/PaymentManagement/ConsentModel";
import { useNavigate } from "react-router-dom";

function ViewInstruments() {
  const email = ReactSession.get("email");
  const navigate = useNavigate();

  const [returnValue, setReturnValue] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    //console.log(isOpen);
    setIsOpen(true);
    // console.log(isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [viewStatus, setViewStatus] = useState(true);
  const [cardData, setCardData] = useState({});

  const [savedStatus, setSavedStatus] = useState(false);
  const [savedCardMsg, setSavedCardMsg] = useState("");

  const [cardNumber, setcardNumber] = useState(""); //cannot be empty
  const [cardNumberHasErr, setcardNumberHasErr] = useState(false);
  const [cardNumberErrMsg, setcardNumberErrMsg] = useState("");

  const [cvv, setcvv] = useState(""); //cannot be empty
  const [cvvHasErr, setcvvHasErr] = useState(false);
  const [cvvErrMsg, setcvvErrMsg] = useState("");

  const [expiryDate, setexpiryDate] = useState("");
  const [expiryDateHasErr, setexpiryDateHasErr] = useState(false);
  const [expiryDateErrMsg, setexpiryDateErrMsg] = useState("");

  const [cardType, setcardType] = useState("");
  const [cardTypeHasErr, setcardTypeHasErr] = useState(false);
  const [cardTypeErrMsg, setcardTypeErrMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [instrumentHasErr, setinstrumentHasErr] = useState(false);
  const [registerErrMsg, setRegisterErrMsg] = useState("");

  //For showing password hints
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/instrument`, {
        params: { id: searchParams.get("id") },
      })
      .then((response) => {
        console.log(response.data);
        setCardData(response.data);
        setcardNumber(response.data.cardNumber);
        setcvv(response.data.cvv);
        setexpiryDate(response.data.expiryDate);
        setcardType(response.data.cardType);
      })
      .catch((err) => console.log(err))
      .then(() => console.log("function ran"));
  }, []);

  useEffect(() => {
    if (returnValue) {
      axios
        .delete(`http://localhost:8080/api/v1/instrument`, {
          params: { id: searchParams.get("id") },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          navigate("/profile/instruments");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("cancel");
    }
  }, [returnValue]);

  function validateInstrument() {
    let hasAnyErr = false;
    setinstrumentHasErr(false);

    setcardNumberHasErr(false);
    if (cardNumber.length < 15) {
      setcardNumberHasErr(true);
      setcardNumberErrMsg("Card Number Cannot be empty");
      hasAnyErr = true;
    }

    setcvvHasErr(false);
    if (cvv.length != 3) {
      setcvvHasErr(true);
      setcvvErrMsg("CVV cannot be empty");
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
    setIsLoading(false);

    //adcd the put request here
    console.log(cvv);
    console.log(cardNumber);

    const options = {
      method: "PUT",
      url: "http://localhost:8080/api/v1/instrument",
      params: { id: searchParams.get("id") },
      headers: { "Content-Type": "application/json" },
      data: {
        email: email,
        cardNumber: cardNumber,
        cardType: cardType,
        cvv: cvv,
        expiryDate: expiryDate,
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
                disabled={viewStatus}
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
                disabled={viewStatus}
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
                value={cvv}
                onChange={(e) => {
                  setcvv(e.target.value);
                }}
                type="text"
                placeholder="CVV Security Code"
                disabled={viewStatus}
                color={cvvHasErr ? "failure" : "gray"}
                helperText={
                  cvvHasErr ? (
                    <span className="text-red-600">{cvvErrMsg}</span>
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
                value={cardType}
                onChange={(e) => {
                  console.log(cardData.cardType);
                  setcardType(e.target.value);
                  console.log(e.target.value);
                  if (cardType != 0) {
                    setcardTypeHasErr(false);
                  }
                }}
                disabled={viewStatus}
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
        <div className="flex flex-col gap-4 w-full h-full border-t py-2 items-center">
          {instrumentHasErr ? (
            <span className="text-red-600 text-sm">{registerErrMsg}</span>
          ) : (
            ""
          )}

          <Button
            style={{ width: "100%" }}
            onClick={() => {
              console.log("clicked");
              setViewStatus(false);
            }}
            disabled={false}
            color="warning"
          >
            <CheckBadgeIcon className="h-6 w-6 mx-2" />
            {isLoading ? (
              <div>
                Processing... <Spinner />
              </div>
            ) : (
              <div>Edit Instrument</div>
            )}
          </Button>

          <Button
            style={{ width: "100%" }}
            onClick={validateInstrument}
            disabled={viewStatus}
            color="success"
          >
            <CheckBadgeIcon className="h-6 w-6 mx-2" />
            {isLoading ? (
              <div>
                Processing... <Spinner />
              </div>
            ) : (
              <div>Update Card</div>
            )}
          </Button>

          <Button color="failure" onClick={openModal} disabled={viewStatus}>
            Delete
          </Button>
          <ConsentModel
            closeModal={closeModal}
            show={isOpen}
            setReturnValue={setReturnValue}
          />
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

export default ViewInstruments;
