import React, { useMemo } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble, OtherUserFloatingAvatar } from "../ActiveChat";
import getLastReadMessage from "./helper";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const lastReadMessageMemo = useMemo(() => getLastReadMessage(messages, userId), [messages, userId])

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <Box key={message.id}>
            <SenderBubble text={message.text} time={time} />
            {(lastReadMessageMemo === message.id) && <OtherUserFloatingAvatar otherUser={otherUser} />}
          </Box>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
