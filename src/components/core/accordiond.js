import React from "react";
import { MenuItem, FormControl, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    TableCol: {
      display: "flex",
      flexDirection: "Column",
    },
  })
);

export default function Accordions(props) {
  const classes = useStyles();

  const { week, title, section, value, handleChange } = props;
  return (
    // <Accordion>
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="panel1a-content"
    //     id="panel1a-header"
    //   >
    //     <Typography>{week}</Typography>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     <div className={classes.TableCol}>
    //       <div>
    //         <div>{title}</div>
    //         <FormControl
    //           sx={{
    //             m: 1,
    //             minWidth: 120,
    //             minHeight: 68,
    //             margin: 0,
    //           }}
    //         >
    //           <Select
    //             value={value}
    //             onChange={handleChange}
    //             displayEmpty
    //             inputProps={{ "aria-label": "Without label" }}
    //             classes={{
    //               select: classes.Select,
    //               iconOutlined: classes.iconOutlined,
    //             }}
    //           >
    //             <MenuItem value="">
    //               <span>{section}</span>
    //             </MenuItem>
    //             <MenuItem value={2020}>{section}</MenuItem>
    //             <MenuItem value={2019}>{section}</MenuItem>
    //           </Select>
    //         </FormControl>
    //       </div>
    //     </div>
    //   </AccordionDetails>
    // </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Week 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.TableCol}>
          <div>
            <div>
              <div className={classes.Para}> Lot ID</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#B88080" }}>Numeric</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <div className={classes.Para}> Batch ID</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#B88080" }}>Alpha Numaric</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <div className={classes.Para}> Grower</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#B88080" }}>String Content</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div>
            <div>
              <div className={classes.Para}> Type</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#809FB8" }}>Hybrid</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <div className={classes.Para}> Seed</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#B88080" }}> String Content</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <div className={classes.Para}>Strain</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#B88080" }}>String content</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div>
            <div>
              <div className={classes.Para}> Growing Methord</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#809FB8" }}>Hybrid</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <div className={classes.Para}>Organic Nutrition</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#B88080" }}> worm casing</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <div className={classes.Para}> Empected Yield</div>
              <Box sx={{ display: "flex" }}>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: "45%",
                    minHeight: 68,
                    margin: 0,
                  }}
                >
                  <Select
                    value={year}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    classes={{
                      select: classes.Select,
                      iconOutlined: classes.iconOutlined,
                    }}
                  >
                    <MenuItem value="">
                      <span style={{ color: "#B88080" }}>String</span>
                    </MenuItem>
                    <MenuItem value={2020}>2020</MenuItem>
                    <MenuItem value={2019}>2019</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: "50%",
                    minHeight: 68,
                    margin: 0,
                  }}
                >
                  <Select
                    value={year}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    classes={{
                      select: classes.Select,
                      iconOutlined: classes.iconOutlined,
                    }}
                  >
                    <MenuItem value="">
                      <span style={{ color: "#809FB8" }}>mes</span>
                    </MenuItem>
                    <MenuItem value={2020}>2020</MenuItem>
                    <MenuItem value={2019}>2019</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
          <div>
            <div>
              <div className={classes.Para}> veg Date</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#809FB8" }}>Date</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <div className={classes.Para}> Flowest Date</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#809FB8" }}> Date</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <div className={classes.Para}> Harvest Date</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#809FB8" }}> Date</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div>
            <div>
              <div className={classes.Para}> Curing</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#809FB8" }}> Date</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <div className={classes.Para}> Package</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#809FB8" }}> Date</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <div className={classes.Para}> Shiping</div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  minHeight: 68,
                  margin: 0,
                }}
              >
                <Select
                  value={year}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  classes={{
                    select: classes.Select,
                    iconOutlined: classes.iconOutlined,
                  }}
                >
                  <MenuItem value="">
                    <span style={{ color: "#809FB8" }}>Date</span>
                  </MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
