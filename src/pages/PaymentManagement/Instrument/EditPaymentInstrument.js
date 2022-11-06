import React from "react";

function EditPaymentInstrument(){
  return(
    <p>
      This is a model 
      When the edit button is clicked, this will load the data from the selected.
      Delete Button will delete the Card details from the backend
      User can change the 
       card number
       expiry date. 
       cvv 
      Update button will be update the data to backend. 

      Form validation for update button. 
       card number, exp date & cvv cannot be empty, 
       exp date should be future date 
       If time permits call the stripe card validation API before the update button. 

       Back button will send back without updating anything 
    </p>
  );
}

export default EditPaymentInstrument;