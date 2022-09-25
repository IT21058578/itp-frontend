import React from "react";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./reportPage";

const App = () => (
  <PDFViewer height="100vh">
    <MyDocument />
  </PDFViewer>
);

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
