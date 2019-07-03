var scrape = require("../scripts/scrape");

var headLinescontroller = require("../controllers/headlines");
var notesController = require("../controllers/note");


module.exports = function(router){
    router.get("/", function(req, res){
        res.render("home");
    });
    router.get("/saved", function(req, res){
        res.render("saved");
    });
    router.get("/api/fetch", function(req, res){
        headLinescontroller.fetch(function(err, docs){
            console.log("helloHello", docs);
            if (!docs || docs.insertedCount == 0){
                res.json({
                    messge: "no new articles today. Check back tomorrow!"
                });
            }
            else{
                res.json({
                    message: "added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });
    router.get("/api/headLines", function(req, res){
        var query = {};
        if (req.query.saved){
            query = req.query;
        }
        headLinescontroller.get(query, function(data){
            res.json(data);
        });
    });
    router.delete("/api/headLines/:id", function (req, res){
        var query= {};
        query._id = req.params.id;
        headLinescontroller.delete(query, function(err, data){
            res.json(data);
        });
    });
    router.patch("/api/headlines", function(req, res){
        headLinescontroller.update(req.body, function(err, data){
            res.json(data);
        });
    });
    router.get("/api/notes/:headline_id?", function(req, res){
        var query = {};
        if (req.params.headLine_id){
            query._id = req.params.headLine_id;
        }
        notesController.get(query, function(err, data){
            res.json(data);
        });
    });
    router.delete("/api/notes/:id", function(req, res){
        var query = {};
        query.id = req.params.id;
        notesController.delete(query, function(err, data){
            res.json(data);
        });
    });
    router.post("/api/notes", function(req, res){
        notesController.save(req.body, function(data){
            res.json(data);
        });
    });
}

