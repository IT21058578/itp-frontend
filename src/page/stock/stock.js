import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Completed from "./Completed";
import { Link } from "react-router-dom";

import axios from "../../axios";
import useNotification from "../../components/core/snakeBar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [, sendNotification] = useNotification();
  const [AllData, setAllData] = React.useState([]);
  const [Loading, setLoading] = React.useState(true);
  // Loading
  React.useEffect(() => {
    axios
      .get(`stock`)
      .then((res) => {
        console.log(res.data, "data");
        setAllData(res.data);
        // sendNotification({ msg: "success", variant: "success" });
        setLoading(false);
      })
      .catch((error) => {
        console.log("There was an error!", error.response);
        sendNotification({ msg: "success", variant: "success" });
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
        }}
      >
        <div></div>
        <Link
          to="/add-stock"
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
    </Box>
  );
}
