getArticles();
function getArticles(){
$.getJSON("/scraped", function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      $("#articles-area").append("<h2 data-id='" + data[i]._id + "'>" + data[i].title + "</h2>" + "<a href='https://www.bbc.com/" + data[i].link + "'> Read More </a>" + "<br />" + "<button id='save-btn'> Save </button>");
        // var cardDiv= $("<div>",);
        // cardDiv.addClass("card-columns");
        // cardDiv.attr("class", "card text-center");
        // cardDiv.attr("ID", "article");

        // var cardBody= $("<div>");
        // cardBody.addClass("card-body");

        // var articleTitle= $("<h3>", "<strong>", data[i]._id, data[i].title);
        // articleTitle.attr("ID", "title");
        // articleTitle.attr("class", "card-title");

        // var summary= $("<p>", data[i].summary);
        // summary.attr("class", "card-text");

        // var link= $(data[i].link);
        // var target= '<a target="_blank"></a>';

        // var articleLink= $("<a>", "<small>");
        // articleLink.attr("target", target);
        // articleLink.attr("href", link);
        // articleLink.attr("class", "text-muted");
        // articleLink.attr("ID", "art-link");

        // cardBody.append(articleTitle);
        // cardBody.append(summary);
        // cardBody.append(articleLink);

        // cardDiv.append(cardBody);

        // $("#articles-area").prepend(cardDiv);
    }
  });
}

  $("#clear").click(function (){
    $("#articles-area").empty();
  });

  $("#scrape").click(getArticles);
  
  $("#save-btn").click()


  