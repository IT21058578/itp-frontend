import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccordionDetails from "@mui/material/AccordionDetails";
import { createStyles } from "@material-ui/core";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    AccordionRoot: {
      backgroundColor: "#FFFFFF !important",
      borderRadius: "32px !important ",
      border: " 2px solid #d9e1e7 !important",
      boxShadow: "5px 5px 44px #00000019 !important",
      position: "inherit !important",
      marginTop: "10px !important",
      background: "#FFFFFF 0% 0% no-repeat padding-box !important",
      maxWidth: "1500px",
      margin: "0 auto !important",
      // height: "78px",
    },
    AccordionSummaryRoot: {
      height: "78px !important",
      margin: "0 auto",
    },
    SummaryPara: {
      color: "#000000",
      fontSize: "20px",
      fontWeight: "600",
      paddingLeft: "58px",
      textTransform: "capitalize",

    },
    AIcon: {
      padding: "0rem 6rem",
    },
    // AccordionDetailsRoot: {
    //   padding:'0px !important'
    // }
  })
);

export default function Accordions(props) {
  const classes = useStyles();
  const { summary, details, open } = props;
  return (
    <>
      {open && (
        <Accordion
          classes={{ root: classes.AccordionRoot }}
          expanded={open ? false : true}
        >
          <AccordionSummary
            classes={{
              root: classes.AccordionSummaryRoot,
              expandIconWrapper: classes.AIcon,
            }}
            expandIcon={<ArrowDropDownIcon style={{ color: "#000000" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <p className={classes.SummaryPara}>{summary}</p>
          </AccordionSummary>
          <AccordionDetails
            classes={{
              root: classes.AccordionDetailsRoot,
            }}
          >
            {details}
          </AccordionDetails>
        </Accordion>
      )}
      {!open && (
        <Accordion
          classes={{ root: classes.AccordionRoot }}
          // expanded={open ? false : true}
        >
          <AccordionSummary
            classes={{
              root: classes.AccordionSummaryRoot,
              expandIconWrapper: classes.AIcon,
            }}
            expandIcon={<ArrowDropDownIcon style={{ color: "#000000" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <p className={classes.SummaryPara}>{summary}</p>
          </AccordionSummary>
          <AccordionDetails>{details}</AccordionDetails>
        </Accordion>
      )}
    </>
  );
}
