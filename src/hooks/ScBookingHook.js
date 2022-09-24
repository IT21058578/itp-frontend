import React from 'react';
import {Link, useLocation} from "react-router-dom";
import { useState , useEffect} from 'react';
import ScHcBooking from '../pages/ScHcBooking';
import ScLcBooking from '../pages/ScLcBooking';


const ScBooking = () => {
    const location = useLocation()

	const [locationState, setLocationState] = React.useState({
		id: {},
    name: ""
  })

    React.useEffect(() => {
		console.log("location from new user", location)
		if (location.state) {
			let _state = location.state
        setLocationState(_state)
            }
    }, [location]);

    

  return (
    <div>
      {
        locationState.name=="Home Cleaning" ? (
        <div>
            <ScHcBooking/>
        </div>
        ):
        locationState.name=="Laundry Service"?(
        <div>
            <ScLcBooking/>
        </div>
        ):
        locationState.name=="Apartment Cleaning"?(
        <div>
            <h1>{locationState.id}</h1>
            <h1>{locationState.name}</h1>
        </div>
        ):
        locationState.name=="Apartment Cleaning"?(
        <div>
            <h1>{locationState.id}</h1>
            <h1>{locationState.name}</h1>
        </div>
        ):(
            <h1>nexted else testing</h1>
        )
      }
    </div>
  )
}

export default ScBooking
