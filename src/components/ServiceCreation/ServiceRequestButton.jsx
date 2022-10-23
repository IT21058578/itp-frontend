import React from 'react'
import {useNavigate} from 'react-router-dom';

function ServiceRequestButton() {
    const navigate=useNavigate();

    const navigateToSRform = () => {
        navigate('/ServiceRequest');
    }

        

  return (
    <div className=" m-5 transition-all relative ">
        <p className="text-2xl">The service you are looking for if not here, You can request that by clicking service request button</p><br/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigateToSRform()}>Request a Service</button>
    </div>
  )
}

export default ServiceRequestButton