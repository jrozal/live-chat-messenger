import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  addConversation,
} from "./store/conversations";

const token = localStorage.getItem("messenger-token");
const socket = io(window.location.origin, {
  query: {
    token: token
  }
});

socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("add-online-user", (id) => {
  store.dispatch(addOnlineUser(id));
});

socket.on("remove-offline-user", (id) => {
  store.dispatch(removeOfflineUser(id));
});

socket.on("new-message", (data) => {
  store.dispatch(setNewMessage(data.message, data.sender));
});

socket.on("new-conversation", (data) => {
  store.dispatch(addConversation(data.recipientId, data.message));
});

socket.on("new-message-error", (error) => {
  console.error('New message error', error)
});

export default socket;