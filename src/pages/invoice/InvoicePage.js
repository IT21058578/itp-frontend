import {useState, useEffect} from "react"
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


  if(data){
    console.log(data)
    console.log(data[0].id)
    return(
   
      <div className="max-w-4xl">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>  */}
      <Card >
      <Card >
      
      <h1 className="object-right-top text-2xl font-bold tracking-tight text-gray-900 dark:text-white">INVOICE</h1>
      <img
        className="mb-3 h-24 w-24 rounded-full shadow-lg"
        src={require('/Users/gayan/Developer/ITP-Project/itp-frontend/src/pages/invoice/quick_clean_logo.png')}
        alt=""
      />
        <h1>Quick Clean(Pvt)Ltd</h1>
        <p>No 3, Battaramulla, Sri Lanka</p>
       
      </Card>
      <InvoiceCustomer
        id={data[0].id}
        firstName={data[0].customer.firstName}
        lastName={data[0].customer.lastName}
        address={data[0].customer.address}
        email={data[0].customer.email}
        invoiceDate={data[0].invoiceDate}
        expireDate={data[0].invoiceExpireDate}
      />
      <InvoiceBody 
        services={data[0].services}
        totalPrice={data[0].invoiceTotal}
      
      />
      <InvoiceFooter 
        paymentStatus={data[0].paymentStatus}
       />
        
      </Card>
      
      
      </div>

    )
  }
}

export default Invoice;