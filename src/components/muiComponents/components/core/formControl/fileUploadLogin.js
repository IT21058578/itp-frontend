import { Avatar } from "@mui/material";
import React from "react";

export default function FileUploader(props) {
  return (
    <div style={{ position: "relative", height: "146px" }}>
      <label
        htmlFor={props.id}
        style={{ height: "70px", paddingTop: "22px", margin: "18px 0px 30px" }}
      >
        <Avatar
          sx={{ width: "100px", height: "100px", margin: "0 auto" }}
          alt="User"
          src={props.src}
        />

        <div
          style={{
            width: "100%",
            alignItems: "center",
            borderRadius: "16px",
            paddingLeft: "22px",
            fontSize: "14px",
            fontFamily: "Poppins",
            color: "#ddd",
          }}
          variant="contained"
          component="span"
        >
          {props.placeholder}
        </div>
      </label>
      <input
        style={{
          height: "52px",
          position: "absolute",
          left: 0,
          opacity: 0,
          top: "0px",
          width: "223px",
        }}
        accept={props.accept}
        id={props.id}
        multiple
        type="file"
        onChange={props.onChange}
        name={props.name}
      />
    </div>
  );
}
