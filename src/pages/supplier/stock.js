import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Completed from "./Completed";
import { Link } from "react-router-dom";
import axios from "../../axios";
import useNotification from "../../components/muiComponents/components/core/snakeBar";


export default function StockManagement() {
  const [, sendNotification] = useNotification();
  const [AllData, setAllData] = React.useState([]);
  const [Loading, setLoading] = React.useState(true);
  // Loading
  React.useEffect(() => {
    axios
      .get(`supplier`)
      .then((res) => {
        console.log(res.data, "data");
        setAllData(res.data);
        // sendNotification({ msg: "success", variant: "success" });
        setLoading(false);
      })
      .catch((error) => {
        console.log("There was an error!", error.response);
        // sendNotification({ msg: "success", variant: "success" });
        setLoading(false);
      });
  }, []);

  return (
    <div sx={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
        }}
      >
        <div></div>
        <Link
          to="/admin/add-supplier"
          style={{
            width: "100px",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            backgroundColor: "#0078D8",
            color: "#fff",
            borderRadius: "12px",
            padding: "10px",
          }}
        >
          ADD
        </Link>
      </div>
      <br />
      <br />
      {<Completed data={AllData} loading={Loading} />}
    </div>
  );
}
