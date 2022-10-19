import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminHomeCleaningServices from "../../pages/ServiceCreation/Admin/AdminHomeCleaningServices";
import AdminApartmentCleaningServices from "../../pages/ServiceCreation/Admin/AdminApartmentCleaningServices";
import LaundryServices from "../../pages/ServiceCreation/Admin/AdminLaundryServices";
import LearningCenterCleaningServices from "../../pages/ServiceCreation/Admin/AdminLearningCentersCleaningServices";
import OfficeCleaningServices from "../../pages/ServiceCreation/Admin/AdminOfficeCleaningServices";
import RestaurantCleaningServices from "../../pages/ServiceCreation/Admin/AdminRestaurantCleaningServices";
import SportCenterCleaningServices from "../../pages/ServiceCreation/Admin/AdminSportCentersCleaningServices";


const AdminCategorizing = () => {
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
          <AdminHomeCleaningServices />
        </div>
      ) : locationState.name === "Apartment Cleaning" ? (
        <div>
          <AdminApartmentCleaningServices />
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

export default AdminCategorizing;
