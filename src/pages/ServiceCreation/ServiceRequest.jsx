import React from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useState , useEffect} from 'react';

function ServiceRequestForm() {

  const navigate=useNavigate();

  const navigateToServicePage = () => {
      navigate('/categories');
  }

  const[name,setName] =useState();
  const[description,setDescription] =useState();

  function SubmitButton() {
    if (name && description) {
      return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{create();navigateToServicePage();}}>Send Request</button>;
    } else {
      return (
        <button className=" bg-gray-300 text-white font-bold py-2 px-4 rounded" onClick={()=>{create();navigateToServicePage();}} disabled>Send Request</button>

      );
    }
  }
 

  function create(){
    axios.post("http://localhost:8080/serviceReq",
    {
        name: name,
        description: description
    })
    .then(response => response.data)
    .then(alert("The service created Successfully!"));
  }
  return (
    <div classNAme=" transition-all relative justify-center items-center shadow-2xl border-2 border-gray m-5 p-10">
      
        <div className="border-2 border-gray-200 shadow-md text-center p-10  m-16">
        <button className="top-4 right-4 box-border absolute" onClick={() => {navigateToServicePage();}}>X</button>
            <p className=" text-2xl p-6">Request new Service</p>
            <div className=""></div>
            <label class="block text-sm font-medium text-gray-500 dark:text-gray-400" for="inline-full-name">
             Service Name  
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white      focus:border-purple-500" id="updatedName" type="text" placeholder="Service Name" onChange={(e)=>{setName(e.target.value)}}/><br/>
            <br/>

            <label for="inline-full-name" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400" >
             Why you need this Service  
            </label>
            <textarea rows="4" cols="50" className="p-2.5 text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="updatedDesc" placeholder="Tell about that service" onChange={(e)=>{setDescription(e.target.value)}}></textarea><br/>

            <SubmitButton/>


            
           
        </div>
        
    </div>
  )
}

export default ServiceRequestForm
