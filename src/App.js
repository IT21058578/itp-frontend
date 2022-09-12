import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminLayout, EmpLayout } from "./layouts";
import Service from './pages/Service';
import ScAdminPanel from './pages/ScAdminPanel';
import ScPopupUpdate from './components/ScPopupUpdate';
import CreatForm from './components/ScCreateForm';

//Place Main routes here.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="employee/*" element={<EmpLayout />}></Route>
        <Route path="admin/*" element={<AdminLayout />} ></Route>
        <Route path='/' element={<Service />} />
        <Route path='/admin' element={<ScAdminPanel />} />
        <Route path='/update' element={<ScPopupUpdate />} />
        <Route path='/create' element={<CreatForm />} />
      </Routes>
    </Router>
  );
}

export default App;
