import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginRight: 17,
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
    paddingRight: ({notificationCount}) => notificationCount > 9 ? 12 : 10,
    paddingLeft: ({notificationCount}) => notificationCount > 9 ? 12 : 10,
  }
}));

const UnreadBubble = ({ notificationCount }) => {
  const classes = useStyles({notificationCount});

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