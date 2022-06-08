const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const path = require("path");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const app = express();
const PORT = process.env.PORT || 3001;
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// dependencies for socket.io
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async (typeDefs, resolvers) => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  db.once("open", () => {
    server.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
    });
  });
};

// SOCKET.IO CONNECTION
io.on("connection", (socket) => {
  console.log("connected to socket.io");
  // when a user joins the app, they should be connected to their own socket

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  //  USER JOINS CHAT
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room " + room);
  });

  // USER SENDS MESSAGE
  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    console.log("new message recieved: ", newMessageRecieved);

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      //  if (user._id == newMessageRecieved.sender._id) return;
      socket.to(user._id).emit("message recieved", newMessageRecieved);
      console.log(newMessageRecieved.chat._id);
    });
  });

  // USER LEAVES CHAT
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
