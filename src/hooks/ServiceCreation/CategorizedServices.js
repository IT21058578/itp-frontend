import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeCleaningServices from "../../pages/ServiceCreation/HomeCleaningServices";
import ApartmentCleaningServices from "../../pages/ServiceCreation/ApartmentCleaningServices";
import LaundryServices from "../../pages/ServiceCreation/LaundryServices";
import LearningCenterCleaningServices from "../../pages/ServiceCreation/LearningCentersCleaningServices";
import OfficeCleaningServices from "../../pages/ServiceCreation/OfficeCleaningServices";
import RestaurantCleaningServices from "../../pages/ServiceCreation/RestaurantCleaningServices";
import SportCenterCleaningServices from "../../pages/ServiceCreation/SportCentersCleaningServices";


const Categorizing = () => {
  const location = useLocation();

  const [locationState, setLocationState] = React.useState({
    id: {},
    name: "",
  });

  React.useEffect(() => {
    console.log("location from new user", location);
    if (location.state) {
      let _state = location.state;
      setLocationState(_state);
    }
  }, [location]);

  return (
    <div>
      {locationState.name === "Home Cleaning" ? (
        <div>
          <HomeCleaningServices />
        </div>
      ) : locationState.name === "Apartment Cleaning" ? (
        <div>
          <ApartmentCleaningServices />
        </div>
      ) : locationState.name === "Laundry Cleaning" ? (
        <div>
          <LaundryServices/>
        </div>
      ) : locationState.name === "Learning Center Cleaning" ? (
        <div>
          <LearningCenterCleaningServices/>
        </div>
      ) : locationState.name === "Office Cleaning" ? (
        <div>    
          <OfficeCleaningServices/>
        </div> 
      ) : locationState.name === "Office Cleaning" ? (
        <div>
          <OfficeCleaningServices/> 
        </div>
      ) : locationState.name === "Restaurant Cleaning" ? (
        <div>
          <RestaurantCleaningServices/> 
        </div>
      ) : locationState.name === "Sport Center Cleaning" ? (
        <div>
          <SportCenterCleaningServices/> 
        </div>
      ): (
        <h1>ERROR</h1>
      )}
    </div>
  );
};

export default Categorizing;
