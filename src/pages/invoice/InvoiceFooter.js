import { Card, Button } from "flowbite-react";

function InvoiceFooter({paymentStatus}){
  return(<Card><p>This has button to CRUD</p>
  <div className="flex flex-wrap gap-2">
  <Button color="purple">
    Pay
  </Button>

  <Button color="success">
    Save
  </Button>

  <Button color="warning">
    Delete
  </Button>
  </div>
  </Card>);
}
export default InvoiceFooter