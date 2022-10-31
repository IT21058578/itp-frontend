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
            className=" hover:bg-sky-600 items-center bg-blue-600 text-white font-medium text-xs rounded-md px-5 py-3" 
            onClick={()=>{navigateToCreate()}} >
                + Create
            </button>
        
      </div>
    )
  
}

export default ScCreateButton;
