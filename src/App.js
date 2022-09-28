import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AdminLayout, EmpLayout } from "./layouts"
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
import HomePage from './pages/HomePage';


//Place Main routes here.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="employee/*" element={<EmpLayout />}></Route>
        <Route path="admin/*" element={<AdminLayout />} ></Route>
        <Route path="invoice/*" element={<Invoice />} ></Route>
        <Route path='/service' element={<Service />} />
         <Route path='/admin' element={<ScAdminPanel />} />
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
