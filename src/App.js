import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminLayout, EmpLayout } from "./layouts"

//Place Main routes here.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="employee/*" element={<EmpLayout />}></Route>
        <Route path="admin/*" element={<AdminLayout />} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
