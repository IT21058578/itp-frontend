import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@material-ui/core";
import Accordions from "./accordionCore";

const useStyles = makeStyles(() =>
  createStyles({
    TableCol: {
      display: "flex",
      // flexDirection: "Column",
      margin: "0 auto",
      justifyContent: "space-between",
    },
    StartLotDiv: {
      padding: "40px 0px 20px ",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    StartLot: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "162px",
      height: "32px",
      background: "#55815C 0% 0% no-repeat padding-box",
      borderRadius: "8px",
      cursor: "pointer",
      color: "#fff",
    },

    StartLot1: {
      color: "#3C9061",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "310px",
      height: "78px",
      background: "#FFFFFF",
      borderRadius: "20px",
      cursor: "pointer",
      border: "1px solid #3C9061",
      margin: "0 10px 0 0px",
      fontSize: "1.8rem",
      fontWeight: "500",
      "&:hover": {
        color: "#fff",
        background: "#3C9061 0% 0% no-repeat padding-box",
      },
    },

    StartLot2: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "162px",
      height: "32px",
      background: "#68B174 0% 0% no-repeat padding-box",
      borderRadius: "8px",
      color: "#fff",
      cursor: "pointer",
    },
    AccordionRoot: {
      backgroundColor: "#6CD3A0",
      position: "inherit !important",
      borderRadius: "16px !important ",
      boxShadow: "none !important",
      marginTop: "10px !important",
      "&$expanded": {
        border: "none !important",
      },
    },
    AccordionSummaryRoot: {
      background: "#0000000D 0% 0% no-repeat padding-box !important",
      backgroundColor: "#0000000D !important",
      position: "inherit !important",
      borderRadius: "32px !important ",
      border: "1px solid #7070701A !important",
      boxShadow: "none !important",
      "&$expanded": {
        border: "none !important",
      },
      margin: "0 auto !important",
      maxWidth: "1500px !important",
      height: "78px !important",
    },
    SummaryPara: {
      color: "#000000",
      fontSize: "20px",
      fontWeight: "600",
      paddingLeft: "58px",
    },
    AIcon: {
      padding: "0rem 6rem",
    },
    AccordionDetailsRoot: {
      padding: "0px !important",
    },
  })
);

export default function Germination(props) {
  const classes = useStyles();
  const {
    summary,
    detailData,
    AddAnotherWeek,
    noAddWeek,
    open,
    deopen,
    expanded,
    handleChange,
    expandeds,
    nextStateChange,
  } = props;
  console.log(open);
  const nextState = () => {
    console.log("okoko");
    nextStateChange();
  };
  return (
    // <>
    //   {dat &&
    //     dat.length > 0 &&
    //     dat.map((item, i) => (
    <>
      {open && (
        <Accordion
          classes={{ root: classes.AccordionRoot }}
          expanded={open ? false : true}
          style={{ marginTop: "10px !imporatnt" }}
        >
          <AccordionSummary
            // key={i}
            classes={{
              root: classes.AccordionSummaryRoot,
              expandIconWrapper: classes.AIcon,
            }}
            expandIcon={<ArrowDropDownIcon style={{ color: "#000000" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px !important ",
            }}
          >
            <p className={classes.SummaryPara}>{summary}</p>{" "}
          </AccordionSummary>
          <AccordionDetails
            classes={{
              root: classes.AccordionDetailsRoot,
            }}
          >
            {detailData &&
              detailData.length > 0 &&
              detailData.map((item, i) => (
                <Accordions
                  summary={item.summary}
                  key={item.summary}
                  open={item.open}
                  details={item.details}
                />
              ))}
          </AccordionDetails>
          {!noAddWeek && (
            <div className={classes.StartLotDiv}>
              <div className={classes.StartLot1} onClick={AddAnotherWeek}>
                Add Another Week
              </div>
              <div className={classes.StartLot1} onClick={nextState}>
                Move To Next State
              </div>
            </div>
          )}
        </Accordion>
      )}
      {!open && (
        <Accordion
          classes={{ root: classes.AccordionRoot }}
          // defaultExpanded={deopen}
          style={{ marginTop: "10px !imporatnt" }}
          expanded={expanded === expandeds}
          onChange={props.handleChange}
        >
          <AccordionSummary
            // key={i}
            classes={{
              root: classes.AccordionSummaryRoot,
              expandIconWrapper: classes.AIcon,
            }}
            expandIcon={<ArrowDropDownIcon style={{ color: "#000000" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px !important ",
            }}
          >
            <p className={classes.SummaryPara}>{summary}</p>{" "}
          </AccordionSummary>
          <AccordionDetails
            classes={{
              root: classes.AccordionDetailsRoot,
            }}
          >
            {detailData &&
              detailData.length > 0 &&
              detailData.map((item, i) => (
                <Accordions
                  summary={item.summary}
                  key={item.summary}
                  open={item.open}
                  details={item.details}
                />
              ))}
          </AccordionDetails>
          {!noAddWeek && (
            <div className={classes.StartLotDiv}>
              <div className={classes.StartLot1} onClick={AddAnotherWeek}>
                Add Another Week
              </div>
              <div className={classes.StartLot1} onClick={nextState}>
                Move To Next State
              </div>
            </div>
          )}
        </Accordion>
      )}
    </>
  );
}
