import React from "react";
import { makeStyles } from "@material-ui/core";
import { FormControl } from "@mui/material";
import Controls from "./formControl/Controls";
import { Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  Para: {
    color: "#000000",
    letterSpacing: "0.26px",
    textAlign: "left",
    marginBottom: "-25px",
    padding: "0 0 10px 6px",
    fontWeight: "600",
  },
  inputDoller: {
    top: "37px",
    right: "23px",
    position: "absolute",
    zIndex: 111,
    fontWeight: 900,
  },
}));

export default function Button(props) {
  const {
    value1,
    onChange1,
    error1,
    disabled1,
    name1,
    label1,
    value2,
    onChange2,
    // error2,
    // disabled2,
    name2,
    label2,
    hlabel,
  } = props;
  const classes = useStyles(props);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <span className={classes.Para}>{hlabel}</span>
      
      <Box sx={{ display: "flex" }}>
        <Controls.Input
          width="20px"
          name={name1}
          label={label1}
          value={value1}
          onChange={onChange1}
          error={error1}
          disabled={disabled1}
          maxWidth="100px !important"
        />
        <FormControl
          sx={{
            m: 1,
            minHeight: 68,
            margin: 0,
            display: "flex",
            justyContent: "center",
          }}
        >
          <div
            style={{
              marginTop: "-3px",
              minWidth: "120px",
              padding: "2px 2px 2px 32px",
            }}
          >
            <span className={classes.inputDoller}>% </span>
            <Controls.Input
              width="20px"
              name={name2}
              label={label2}
              value={value2}
              onChange={onChange2}
              error={error1}
              disabled={disabled1}
              maxWidth="50px !important"
            />
          </div>
        </FormControl>
      </Box>
    </Box>
  );
}
