import React from 'react'
import {Link, useLocation} from "react-router-dom";

function ServiceDeatials() {
    const location = useLocation()

	const [locationState, setLocationState] = React.useState({
		id: 0,
        name: "",
        image: "",
        description: "",
        cardDescription: "",
        price: 0,
	})

    React.useEffect(() => {
		console.log("location from new user", location)
		if (location.state) {
			let _state = location.state
      setLocationState(_state)
		}
	}, [location]);
  return (
    <form className="">
    <div >
      <h1 className="flex item-center justify-centers my-2 text-center">{locationState.name}</h1>
      <br/>
      <div className="flex  items-center">
        <div name="image gride" className="m-2">
        <img src={locationState.image !== null? locationState.image : 'https://via.placeholder.com/400'} className=" mx-auto m-5 w-56 h-80" alt="img"></img>
        </div>
        
        <div name="left to image flex" className="m-2">
        <p>service name : {locationState.name}</p>
        <p>basic price : {locationState.price}</p>
      </div>
      </div>
      <div className="flex item-center justify-center">
      <div className=" flex-row ">
        <div className="">
            <p>{locationState.description}</p>
        </div>
        <br/>
        <div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to cart</button>
        </div>
      </div>
      </div>


    </div>
    </form>
  )
}

export default ServiceDeatials;

