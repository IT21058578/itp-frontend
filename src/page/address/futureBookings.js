import * as React from "react";
import { makeStyles, ThemeProvider } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Edit } from "@mui/icons-material";
import DialogsEdit from "./edit";
import axios from "../../axios";
import useNotification from "../../components/core/snakeBar";

const drawerWidth = 250;
const useStyles = makeStyles(
  {
    ListPrimary: {
      fontSize: "17px !important",
    },
  },
  { index: 1 }
);
const data = [
  {
    id: 1,
    date: "2022-11-11",
    time: "11:11",
    crew: "1",
    serviseType: "cleanig",
    payment: "2000",
  },
  {
    id: 2,
    date: "2022-10-11",
    time: "10:10",
    crew: "2",
    serviseType: "cleanig",
    payment: "2000",
  },
  {
    id: 3,
    date: "2022-11-11",
    time: "11:11",
    crew: "1",
    serviseType: "test 3",
    payment: "2000",
  },
  {
    id: 4,
    date: "2022-11-11",
    time: "11:11",
    crew: "1",
    serviseType: "test 4",
    payment: "2000",
  },
];

export default function Completed() {
  const [, sendNotification] = useNotification();

  const classes = useStyles();
  const [AllDatas, setAllDatas] = React.useState([]);
  const Editing = (row) => {
    setAllData(row);
    setOpen(true);
    console.log(row);
  };
  React.useEffect(() => {
    axios
      .get(`address`)
      .then((res) => {
        // console.log(res.data, "day sata");
        setAllDatas(res.data);
        // sendNotification({ msg: "success", variant: "success" });
      })
      .catch((error) => {
        console.log("There was an error!", error.response);
        sendNotification({ msg: "success", variant: "success" });
      });
  }, []);

  const Deleting = (row) => {
    console.log(row.id);
    axios
      .delete(`address?id=${row.id}`)
      .then((res) => {
        sendNotification({ msg: "success", variant: "success" });
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("There was an error!", error.response);
        sendNotification({ msg: "error", variant: "error" });
      });
  };
  const [open, setOpen] = React.useState(false);
  const [AllData, setAllData] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">country</TableCell>
              <TableCell align="right">Mobile</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AllDatas &&
              AllDatas.length > 0 &&
              AllDatas.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.cu_name}
                  </TableCell>
                  <TableCell align="right">{row.cu_address}</TableCell>
                  <TableCell align="right">{row.cu_city}</TableCell>
                  <TableCell align="right">{row.cu_country}</TableCell>
                  <TableCell align="right">{row.cu_mobile}</TableCell>
                  <TableCell align="center">
                    <EditIcon
                      style={{ color: "green", cursor: "pointer" }}
                      onClick={() => Editing(row)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    <DeleteIcon
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => Deleting(row)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <DialogsEdit
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          data={AllData}
        />
      )}
    </>
  );
}
