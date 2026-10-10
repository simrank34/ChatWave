const Message = require("../models/Message");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (username) => {
      socket.username = username;

      socket.broadcast.emit("userOnline", {
        username
      });
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { username, text } = data;

        if (!username || !text) {
          return;
        }

        const message = await Message.create({
          username,
          text
        });

        io.emit("receiveMessage", message);
      } catch (error) {
        socket.emit("messageError", {
          message: "Failed to send message"
        });
      }
    });

    socket.on("typing", (username) => {
      socket.broadcast.emit("userTyping", {
        username
      });
    });

    socket.on("stopTyping", () => {
      socket.broadcast.emit("userStopTyping");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      if (socket.username) {
        socket.broadcast.emit("userOffline", {
          username: socket.username
        });
      }
    });
  });
};

module.exports = socketHandler;