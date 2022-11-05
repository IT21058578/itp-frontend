import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useForm, Form } from "../../components/muiComponents/components/core/formControl/useForm";
import Input from "../../components/muiComponents/components/core/inputFeild";

import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
import ResponsiveAppBar from "../../components/muiComponents/components/layout/navbar/navbar";
import { Container } from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import axios from "../../axios";
import useNotification from "../../components/muiComponents/components/core/snakeBar";

const useStyles = makeStyles(
  () =>
    createStyles({
      Main: {
        backgroundColor: "#FFFFFF",
        margin: "0 auto",
      },
      MainDiv: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",

        minHeight: "100vh",
        height: "auto",
        width: "500px",
        margin: "0 auto",

        // backgroundColor: "#ccc",
      },
      Para: {
        color: "#4B0082",
        fontSize: "30px",
        fontFamily: "Poppins",
        fontWeight: "800",
        textAlign: "center",
        margin: "10px auto 90px",
      },
      Angor: { color: "#4B0082", textDecoration: "underline" },
      GoBack: {
        color: "#000000",
        fontFamily: "Poppins",
        fontSize: "30px",
        fontWeight: 400,
        paddingTop: "50px",
        textAlign: "center",
      },
    }),
  { withTheme: true }
);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DialogsAdd(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [SelectedImage, setSelectedImage] = useState(null);
  const [, sendNotification] = useNotification();

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const { open, handleClickOpen, handleClose, data } = props;

  const initialFValues = {
    productID: data ? data.productID : "",
    productType: data ? data.productType : "",
    su_email: data ? data.su_email : "",
    productType: data ? data.contact : "",
    availableStock: data ? data.availableStock : "",
    nextPurchaseDate: data ? data.nextPurchaseDate : "",
  };

  const validate = useCallback((fieldValues = values) => {
    let temp = { ...errors };

    if ("productID" in fieldValues)
      temp.productID =
        fieldValues.productID.length > 5 ? "" : "Minimum 6 characters required.";

    if ("productType" in fieldValues)
      temp.productType =
        fieldValues.productType.length > 1
          ? ""
          : "not empty";

    if ("su_email" in fieldValues)
      temp.su_email = /$^|.+@.+..+/.test(fieldValues.su_email)
        ? ""
        : "Email is not valid.";

    if ("availableStock" in fieldValues)
      temp.availableStock =
        fieldValues.availableStock.length > 1
          ? ""
          : "Not Empty ..";

    if ("nextPurchaseDate" in fieldValues)
      temp.nextPurchaseDate =
        fieldValues.nextPurchaseDate.length > 1
          ? ""
          : "Minimum 2 characters required.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  });
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );
  const handleSend = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("koko");
      handleSubmit();
    } else {
      sendNotification({ msg: "enter correct feild", variant: "error" });
    }
    // handleSubmit();
    // handleClose();
  };
  const handleSubmit = (e) => {
    console.log(values);
    const json = {
      productID: values.productID,
      productType: values.productType,
      contact: values.productType,
      availableStock: values.availableStock,
      nextPurchaseDate: (values.nextPurchaseDate),
    };
    axios
      .post(`stock`, json, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        sendNotification({ msg: "success", variant: "success" });
        window.location.href = "/admin/stock";
      })
      .catch((error) => {
        console.log("There was an error!", error.response);
        sendNotification({ msg: "something went wrong", variant: "error" });
      });
  };
  return (
    <div>
    
      <br />
      <Container>
        <Form className={classes.MainDiv}>
          <Input
            name="productID"
            label="Product ID"
            placeholder="Product ID"
            value={values.productID}
            type="text"
            onChange={handleInputChange}
            error={errors.productID}
          />
          <br />

          <Input
            name="productType"
            label="Product Type"
            type="productType"
            placeholder="Product Type"
            value={values.productType}
            onChange={handleInputChange}
            error={errors.productType}
          />
          <br />

         

          <Input
            name="availableStock"
            type="availableStock"
            placeholder="Available Stock"
            value={values.availableStock}
            onChange={handleInputChange}
            error={errors.availableStock}
            label="Available Stock"
          />
          <br />
          <Input
            name="nextPurchaseDate"
            type="date"
            placeholder="next Purchase Date "
            value={values.nextPurchaseDate}
            onChange={handleInputChange}
            error={errors.nextPurchaseDate}
            label="next Purchase Date"
          />
          <br />

          <br />
          <br />
          <Button
            style={{ background: "green", color: "#fff" }}
            onClick={handleSend}
          >
            Add
          </Button>
        </Form>
      </Container>
      <br />
      <br />
      <br />
    </div>
  );
}
