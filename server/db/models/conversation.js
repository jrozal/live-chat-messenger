const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.verifyConversationUsers = async function (conversationId, user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      id: conversationId,
      [Op.and]: [{
        user1Id: {
          [Op.or]: [user1Id, user2Id]
        },
        user2Id: {
          [Op.or]: [user1Id, user2Id]
        }
      }]
    }
  });

  return conversation;
};

Conversation.markAllAsRead = async function (conversationId, senderId) {
  const read = await Message.update({ read: true }, {
    where: {
      conversationId: conversationId,
      senderId: senderId
    }
  });

  return read;
};

module.exports = Conversation;
