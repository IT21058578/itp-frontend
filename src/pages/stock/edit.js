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
    su_name: data ? data.su_name : "",
    su_contact: data ? data.su_contact : "",
    su_email: data ? data.su_email : "",
    contact: data ? data.contact : "",
    product_type: data ? data.product_type : "",
    monthly_due: data ? data.monthly_due : "",
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
      su_name: values.su_name,
      su_contact: values.su_contact,
      su_email: values.su_email,
      contact: values.contact,
      product_type:  values.product_type,
      monthly_due: Number(values.monthly_due),
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
            name="su_name"
            label="Name"
            placeholder="Name"
            value={values.su_name}
            type="text"
            onChange={handleInputChange}
            error={errors.su_name}
          />
          <br />

          <Input
            name="su_contact"
            label="Contact"
            type="su_contact"
            placeholder="Contact"
            value={values.su_contact}
            onChange={handleInputChange}
            error={errors.su_contact}
          />
          <br />

          <Input
            name="su_email"
            type="su_email"
            placeholder="Email"
            value={values.su_email}
            onChange={handleInputChange}
            error={errors.su_email}
            label="Email"
          />
          <br />

          <br />
          <Input
            name="product_type"
            type="product_type"
            placeholder="Product Type"
            value={values.product_type}
            onChange={handleInputChange}
            error={errors.product_type}
            label="Product Type"
          />
          <br />
          <Input
            name="monthly_due"
            type="number"
            placeholder="Monthly Due"
            value={values.monthly_due}
            onChange={handleInputChange}
            error={errors.monthly_due}
            label="Monthly Due"
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
