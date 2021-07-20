const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  const io = req.app.get('socketio');

  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, read } = req.body;


    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      // check if both users belong to specific conversationId
      const validConversationUsers = await Conversation.verifyConversationUsers(conversationId, senderId, recipientId);

      if (!validConversationUsers) {
        return res.sendStatus(403);
      }

      const message = await Message.create({ senderId, text, conversationId, read });
      return io.in(`${conversationId}`).emit("new-message", {
        message: message,
        sender: sender,
      })
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      read
    });
    return io.emit("new-conversation", {
      recipientId: recipientId,
      message: message,
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router;
