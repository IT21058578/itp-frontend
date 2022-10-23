import React, { useState } from "react";
import axios from 'axios';

const ServiceReqCard=({request})=>{

    const [rid, setRid] = useState();

    axios.delete(`http://localhost:8080/deleteRequestedService/${rid}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
     
    function DeleteAlert(){
        
        alert("The service sccessfully deleted!");
        window.location.reload(false);
    }

  return (
    <div className="flex justify-center items-center flex-wrap">
        <div className=" shadow-lg transition-all rounded-2xl hover:bg-transparent w-96 overflow-hidden bg-gray-100 m-2">
            <div className=" m-2 relative">
                <p>Requested Service Name : <span className="italic font-bold hover:text-2xl">{request.name}</span></p>
                <p>Descripton about that service : <span className="italic font-bold hover:text-2xl">{request.description}</span></p>
            </div>
            <div className=" relative overflow-hidden transition-all">
                <button class="m-2 inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md" onClick={() =>{setRid(request.id);DeleteAlert();}}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg> 
                    Delete
                </button>              
            </div>
        </div>
    </div>
  )
}

export default ServiceReqCard;
