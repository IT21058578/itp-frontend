import React from "react";

export default function FileUploader(props) {
  return (
    <div style={{ position: "relative" }}>
      <label
        htmlFor={props.id}
        style={{ height: "70px", paddingTop: "22px", margin: "18px 0px 30px" }}
      >
        <div
          style={{
            width: "230px",
            height: "44px",
            //   #7070701A
            border: "2px solid #7070701A",
            opacity: "0.5",
            display: "flex",
            alignItems: "center",
            borderRadius: "32px",
            paddingLeft: "22px",
          }}
          variant="contained"
          component="span"
        >
          {props.placeholder}
        </div>
      </label>
      <input
        style={{
          // display: "none",
          // background: "red",
          height: "52px",
          // paddingTop: "22px",
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
        // value={props.value}
      />
    </div>
  );
}
