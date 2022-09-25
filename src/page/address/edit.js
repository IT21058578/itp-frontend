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
import { useForm, Form } from "../../components/core/formControl/useForm";
import Input from "../../components/core/inputFeild";

import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";

import axios from "../../axios";
import useNotification from "../../components/core/snakeBar";

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
  const [, sendNotification] = useNotification();

  const classes = useStyles();
  const { open, handleClickOpen, handleClose, data } = props;

  const initialFValues = {
    cu_name: data ? data.cu_name : "",
    cu_address: data ? data.cu_address : "|",
    cu_city: data ? data.cu_city : "|",
    cu_country: data ? data.cu_country : "|",
    cu_mobile: data ? data.cu_mobile : "|",
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
    const Details = JSON.stringify({
      cu_name: values.cu_name,
      cu_address: values.cu_address,
      cu_city: values.cu_city,
      cu_country: values.cu_country,
      cu_mobile: values.cu_mobile,
    });

    axios
      .put(`address`, Details, {
        params: { id: data.id },
        headers: { "Content-Type": "application/json; charset=utf8" },
      })
      .then((res) => {
        sendNotification({ msg: "success", variant: "success" });
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("There was an error!", error.response);
        sendNotification({ msg: "error", variant: "error" });
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
          <div>
            <Input
              name="cu_name"
              type="cu_name"
              placeholder="Customer Name"
              value={values.cu_name}
              onChange={handleInputChange}
              error={errors.cu_name}
              label="Customer Name"
            />
            <br />
            <Input
              name="cu_address"
              type="cu_address"
              placeholder="Customer Address"
              value={values.cu_address}
              onChange={handleInputChange}
              error={errors.cu_address}
              label="Customer Address"
            />
            <br />

            <Input
              name="cu_city"
              type="cu_city"
              placeholder="Customer City"
              value={values.cu_city}
              onChange={handleInputChange}
              error={errors.cu_city}
              label="Customer City"
            />
            <br />

            <Input
              name="cu_country"
              type="cu_country"
              placeholder="Customer Country"
              value={values.cu_country}
              onChange={handleInputChange}
              error={errors.cu_country}
              label="Customer Country"
            />
            <br />

            <Input
              name="cu_mobile"
              type="cu_mobile"
              placeholder="Customer Mobile"
              value={values.cu_mobile}
              onChange={handleInputChange}
              error={errors.cu_mobile}
              label="Customer Mobile"
            />
          </div>
        </Form>
        <DialogContent dividers></DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSend}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
