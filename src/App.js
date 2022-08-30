import EmpLayout from "./empManage/EmpLayout";
import AdmEmpLayout from "./empManage/AdmEmpLayout";
import AdmSchedLayout from "./schedManage/AdmSchedLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="employee/*" element={<EmpLayout />}></Route>
          <Route path="admin">
            <Route path="schedule/*" element={<AdmSchedLayout />}></Route>
            <Route path="employee/*" element={<AdmEmpLayout />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
