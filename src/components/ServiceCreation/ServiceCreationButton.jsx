import React, {Component} from 'react'
import {useNavigate} from 'react-router-dom';


function ScCreateButton(){
  const navigate=useNavigate();
  const navigateToCreate = () => {
      navigate('/admin/serviceCreate');
  }


    return (
      <div>
          <button 
            className=" hover:bg-green-600 items-center bg-green-500 text-white font-medium rounded-md px-5 py-3" 
            onClick={()=>{navigateToCreate()}} >
                + Create
            </button>
        
      </div>
    )
  
}

export default ScCreateButton;
