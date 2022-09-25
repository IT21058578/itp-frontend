import {React, useState, useEffect} from "react"
import InvoiceCustomer from "./invoiceCustomer";
import { Card } from "flowbite-react";
import InvoiceBody from "./InvoiceBody";
import InvoiceFooter from "./InvoiceFooter";

function Invoice(){
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:8080/api/invoice`)
    .then((response) => response.json())
    .then(data => setData(data));
  }, []);

  //:TODO function to select the customer based on the login
  let selectedCustomer = 1;

  if(data){
    console.log(data)
    console.log(data[selectedCustomer].id)
    return(
   
      <div className="max-w-4xl">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>  */}
      <Card >
      <Card >
      
      <h1 className="object-right-top text-2xl font-bold tracking-tight text-gray-900 dark:text-white">INVOICE</h1>
      <img
        className="mb-3 h-24 w-24 rounded-full shadow-lg"
        src={require('../../images/new_logo.jpg')}
        alt=""
      />
        <h1>Quick Clean(Pvt)Ltd</h1>
        <p>No 3, Battaramulla, Sri Lanka</p>
       
      </Card>
      <InvoiceCustomer
        id={data[selectedCustomer].id}
        firstName={data[selectedCustomer].customer.firstName}
        lastName={data[selectedCustomer].customer.lastName}
        address={data[selectedCustomer].customer.address}
        email={data[selectedCustomer].customer.email}
        invoiceDate={data[selectedCustomer].invoiceDate}
        expireDate={data[selectedCustomer].invoiceExpireDate}
        paymentStatus={data[selectedCustomer].paymentStatus}
      />
      <InvoiceBody 
        services={data[selectedCustomer].services}
        totalPrice={data[selectedCustomer].invoiceTotal}
      
      />
      <InvoiceFooter 
        id={data[selectedCustomer].id}
       />
        
      </Card>
      
      
      </div>

    )
  }
}

export default Invoice;