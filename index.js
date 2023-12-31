var http = require("http");
var express = require("express");
var RED = require("node-red");
// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/", express.static("public"));

app.get("/", function (req, res) {
  res.send(
    "Hello . This is a sample Node App . Please go to /red to see API flows"
  );
});

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  userDir: "./.nodered/",
  functionGlobalContext: {}, // enables global context
  adminAuth: {
    type: "credentials",
    users: [
      {
        username: "admin",
        password:
          "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",
        permissions: "*",
      },
    ],
  },
};

// Initialise the runtime with a server and settings
RED.init(server, settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode);

server.listen(5555);

// Start the runtime
RED.start();
