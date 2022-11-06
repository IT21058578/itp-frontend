import React from "react";
import { useState } from "react";
import axios from "axios";
import Stripe from "react-stripe-checkout";
import { resolveComponentProps } from "@mui/base";

function StripePayment({ totalAmount, instId }) {
  const [token, setToken] = useState({});

  async function handleToken(token) {
    console.log(token);

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
        },
      })
      .then(() => {
        alert("Payment Success");
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <div className="App">
      <Stripe
        stripeKey="pk_test_51Ln0qXJfShQL4M87u0Y78wO5oE7ooyx8xqbzsm3h7o4hADKinVM2bsM9rg9F9it5gS094kf5ay1Ytt2191Wi5FLL009sHMZFNp"
        token={handleToken}
      />
    </div>
  );
}

export default StripePayment;
