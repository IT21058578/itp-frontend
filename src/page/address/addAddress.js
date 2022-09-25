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
  cu_name: "",
  cu_address: "",
  cu_city: "",
  cu_country: "",
  cu_mobile: "",
};
export default function AddAddress() {
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

    const Details = JSON.stringify({
      cu_name: values.cu_name,
      cu_address: values.cu_address,
      cu_city: values.cu_city,
      cu_country: values.cu_country,
      cu_mobile: values.cu_mobile,
    });

    console.log(Details, "details");
    axios
      .post(`address`, Details, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
       
        sendNotification({ msg: "success", variant: "success" });
      })
      .catch((error) => {
        console.log("There was an error!", error.response);
        sendNotification({ msg: "success", variant: "success" });
      });
  };
  // user/login
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div className={classes.Main}>
      <Form className={classes.MainDiv} onSubmit={handleSubmit}>
        <p className={classes.Para}>My Address</p>

        <div className={classes.formSplit}>
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
            <Input
              name="cu_address"
              type="cu_address"
              placeholder="Customer Address"
              value={values.cu_address}
              onChange={handleInputChange}
              error={errors.cu_address}
              label="Customer Address"
            />
            <Input
              name="cu_city"
              type="cu_city"
              placeholder="Customer City"
              value={values.cu_city}
              onChange={handleInputChange}
              error={errors.cu_city}
              label="Customer City"
            />
            <Input
              name="cu_country"
              type="cu_country"
              placeholder="Customer Country"
              value={values.cu_country}
              onChange={handleInputChange}
              error={errors.cu_country}
              label="Customer Country"
            />
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
        </div>

        <Button type="submit" text="Submit" />
        {/* <div className={classes.GoBack}>
          <Checkbox {...label} defaultChecked />
          Terms of privacy of your data
        </div> */}
      </Form>
      <br />
      <br />
      <br />
    </div>
  );
}
