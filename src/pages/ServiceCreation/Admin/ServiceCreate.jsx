import React from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useState , useEffect} from 'react';

function CreatForm() {

  const navigate=useNavigate();

  const navigateToAdminPanel = () => {
      navigate(`/admin/SCAdmin`);
  }


  const[name,setName] =useState();
  const[description,setDescription] =useState();
  //const[link,setLink] =useState();
  const[optionType,setOptionType] =useState();
  const[category,setCategory] =useState();
  const[price,setPrice] =useState();
  const[cardDescription,setCardDescription] =useState();

  const [baseImage, setBaseImage]=useState(null);

    const uploadImage= async (e) => {
      console.log(e.target.files);
      const file=e.target.files[0];
      const base64 = await convertBase64(file);
      console.log(base64);
      setBaseImage(base64);
    };
  
    const convertBase64 =( file) => {
      return new Promise((resolve,reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload=(()=>{
          resolve(fileReader.result);
        });
        fileReader.onerror=((error)=>{
          reject(error);
        });
      });
    };
 

  function create(){



    axios.post(`http://localhost:8080/${category}`,
    {
        name: name,
        image : baseImage,
        description: description,
        cardDescription: cardDescription,

        category : category,
        price : price,

    })
    .then(response => response.data)
    .then(alert("The service created Successfully!"));
  }

  function SubmitButton() {
    if (name && description && price && category && cardDescription) {
      return <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{create();navigateToAdminPanel();}}>Create New Service</button>;
    } else {
      return (
        <button type="submit" className="bg-gray-300 text-white font-bold py-2 px-4 rounded" onClick={()=>{create();navigateToAdminPanel();}} disabled>Create New Service</button>

      );
    }
  }

  

  return (
    <div className="text-center  transition-all top-56 w-full h-full ">
      <div className="p-8 bg-white align-center relative">
        <div className="transition-all ">
            <form>
            <p className="text-3xl ">Create form</p><br/>
            <div className="">

            
              <br/>

              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400" for="inline-full-name">
                 Service Name  
              </label>
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="updatedName" type="text" placeholder="name" onChange={(e)=>{setName(e.target.value)}}/><br/>
              <br/>
              
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400" for="inline-full-name">
                 Service Image  
              </label>
              <img src={baseImage !== null? baseImage : setBaseImage('https://via.placeholder.com/400')} className=" mx-auto m-5 w-56 h-80" alt="userInput"></img>
              <input type="file" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="updatedName"  onChange={(e)=>{uploadImage(e)}}/><br/>
              
              <label for="inline-full-name" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400" >
                 Description  
              </label>
              <textarea rows="4" cols="50" className="p-2.5 text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="updatedDesc" placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}}></textarea>


              <label for="inline-full-name" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400" >
                 Card Description  
              </label>
              <textarea rows="4" cols="50" className="p-2.5 text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="updatedCardDesc" placeholder="CardDescription" onChange={(e)=>{setCardDescription(e.target.value)}}></textarea>



               <div className="m-2">
                <label class="block text-sm font-medium text-gray-500 dark:text-gray-400" for="inline-full-name">
                    Select Category 
                </label>
                <select className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm w-48" onClick={(e)=>{setCategory(e.target.value);}}>
                    <option selected value={null}>Select a Category</option>
                    <option value="Home">Home Cleaning Service</option>
                    <option value="Apartment">Apartment Cleaning Service</option>
                    <option value="Laundry">Laundry Service</option>
                    <option value="Learning">Learning Centers Cleaning Service</option>
                    <option value="Office">Office Cleaning Service</option>
                    <option value="Restaurant">Restaurant Cleaning Service</option>
                    <option value="Sport">Sport Centers Cleaning Service</option>
                    </select>
               </div>
               <label class="block text-sm font-medium text-gray-500 dark:text-gray-400" for="inline-full-name">
                 Service Price  
              </label>
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="updatedName" type="text" placeholder="price" onChange={(e)=>{setPrice(e.target.value)}}/><br/>
              <br/>

               



                <button className="absolute top-4 right-4 box-border" onClick={() => {navigateToAdminPanel();}}>X</button>
                <br/>
                <SubmitButton/>
                
            </div>
            </form>
            
        </div>
      </div>
    </div>
  )
}

export default CreatForm
