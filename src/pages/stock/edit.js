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
        margin: "12px",
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

export default function DialogsEdit(props) {
  const classes = useStyles();
  const { open, handleClickOpen, handleClose, data } = props;
  const [, sendNotification] = useNotification();
  const [loading, setLoading] = useState(true);
  const initialFValues = {
    productID: data ? data.productID : "",
    productType: data ? data.productType : "",
    su_email: data ? data.su_email : "",
    contact: data ? data.contact : "",
    availableStock: data ? data.availableStock : "",
    nextPurchaseDate: data ? data.nextPurchaseDate : "",
  };

  const validate = useCallback((fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 5 ? "" : "Minimum 6 characters required.";

    // console.log(values.password, values.Cpassword, "///");
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

    console.log("kok");
    handleSubmit();
    // handleClose();
  };
  const handleSubmit = (e) => {
    console.log(values);
    const json = {
      productID: values.productID,
      productType: values.productType,
      su_email: values.su_email,
      contact: values.contact,
      availableStock:  values.availableStock,
      nextPurchaseDate: (values.nextPurchaseDate),
    };
    axios
      .put(`stock`, json, {
        params: { id: data.id },
        headers: { "Content-Type": "application/json; charset=utf8" },
      })
      .then((res) => {
        sendNotification({ msg: "success", variant: "success" });
        setLoading(false);
        window.location.href = "/admin/stock";
      })
      .catch((error) => {
        console.log("There was an error!", error.response);
        sendNotification({ msg: "error", variant: "error" });
        setLoading(false);
      });
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Edit Data
        </BootstrapDialogTitle>
        <Form className={classes.MainDiv} onSubmit={handleSubmit}>
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

          {/* <Input
            name="su_email"
            type="su_email"
            placeholder="Email"
            value={values.su_email}
            onChange={handleInputChange}
            error={errors.su_email}
            label="Email"
          />
          <br /> */}

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
            placeholder="Next Purchase Date"
            value={values.nextPurchaseDate}
            onChange={handleInputChange}
            error={errors.nextPurchaseDate}
            label="Next Purchase Date"
          />
        </Form>
        <DialogContent dividers></DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSend}>
            {loading ? "Save changes" : "loading..."}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
