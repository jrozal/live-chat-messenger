import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    marginRight: 17,
    width: 30,
  },
  bubble: {
    display: "flex",
    backgroundColor: "#3A8DFF",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    minWidth: 30,
    borderRadius: 50
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    paddingRight: 10,
    paddingLeft: 10
  }
}));

const UnreadBubble = ({ notificationCount }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {notificationCount > 0 &&
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{notificationCount}</Typography>
        </Box>
      }
    </Box>
  )
};

export default UnreadBubble;