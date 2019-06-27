var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;


var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/newscraper", { useNewUrlParser: true });

app.get("/scraped", function(req, res) {
  axios.get("https://www.bbc.com/").then(function(response) {
    var $ = cheerio.load(response.data);
    var newsResults = [];

    $("article").each(function(i, element) {
      var result = {};
      // var link = $(element).children().attr("href");
      

      result.title = $(this)
        .find("h2")
        .text();

        // result.summary = $(this)
        // .find("p")
        // .text();

      result.link = $(this)
        .find("a")
        .attr("href")

        // .children("a")
        // .attr("a");

        newsResults.push(result);
        console.log(result);

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    db.Article.insertMany(newsResults)
    .then(saved => res.json(saved))
    // res.send("Scrape Complete");
  });
});

app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/saved", function(req, res) {
  db.Article.find({ saved: true })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!" + "http://localhost:3000");
});
