import { React, useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import axios from "axios";

import Instruments from "./Instruments";

function SavedPaymentInstruments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/instrument`, {
        params: { email: ReactSession.get("email") },
      })
      .then((response) => setData(response.data))
      .catch((err) => console.log(err))
      .then(() => console.log("function ran"));
  }, []);

  return <Instruments cards={data} />;
}

export default SavedPaymentInstruments;
