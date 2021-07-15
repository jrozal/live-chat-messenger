export default function getLastReadMessage(messages, user) {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].read === true && messages[i].senderId === user) {
      return messages[i].id;
    }
  }
};