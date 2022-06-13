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
  cors: {
    origin: "http://localhost:3000",
  },
});

// dependencies for S3 & multer
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile, getFileStream } = require("./s3");
const { Trip } = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

app.post("/images/:id", upload.single("image"), async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  console.log(result);
  //   console.log(req.body.tripId);
  const trip = await Trip.findByIdAndUpdate(
    { _id: req.params.id },
    { imageUrl: `/images/${result.Key}` },
    { new: true, runValidators: true }
  );
  //   TODO: Will need to add result.key to relevant model (may have to send key to front end and trigger a gql mutation from there?)

  console.log(trip.imageUrl);
  //   res.send({ imagePath: `/images/${result.Key}` });
  res.redirect("/companydashboard");
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

  //  USER JOINS CHAT (room = chatId)
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room " + room);
  });

  // USER SENDS MESSAGE
  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      //  if (user._id == newMessageRecieved.sender._id) return;
      // emit this message to the front-end
      socket.to(user._id).emit("message recieved", newMessageRecieved);
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
