import React, {Component} from 'react'
import {useNavigate} from 'react-router-dom';

function ScRequestControlButton() {
    const navigate=useNavigate();
    const navigateToSRpage = () => {
        navigate('/admin/controlServiceRequest');
    }
  
  
      return (
        <div>
            <button 
              className=" hover:bg-green-600 items-center bg-sky-600 text-white font-medium rounded-md px-5 py-3" 
              onClick={()=>{navigateToSRpage()}} >
                  Check Requested Services
              </button>
          
        </div>
      )
}
export default ScRequestControlButton;
