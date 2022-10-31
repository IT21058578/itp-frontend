import React from 'react'
import {Link, useLocation} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function ServiceDeatials() {
    const location = useLocation()

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
        navigate('/');
    }

    React.useEffect(() => {
		console.log("location from new user", location)
		if (location.state) {
			let _state = location.state
      setLocationState(_state)
		}
	}, [location]);

  function insertCartDetails(){
    //Lakshana's API
    axios.post(`http://localhost:8080/Lakshana's_API`,
    {
        name: locationState.name,
        image : locationState.image,
        category: locationState.category+" Cleaning",
        price: locationState.price,

    })
    .then(response => response.data)
    .then(alert("No data passing, fake api, redirect to the home page"));

    navigateToSRpage();
  }

  return (
    <form className="shadow-2xl border-2 border-gray m-5 p-10">
    <div >
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900  lg:text-3xl dark:text-black">{locationState.name}</h1>
      <br/>
      <div className="flex ">
          <div name="left to image flex" className="m-4 w-72">
            <p>{locationState.description}</p>
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
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={()=>insertCartDetails()} >Add to cart</button>
        </div>
      </div>
      </div>


    </div>
    </form>
  )
}

export default ServiceDeatials;

