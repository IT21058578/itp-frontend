import React from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { ReactSession } from "react-client-session";
import { useState, useEffect } from "react";

function ServiceDeatials() {
    const location = useLocation();
    const [firstName, setFirstName] = useState(null);
	  const [lastName, setLastName] = useState(null);
	  const [email, setEmail] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
      setFirstName(ReactSession.get("firstName"));
		  setLastName(ReactSession.get("lastName"));
		  setEmail(ReactSession.get("email"));
		  setAvatarUrl("");
    }, []);

    

	const [locationState, setLocationState] = React.useState({
		id: 0,
        name: "",
        image: "",
        description: "",
        cardDescription: "",
        price: 0,
        category: "",
	})





  const navigate=useNavigate();
    const navigateToSRpage = () => {
        navigate('/mycart');
    }

    React.useEffect(() => {
		console.log("location from new user", location)
		if (location.state) {
			let _state = location.state
      setLocationState(_state)
		}
	}, [location]);

  function insertCartDetails(){
    //Lakshan's API
    axios.post(`http://localhost:8080/api/cart`,
    {
        name: locationState.name,
        image : locationState.image,
        category: locationState.category+" Cleaning",
        price: locationState.price,
        cardDescription:locationState.cardDescription

    })
    .then(response => response.data);

    navigateToSRpage();
  }

  function CheckLogin(){
    if(firstName && lastName && email){
      return(

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => insertCartDetails()}>Add to cart</button>
        
      );
    }
    else{
      return(
        <div className=" grid-flow-row items-center justify-center">
          <p className="text-red-600 text-1xl ">Please login into the system for enable this feature !</p>
          <button type="submit" className="bg-gray-300 mx-36  text-white font-bold py-2 px-4 rounded" onClick={() => insertCartDetails()} disabled>Add to cart</button>
        </div>
      );
    }
  }

  return (
    <form className="shadow-2xl border-2 border-gray m-5 p-10">
    <div >
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900  lg:text-3xl dark:text-black">{locationState.name}</h1>
      <br/>
      <div className="flex ">
          <div name="left to image flex" className="m-4 w-72">
            <p>{locationState.description}</p>
            
          <br/>
          <p className="text-gray-400 border-2 text-1xl p-2 border-gray-400 rounded-lg">This price shown is an advance of some kind, and will vary depending on the complete work. If you need any clarification please contact us or you can check our specifications from our team.</p>
          </div>
        <div className="m-2 hover:scale-125 shadow-2xl border-2 border-gray w-64 rounded-xl">
        <img  src={locationState.image !== null? locationState.image : 'https://via.placeholder.com/400'} className=" mx-auto m-2  w-56 h-80 shadow rounded-xl align-middle border-none" alt="img"></img>
        <div className="m-4 text-sm ">
          <p><span className=" text-gray-500">Service Name:</span>   {locationState.name}</p>
          <p><span className=" text-gray-500">Category:</span>  {locationState.category} Cleaning</p>
          <p><span className=" text-gray-500">Service price:</span>  Rs.{locationState.price}.00</p>
        </div>
        </div>
        
          
      </div>
      <div className="flex item-center justify-center">
      <div className=" flex-row ">
        <div className="">
            
        </div>
        <br/>
        <div>
          <CheckLogin/>
        </div>
      </div>
      </div>


    </div>
    </form>
  );
}

export default ServiceDeatials;
