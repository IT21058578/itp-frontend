import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(values, value, name, "new value");
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };
  const handleUploadChange = (e) => {
    // console.log("11");
    const { name, files, value } = e.target;
    // console.log(name, "name", files, "file", value, "//////");
    setValues({
      ...values,
      [name]: "files[0]",
    });
    // console.log(values, "/////");
    // setValues(e.target.files[0]);
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    handleUploadChange,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // "& .MuiFormControl-root": {
    //   width: "80%",
    //   margin: theme.spacing(1),
    // },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
