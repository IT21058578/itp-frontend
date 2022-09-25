import React, { useCallback, useState } from "react";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
import Input from "../../components/core/inputFeild";
import Button from "../../components/core/Button";
import { useForm, Form } from "../../components/core/formControl/useForm";
import { Link } from "react-router-dom";
import axios from "../../axios";
import useNotification from "../../components/core/snakeBar";
import FileUploader from "../../components/core/formControl/fileUploadLogin";
import { Checkbox } from "@mui/material";

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
        width: "660px",
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
      formSplit: {
        display: "flex",
        alignItems: "center",
      },
      formSplitChild: {
        margin: "12px",

        width: "50%",
      },
    }),
  { withTheme: true }
);

const initialFValues = {
  email: "",
  password: "",
  Cpassword: "",
};
export default function RegisterWithUs() {
  const [SelectedImage, setSelectedImage] = useState(null);

  const [, sendNotification] = useNotification();
  const [CPassword, setCPassword] = useState(false);
  const validate = useCallback((fieldValues = values) => {
    let temp = { ...errors };
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 5 ? "" : "Minimum 6 characters required.";
    if ("Cpassword" in fieldValues)
      temp.Cpassword =
        fieldValues.Cpassword.length > 5
          ? ""
          : "Minimum 6 characters required.";

    if ("Cpassword" in fieldValues) {
      setCPassword(true);
    }

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

  const classes = useStyles();
  // console.log(SelectedImage.name, "image");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate() && CPassword && values.password === values.Cpassword) {
      const Details = JSON.stringify({
        email: values.email,
        password: values.password,
        error: errors.password,
      });
      const data = new FormData();
      data.append("email", values.email);
      data.append("password", values.password);
      data.append("image", SelectedImage);

      console.log(Details, "details");
      axios
        .post(`user/register`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res, "response data");
          // localStorage.setItem("auth", Date.now());
          sendNotification({ msg: "success", variant: "success" });
          window.location.href = "/login";
        })
        .catch((error) => {
          console.log("There was an error!", error.response);
          if (!error?.response) {
            console.log("No Server Response", error);
          } else if (error.response?.status === 400) {
            console.log("Missing email or Password");
            sendNotification({
              msg: "Email already exist",
              variant: "error",
            });
          } else if (error.response?.status === 401) {
            console.log("Unauthorized");
          } else if (error.response?.status !== 400) {
            console.log("Login Failed");
          } else {
          }
        });
      // resetForm();
    } else {
      sendNotification({
        msg: "Enter correct password and email",
        variant: "error",
      });
    }
  };
  // user/login
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div className={classes.Main}>
      <Form className={classes.MainDiv} onSubmit={handleSubmit}>
        <p className={classes.Para}>Let’s get yourself registered with us!</p>

        <div className={classes.formSplit}>
          <div className={classes.formSplitChild}>
            <Input
              name="full_name"
              type="full_name"
              placeholder="Full Name"
              value={values.full_name}
              onChange={handleInputChange}
              error={errors.full_name}
              label="Full Name"
            />
            <Input
              name="NIC"
              type="NIC"
              placeholder="NIC Number"
              value={values.NIC}
              onChange={handleInputChange}
              error={errors.NIC}
              label="NIC Number"
            />
            <Input
              name="phone_number"
              type="phone_number"
              placeholder="Phone Number"
              value={values.phone_number}
              onChange={handleInputChange}
              error={errors.phone_number}
              label="Phone Number"
            />
          </div>
          <div className={classes.formSplitChild}>
            <FileUploader
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
              name="fileUploads"
              id="fileUploads"
              accept="image/*"
              //   src={SelectedImage}
              placeholder={SelectedImage ? SelectedImage.name : "Upload Image"}
            />

            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
                label="Email"
              />
            </div>
          </div>
        </div>
        <div style={{ margin: "12px" }}>
          <Input
            name="address"
            type="address"
            placeholder="Address"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
            label="Address"
          />
        </div>
        <Button type="submit" text="submit" />
        <div className={classes.GoBack}>
          <Checkbox {...label} defaultChecked />
          Terms of privacy of your data
        </div>
      </Form>
    </div>
  );
}
