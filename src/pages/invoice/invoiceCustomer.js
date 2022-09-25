import { Card } from "flowbite-react";


function InvoiceCustomer({
  id, firstName, lastName, address, email,
  invoiceDate, expireDate, paymentStatus

}){
  return(
    <div className="flex-auto grid gap-4 grid-cols-2">
    
    <div className="flex-auto"> 
    <Card>
      <h2>Bill To</h2>
      <h1>{firstName + " " + lastName}</h1>
      <p>{address}</p>
      <p>{email}</p>
    </Card>
    </div>

    <div className="flex-auto"> 
    <Card>
      <h1>Invoice No: {id}</h1>
      <p>Invoice Date: {invoiceDate}</p>
      <p>Due Date: {expireDate}</p>
      <p className={paymentStatus ? "text-green-500" : "text-red-600"}>Status: {paymentStatus ? "Paid" : "Pending"}</p>
    </Card>
    </div>
    </div>
  )
}

export default InvoiceCustomer