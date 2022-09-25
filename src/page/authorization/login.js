import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
import Input from "../../components/core/inputFeild";
import Button from "../../components/core/Button";
import { useForm, Form } from "../../components/core/formControl/useForm";
import { Link } from "react-router-dom";
import axios from "../../axios";
import useNotification from "../../components/core/snakeBar";
// import Button from '@mui/material/Button';
// import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
        margin: "10px auto 20px",
      },
      Angor: { color: "#4B0082", textDecoration: "underline" },
      GoBack: {
        color: "#000000",
        fontFamily: "Poppins",
        fontSize: "24px",
        fontWeight: 400,
        paddingTop: "50px",
        textAlign: "center",
      },
      GoBack2: {
        color: "#000000",
        fontFamily: "Poppins",
        fontSize: "24px",
        fontWeight: 400,
        paddingTop: "20px",
        textAlign: "center",
      },
      DialogRoot: {
        // background: "red !important",
        padding: "3rem 4rem",
      },
    }),
  { withTheme: true }
);

const initialFValues = {
  email: "",
  password: "",
};
export default function Login() {
  const [, sendNotification] = useNotification();
  const [AdminLogin, setAdminLogin] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 5 ? "" : "Minimum 6 characters required.";
    // if ("Cpassword" in fieldValues) {
    //   temp.Cpassword =
    //     values.password === values.Cpassword ? " " : "password not match ";
    // }

    // console.log(values.password, values.Cpassword, "///");
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const classes = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (validate()) {
    const Details = JSON.stringify({
      email: values.email,
      password: values.password,
    });
    // console.log(Details, "details");
    // admin post
    axios
      .post(`/admin/login`, Details, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setAdminLogin(true);
        // console.log(res, "response data");
        // console.log("then come");
        sendNotification({ msg: "success", variant: "success" });
        localStorage.setItem("adminAuth", JSON.stringify(res.data));
        window.location.href = "/";
      })
      // }
      .catch((error) => {
        console.error("There was an error!", error);
      });

    ///user post
    {
      !AdminLogin &&
        axios
          .post(`/user/login`, Details, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            // console.log(res, "response data");
            // console.log("then come");
            sendNotification({ msg: "success", variant: "success" });
            localStorage.setItem("auth", JSON.stringify(res.data));
            window.location.href = "/";
          })
          // }
          .catch((error) => {
            console.error("There was an error!", error);

            if (!error?.response) {
              sendNotification({ msg: "No Server Response", variant: "error" });
              // console.log("No Server Response");
            } else if (error.response?.status === 400) {
              setTimeout(() => {
                sendNotification({
                  msg: "Missing Username or Password",
                  variant: "error",
                });
              }, 2000);

              // console.log("Missing Username or Password");
            } else if (error.response?.status === 401) {
              console.error("Unauthorized");
            } else {
              console.error("Login Failed");
            }
          });
    }
    // }
    // alert(3);
  };
  //forgot password
  // ForgotEmail
  const [ForgotEmail, setForgotEmail] = React.useState("");
  const [OTP, setOTP] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordError, setNewPasswordError] = React.useState("");
  const [CnewPassword, setCnewPassword] = React.useState("");
  const [CnewPasswordError, setCnewPasswordError] = React.useState("");
  const [OTPValid, setOTPValid] = React.useState(false);
  // const [Reset, setReset] = React.useState(false);
  // NewPasswordError
  const [ForgotEmailSentCorrcet, setForgotEmailSentCorrcet] =
    React.useState(false);
  const [ForgotEmailErrorMsg, setForgotEmailErrorMsg] = React.useState("");
  const [OTPErrorMsg, setOTPErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const ForgotPassword = () => {
    setOpen(true);

    // console.log("forgot password");
  };
  // handleForgotSubmit
  var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  const forgotMailchange = (e) => {
    setForgotEmailErrorMsg("");
    setForgotEmail(e.target.value);
    if (ForgotEmail === "") {
      setForgotEmailErrorMsg("enter the your email");
    }
  };
  // OTPsent
  const OTPsent = (e) => {
    setOTPErrorMsg("");
    setOTP(e.target.value);
    if (OTP === "") {
      // setOTPErrorMsg("enter the your OTP");
    }
  };
  const handleForgotSubmit = (e) => {
    // ForgotEmail
    e.preventDefault();
    // console.log(ForgotEmail);
    if (ForgotEmail === "") {
      setForgotEmailErrorMsg("enter the your email");
    } else if (regex.test(ForgotEmail)) {
      // enter the axios code
      // console.log("forgot password");
      axios
        .post(
          `/user/sendOTP`,
          { email: ForgotEmail },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          // console.log(res, "response data");
          // console.log("then come");
          if (res.data.match === true) {
            setForgotEmailSentCorrcet(true);
          }
          sendNotification({ msg: "success", variant: "success" });
          // window.location.href = "/";
        })
        // }
        .catch((error) => {
          console.error("There was an error!", error);

          if (!error?.response) {
            sendNotification({ msg: "No Server Response", variant: "error" });
            // console.log("No Server Response");
          } else if (error.response?.status === 400) {
            sendNotification({
              msg: "Incorrect email",
              variant: "error",
            });
            console.log("Missing Username or Password");
          } else if (error.response?.status === 401) {
            sendNotification({
              msg: "Incorrect email",
              variant: "error",
            });
            // console.log("Unauthorized");
          }
        });
    } else {
      setForgotEmailErrorMsg("enter the valid email");
    }
  };
  const handleOTPSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `/user/checkOTP`,
        { email: ForgotEmail, resetotp: OTP },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        // console.log(res, "response data");
        // console.log("then come");
        if (res.data.user.match === true) {
          setOTPValid(true);
        } else {
          sendNotification({ msg: "OTP not correct", variant: "error" });
        }
      })
      // }
      .catch((error) => {
        console.error("There was an error!", error);
        if (!error?.response) {
          sendNotification({ msg: "No Server Response", variant: "error" });
          // console.log("No Server Response");
        } else if (error.response?.status === 400) {
          sendNotification({
            msg: "Incorrect email",
            variant: "error",
          });
          // console.log("Missing Username or Password");
        } else if (error.response?.status === 401) {
          sendNotification({
            msg: "Incorrect email",
            variant: "error",
          });
          // console.log("Unauthorized");
        }
      });
  };
  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();

    if (CnewPassword !== newPassword) {
      setCnewPasswordError("Password not match");
    } else {
      setCnewPasswordError("");
    }
    // console.log("handleNewPasswordSubmit");
    if (
      CnewPassword === newPassword &&
      newPassword !== "" &&
      newPassword.length > 5
    ) {
      axios
        .put(
          `/user/resetpassword/${ForgotEmail}`,
          { password: newPassword },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          // console.log(res, "response data");
          // console.log("then come");
          // if (res.data.user.match === true) {
          //   setOTPValid(true);
          // }
          sendNotification({ msg: "password change", variant: "success" });
          window.location.href = "/";
        })
        // }
        .catch((error) => {
          console.error("There was an error!", error);
          if (!error?.response) {
            sendNotification({ msg: "No Server Response", variant: "error" });
            // console.log("No Server Response");
          } else if (error.response?.status === 400) {
            sendNotification({
              msg: "Incorrect email",
              variant: "error",
            });
            // console.log("Missing Username or Password");
          } else if (error.response?.status === 401) {
            sendNotification({
              msg: "Incorrect email",
              variant: "error",
            });
            // console.log("Unauthorized");
          } else {
            // console.log("Login Failed");
          }
        });
    }
  };
  const newPasswordCheck = (e) => {
    setNewPassword(() => e.target.value);
    if (e.target.value.length < 5) {
      setNewPasswordError("Minimum 6 characters required.");
    } else {
      setNewPasswordError("");
    }
  };
  const CnewPasswordCheck = (e) => {
    setCnewPassword(() => e.target.value);
  };
  return (
    <div className={classes.Main}>
      <Form className={classes.MainDiv} onSubmit={handleSubmit}>
        <p className={classes.Para}>Login</p>
        <Input
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        {/* <div style={{ margin: "16px auto" }}> */}
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        <div style={{ width: "150px", margin: "0 auto" }}>
          <Button type="submit" text="Login" />
        </div>

        <div className={classes.GoBack}>
          <Link to="/" className={classes.Angor} onClick={ForgotPassword}>
            Forgot Password?
          </Link>
        </div>
        {/* </div> */}

        <div className={classes.GoBack2}>
          Don’t have an account?&nbsp;
          <Link to="/signup" className={classes.Angor}>
            Sign Up
          </Link>
        </div>
      </Form>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.DialogRoot }}
      >
        {!ForgotEmailSentCorrcet && (
          <form>
            <DialogTitle sx={{ margin: "0 important", padding: "0 important" }}>
              Enter your email
            </DialogTitle>
            <DialogContent
              sx={{ margin: "0 important", padding: "0 important" }}
            >
              <DialogContentText>
                {/* To subscribe to this website, please enter your email address
                here. We will send updates occasionally. */}
              </DialogContentText>

              <Input
                name="forgotemail"
                placeholder="Email"
                value={ForgotEmail}
                onChange={forgotMailchange}
                error={errors.email}
                autoFocus
                required
              />
              <DialogContentText
                sx={{ color: "red", opacity: "0.6", paddingTop: "20px" }}
              >
                {ForgotEmailErrorMsg}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button text="Cancel" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" text="submit" onClick={handleForgotSubmit}>
                submit
              </Button>
            </DialogActions>
          </form>
        )}
        {ForgotEmailSentCorrcet && !OTPValid && (
          <form onSubmit={handleOTPSubmit}>
            <DialogTitle sx={{ margin: "0 important", padding: "0 important" }}>
              Enter your OTP
            </DialogTitle>
            <DialogContent
              sx={{ margin: "0 important", padding: "0 important" }}
            >
              <DialogContentText>
                {/* To subscribe to this website, please enter your email address
                here. We will send updates occasionally. */}
              </DialogContentText>

              <Input
                name="otp"
                placeholder="OTP"
                value={OTP}
                onChange={OTPsent}
                error={errors.email}
                autoFocus
                required
              />
              <DialogContentText
                sx={{ color: "red", opacity: "0.6", paddingTop: "20px" }}
              >
                {OTPErrorMsg}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button text="Cancel" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" text="submit">
                submit
              </Button>
            </DialogActions>
          </form>
        )}
        {OTPValid && (
          <form onSubmit={handleNewPasswordSubmit}>
            <DialogTitle sx={{ margin: "0 important", padding: "0 important" }}>
              Enter your Password
            </DialogTitle>
            <DialogContent
              sx={{ margin: "0 important", padding: "0 important" }}
            >
              <DialogContentText>
                {/* To subscribe to this website, please enter your email address
              here. We will send updates occasionally. */}
              </DialogContentText>

              <Input
                name="newPassword"
                placeholder="new password"
                value={newPassword}
                onChange={newPasswordCheck}
                error={errors.email}
                autoFocus
                required
                type="password"
              />
              <DialogContentText
                sx={{ color: "red", opacity: "0.6", paddingTop: "20px" }}
              >
                {newPasswordError}
              </DialogContentText>
              <Input
                name="CnewPassword"
                placeholder="conform new password"
                value={CnewPassword}
                onChange={CnewPasswordCheck}
                error={errors.email}
                autoFocus
                required
                type="password"
              />
              <DialogContentText
                sx={{ color: "red", opacity: "0.6", paddingTop: "20px" }}
              >
                {CnewPasswordError}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button text="Cancel" onClick={() => handleClose(false)}>
                Cancel
              </Button>
              <Button type="submit" text="submit">
                submit
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </div>
  );
}
