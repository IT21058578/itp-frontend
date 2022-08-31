import EmpLayout from "./empManage/EmpLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="employee/*" element={<EmpLayout />}></Route>
          <Route path="admin/*" element={<AdminLayout />} ></Route>
        </Routes>
      </Router>
    </div >
  );
}

export default App;
