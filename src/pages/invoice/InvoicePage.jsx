import {useState, useEffect} from "react"
import InvoiceCustomer from "./invoiceCustomer";

function Invoice(){
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:8080/api/invoice`)
    .then((response) => response.json())
    .then(data => setData(data));
  }, []);


  if(data){
    //console.log(data[0].customer.firstName)
    return(
      <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>  */}
      <h1>Invoice Customer</h1>
      <InvoiceCustomer
        firstName={data[0].id}
        lastName={data[0].customer.lastName}
      />
      </div>
    )
  }
}

export default Invoice;