

// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

//Express App
var app = express();

//Express Router
var router = express.Router();

// Require our routes file
require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

// Connect Handlebars to Express
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}));

// Have every request go through our router middleware
app.use(router);


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect mongoose to our database
mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("mongoose connection is successful");
  }
});

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});
