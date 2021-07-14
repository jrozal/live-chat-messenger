import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row-reverse"
  },
  avatar: {
    height: 20,
    width: 20,
    marginTop: 6
  },
}));

const OtherUserFloatingAvatar = (props) => {
  const classes = useStyles();
  const { otherUser } = props;

  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
    </Box>
  )
};

export default OtherUserFloatingAvatar;