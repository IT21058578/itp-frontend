import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AdminLayout, EmpLayout, UserLayout } from "./layouts"
import Invoice from './pages/invoice/InvoicePage';
import React from "react";
import RegisterPage from "./pages/RegisterPage";
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("sessionStorage");

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
      </Routes>
    </Router>
  );
}

export default App;
