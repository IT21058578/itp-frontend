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
              className=" hover:bg-sky-600 items-center bg-blue-600 text-white text-xs font-medium rounded-md px-5 py-3" 
              onClick={()=>{navigateToSRpage()}} >
                  Check Requested Services
              </button>
          
        </div>
      )
}
export default ScRequestControlButton;
