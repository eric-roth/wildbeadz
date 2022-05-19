import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  header: {
    color: "red"
  }
});

function About() {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.header} variant='h1'>
        About
      </Typography>
    </div>
  );
}

export default About;
