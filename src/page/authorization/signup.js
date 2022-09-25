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
    }),
  { withTheme: true }
);

const initialFValues = {
  email: "",
  password: "",
  Cpassword: "",
};
export default function SignUp() {
  const [SelectedImage, setSelectedImage] = useState(null);

  const [, sendNotification] = useNotification();
  const [CPassword, setCPassword] = useState(false);
  const validate = useCallback((fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 5 ? "" : "Minimum 6 characters required.";
    if ("Cpassword" in fieldValues)
      temp.Cpassword =
        fieldValues.Cpassword.length > 5
          ? ""
          : "Minimum 6 characters required.";

    if ("Cpassword" in fieldValues) {
      // temp.Cpassword =
      //   values.password === values.Cpassword ? " " : "password not match ";
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
      console.log("okkk");
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
  return (
    <div className={classes.Main}>
      <Form className={classes.MainDiv} onSubmit={handleSubmit}>
        <p className={classes.Para}>Sign Up</p>
        <Input
          name="email"
          placeholder="Email"
          value={values.email}
          type="email"
          onChange={handleInputChange}
          // error={errors.email}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        {/* </div> */}
        <Input
          type="password"
          name="Cpassword"
          placeholder="Re-enter Password"
          value={values.Cpassword}
          onChange={handleInputChange}
          error={
            CPassword && values.password !== values.Cpassword
              ? "password not match"
              : ""
            // values.password !== values.Cpassword ? "password not match" : ""
          }
        />
        <Button type="submit" text="submit" />
        <div className={classes.GoBack}>
          Already have an account?&nbsp;
          <Link to="/login" className={classes.Angor}>
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
}
