import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AdminLayout, EmpLayout, UserLayout } from "./layouts"
import Invoice from './pages/invoice/InvoicePage';
import React from "react";
import Service from './pages/Service';
import ScAdminPanel from './pages/ScAdminPanel';
import ScPopupUpdate from './components/ScPopupUpdate';
import CreatForm from './components/ScCreateForm';
import ScHcBooking from './pages/ScHcBooking';
import ScBookingHook from './hooks/ScBookingHook';
import ScLcBooking from './pages/ScLcBooking';
import ServiceRequestForm from './components/ServiceRequestForm';
import RegisterPage from "./pages/RegisterPage";


//Place Main routes here.
function App() {
  return (
    <Router>
      <Routes>
        {/*Please put the pages into the appropriate layouts. 
        Userlayout is for customers. 
        AdminLayout is for admins and vice versa*/}
        <Route path="/*" element={<UserLayout />} />
        <Route path="/employee/*" element={<EmpLayout />}></Route>
        <Route path="/admin/*" element={<AdminLayout />} ></Route>


        {/*Distribute these routes into the above layouts accordingly*/}
        <Route path="invoice/*" element={<Invoice />} ></Route>
        <Route exact path='/service' element={<Service />} />
        <Route path='/adminService' element={<ScAdminPanel />} />
        <Route path='/update' element={<ScPopupUpdate />} />
        <Route path='/create' element={<CreatForm />} />
        <Route path='/homeClean' element={<ScHcBooking />} />
        <Route path='/booking' element={<ScBookingHook />} />
        <Route path='/laundryClean' element={<ScLcBooking />} />
        <Route path='/req' element={<ServiceRequestForm />} />
      </Routes>
    </Router>
  );
}

export default App;
