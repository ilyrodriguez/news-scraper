var express = require('express');
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app = express();

// var router = express.router();
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));

require("./config/routes")(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news";

mongoose.connect(MONGODB_URI, function(error){
    if (error){
        console.log(error);
    }
    else {
        console.log("mongoose connection is succesful");
    }
});

app.listen(PORT, function(){
    console.log("listening on port:" + PORT);
});