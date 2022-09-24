import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminLayout, EmpLayout } from "./layouts";
import Service from './pages/Service';
import ScAdminPanel from './pages/ScAdminPanel';
import ScPopupUpdate from './components/ScPopupUpdate';
import CreatForm from './components/ScCreateForm';
import ScHcBooking from './pages/ScHcBooking';
import ScBookingHook from './hooks/ScBookingHook';
import ScLcBooking from './pages/ScLcBooking';
import ServiceRequestForm from './components/ServiceRequestForm';

//Place Main routes here.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="employee/*" element={<EmpLayout />}></Route>
        <Route path="admin/*" element={<AdminLayout />} ></Route>
        <Route exact path='/service' element={<Service />} />
        <Route path='/admin' element={<ScAdminPanel />} />//admin 
        <Route path='/update' element={<ScPopupUpdate />} />//admin update service
        <Route path='/create' element={<CreatForm />} />//admin create service
        <Route path='/homeClean' element={<ScHcBooking />} />
        <Route path='/booking' element={<ScBookingHook />} />
        <Route path='/laundryClean' element={<ScLcBooking />} />
        <Route path='/req' element={<ServiceRequestForm />} />
      </Routes>
    </Router>
  );
}

export default App;
