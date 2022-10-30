import React from 'react';
import { useForm } from "react-hook-form";

function PaymentInstrument({email, total}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return(
    <div>

    </div>
  );


}

export default PaymentInstrument;

