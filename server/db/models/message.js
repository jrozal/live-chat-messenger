const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  read: {
    type: Sequelize.BOOLEAN
  },
});

Message.getUnreadMessages = async function (conversationId) {
  const messages = await Message.findAll({
    where: {
      conversationId: conversationId,
      read: false
    }
  });

  return messages;
};

Message.markAllAsRead = async function (messages) {
  const read = await Promise.all(messages.map(async (message) => {
    message.read = true;
    await message.save();
    return message;
  }));

  return read;
};

module.exports = Message;
