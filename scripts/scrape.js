var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("http://www.nytimes.com", function(err, res, body){
    var $ = cheerio.load(body);

    var articles = [];

    $(".assetWrapper").each(function(i, element){
        var head = $(this).find("h2").text().trim();
        var sum = $(this).find("p").text().trim();
        var link = "http://www.nytimes.com" + $(this).find("a").attr("href").trim();

        if(head && sum){
            // var headNeat= head.replace(/(\rn|\n|\r|\t|\s+)/gm, "").trim();
            // var sumNeat= sum.replace(/(\rn|\n|\r|\t|\s+)/gm, "").trim();
        
            var dataToAdd= {
                headline: head,
                summary: sum,
                link: link
            };
            articles.push(dataToAdd);
        }
    });
    cb(articles);

    });
}
module.exports = scrape;