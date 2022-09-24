import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState , useEffect} from 'react';
import ScAdminContent from './ScAdminContent';
import {Link, useLocation} from "react-router-dom"



const PopupUpdate = (props) => {

  const navigate=useNavigate();

  function navigateToAdminPanel() {

    navigate('/admin');

    

  }
  //console.log("popupUpdate : ",props.id);
  //console.log("working ? "+ props.id);

  //location
  const location = useLocation()

	const [locationState, setLocationState] = React.useState({
		id: {},
    name: "",
    image: "",
    description: ""
	})

  React.useEffect(() => {
		console.log("location from new user", location)
		if (location.state) {
			let _state = location.state
      setLocationState(_state)
		}
	}, [location]);
    //test
    const[sname,setSname] =useState();
    const[sdescription,setSdescription] =useState();
    const[simage,setSimage] =useState();
 
    
  //update
 function update(){
   axios.put(`http://localhost:8080/update/${locationState.id}`,
        {
            name: sname,
            description: sdescription
           
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));



      
    }
    function UpdateAlert(){
      
      alert("The service sccessfully Updated!");
      window.location.reload(false);

      
      
      
  }
  function reload(){
    window.location.reload(false);
  }
    //console.log(" :",sname);

    //image convert to base64

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
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="updatedName" type="text" placeholder={locationState.name} onChange={(e)=>setSname(e.target.value)}/><br/>
              <br/>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400" for="inline-full-name">
                 Service Image  
              </label>
              <img src={baseImage !== null? baseImage : setBaseImage('https://via.placeholder.com/400')}  className=" mx-auto m-5 w-56 h-80" alt="userInput"></img>
              <input type="file" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="updatedName"  onChange={(e)=>{uploadImage(e)}}/><br/>
              
              <label for="inline-full-name" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400" >
                 Description  
              </label>
              <textarea rows="4" cols="50" className="p-2.5 text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="updatedDesc" placeholder={locationState.description} onChange={(e)=> {setSdescription(e.target.value);}}></textarea>

                <button className="absolute top-4 right-4 box-border" onClick={() => {navigateToAdminPanel();}}>X</button>
                <br/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{update();navigateToAdminPanel();UpdateAlert();}}>SUBMIT</button>
   
            </div>
            </form>
            
        </div>
      </div>
    </div>

  );
}

export default PopupUpdate;
