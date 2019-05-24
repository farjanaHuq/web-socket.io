const express = require("express");
// const path = require("path");
// const mongoose = require("mongoose");
var socket = require('socket.io');

const PORT = process.env.PORT || 8080;
const app = express();
// const apiRoutes = require("./routes/apiRoutes");

// Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Serve up static assets (usually on heroku)n
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// Define API routes here
// app.use("/api", apiRoutes);

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googleBooks", { useNewUrlParser: true });

app.use(express.static('public'));

var server = app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);
    //Handle chat event
    socket.on('chat', function(data){
      console.log(data);
      io.sockets.emit('chat', data);
    });
    //Handle typing event
    socket.on('typing', function(data){
      socket.broadcast.emit('typing', data);
    })
});