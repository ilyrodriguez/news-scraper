$(document).ready(function () {
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn-sucess", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
    // $(document).on("click", "#clear", clearArticles);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headLines?saved=false")
            .then(function (data) {
                if (data && data.length) {
                    renderArticles(data);
                } else {
                    renderEmpty();
                }
            });
    }

    function renderArticles(articles) {
        var articlePanels = [];
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }
    // id='save-article-btn'
    function createPanel(article) {
        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                article.headline,
                "<button class='btn btn-sucess save'>",
                "save Article",
                "</button>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>",
                "<a href='http://www.nytimes.com' target='blank'>",
                article.link,
                "</a>",
            ].join(""));
        panel.data("-id", article._id);
        return panel;
    }

    function renderEmpty() {
        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>Looks like we don't have any new articles.</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "div class='panel-heading text-center'>",
                "<h3>what would you like to do?</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
                "<h4><a href='/saved'>Go to saved articles</a></h4>",
                "</div>"
            ].join(""));
        articleContainer.append(emptyAlert);
    }
    function handleArticleSave(){
        var articleToSave= $(this).parent(".panel").data();
        articleToSave.saved = true;
        $.ajax({
            method: "PUT",
            url: "/saved",
            data: articleToSave
        })
        .then(function(data){
            if (data.ok){
                initPage();
            }
            articleContainerSaved.append(articleToSave);

        });
    }

    
    function handleArticleScrape(){
        console.log("hello there");
        $.get("/api/fetch")
        .then(function(data){
            console.log(data)
            initPage();
            bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
        });
    }
});