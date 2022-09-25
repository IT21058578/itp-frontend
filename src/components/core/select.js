import React from "react";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
import { MenuItem, FormControl, Select } from "@mui/material";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles(() =>
  createStyles({
    Para: {
      color: "#809FB8",
      letterSpacing: "0.26px",
      textAlign: "left",
    },
    Select: {},
    root: {
      width: "160px",
      borderRadius: "8px !important",
      color: "#809FB8",
      height: "32px",
    },
    input: {
      padding: "5px 14px",
      color: "#809FB8",
    },
  })
);
export default function Selects(props) {
  const { label, arrayOfData } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState("enter");

  const handleChange = (event) => {
    let selectedValue = event.target.value;
    props.onSelectChange(selectedValue);
    setValue(selectedValue);
  };

  // let arrayOfDatas = arrayOfData;
  // arrayOfData && console.log(arrayOfDatas, "data");
  let Options =
    arrayOfData &&
    arrayOfData.map((data,i) => (
      <MenuItem style={{ color: "#809FB8" }} key={i} value={data.id}>
        {data.name}
      </MenuItem>
    ));
  return (
    <div style={{ height: 72 }}>
      <div className={classes.Para}>{label}</div>
      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          minHeight: 60,
          margin: 0,
        }}
      >
        
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          classes={{
            select: classes.Select,
            iconOutlined: classes.iconOutlined,
          }}
          className={classes.root}
          input={<OutlinedInput classes={{ input: classes.input }} />}
          defaultValue={value}
        >
          {Options}
        </Select>
      </FormControl>
    </div>
  );
}
