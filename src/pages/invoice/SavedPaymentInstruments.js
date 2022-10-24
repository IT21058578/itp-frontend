import {React, useState, useEffect} from "react"
import { ReactSession } from "react-client-session";
import Instruments from "../../components/Payment/Instruments";

function SavedPaymentInstruments(){
  const email = ReactSession.get("email");
  console.log(email)
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/PaymentInstrumentSampleData.json'
    ,{
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
      })
    .then((response) => response.json())
    .then(data => setData(data));
  }, []);

   if(data == null){
    console.log("no data")
   }
  console.log(data)

  return(
    <Instruments 
      cards ={data}
    />
  )
}

export default SavedPaymentInstruments;