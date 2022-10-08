import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AdminLayout, EmpLayout } from "./layouts"
import Invoice from './pages/invoice/InvoicePage';



//Place Main routes here.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="employee/*" element={<EmpLayout />}></Route>
        <Route path="admin/*" element={<AdminLayout />} ></Route>

        <Route path="invoice/*" element={<Invoice />} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
