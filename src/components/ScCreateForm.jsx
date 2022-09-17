import React from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useState , useEffect} from 'react';

function CreatForm() {

  const navigate=useNavigate();

  const navigateToAdminPanel = () => {
      navigate('/admin');
  }


  const[name,setName] =useState();
  const[description,setDescription] =useState();

 

  function create(){
    axios.post("http://localhost:8080/SC",
    {
        name: name,
        image : "https://via.placeholder.com/400",
        description: description
    })
    .then(response => response.data)
    .then(alert("The service created Successfully!"));
  }

  return (
    <div className="text-center  transition-all top-56 w-full h-full">
      <div className="p-8  bg-white align-center relative">
        <div className="transition-all ">
            <form>
            <p className="text-3xl ">Update form</p><br/>
            <div className="">

            <label class="block text-sm font-medium text-gray-500 dark:text-gray-400" for="inline-full-name">
                 Service Name  
              </label>
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="updatedName" type="text" placeholder="name" onChange={2}/><br/>
              <br/>

              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400" for="inline-full-name">
                 Service Name  
              </label>
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="updatedName" type="text" placeholder="name" onChange={(e)=>{setName(e.target.value)}}/><br/>
              <br/>
              
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400" for="inline-full-name">
                 Service Name  
              </label>
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" /><br/>
              <br/>
              
              <label for="inline-full-name" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400" >
                 Description  
              </label>
              <textarea rows="4" cols="50" className="p-2.5 text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="updatedDesc" placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}}></textarea>

                <button className="absolute top-4 right-4 box-border" onClick={() => {navigateToAdminPanel();}}>X</button>
                <br/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{create();navigateToAdminPanel();}}>Create New Service</button>
                
            </div>
            </form>
            
        </div>
      </div>
    </div>
  )
}

export default CreatForm
