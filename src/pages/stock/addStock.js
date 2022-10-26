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
    su_name: data ? data.su_name : "",
    su_contact: data ? data.su_contact : "",
    su_email: data ? data.su_email : "",
    su_contact: data ? data.contact : "",
    product_type: data ? data.product_type : "",
    monthly_due: data ? data.monthly_due : "",
  };

  const validate = useCallback((fieldValues = values) => {
    let temp = { ...errors };

    if ("su_name" in fieldValues)
      temp.su_name =
        fieldValues.su_name.length > 5 ? "" : "Minimum 6 characters required.";

    if ("su_contact" in fieldValues)
      temp.su_contact =
        fieldValues.su_contact.length > 8
          ? ""
          : "Minimum 8 characters required.";

    if ("su_email" in fieldValues)
      temp.su_email = /$^|.+@.+..+/.test(fieldValues.su_email)
        ? ""
        : "Email is not valid.";

    if ("product_type" in fieldValues)
      temp.product_type =
        fieldValues.product_type.length > 2
          ? ""
          : "Minimum 2 characters required.";

    if ("monthly_due" in fieldValues)
      temp.monthly_due =
        fieldValues.monthly_due.length > 1
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
      su_name: values.su_name,
      su_contact: values.su_contact,
      su_email: values.su_email,
      contact: values.su_contact,
      product_type: values.product_type,
      monthly_due: Number(values.monthly_due),
    };
    axios
      .post(`stock`, json, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        sendNotification({ msg: "success", variant: "success" });
        window.location.href = "/stock";
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
