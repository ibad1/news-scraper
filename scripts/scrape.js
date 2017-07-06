// Require request and cheerio
var request = require("request");
var cheerio = require("cheerio");

// This function will scrape the NYTimes website
var scrape = function(cb) {

  // Use the request package to take in the body of the page's html
  request("http://www.nytimes.com", function(err, res, body) {
    var $ = cheerio.load(body);

    // Make an empty array to save our article info
    var articles = [];


    $(".theme-summary").each(function(i, element) {

      var head = $(this).children(".story-heading").text().trim();

      var sum = $(this).children(".summary").text().trim();

      if (head && sum) {

        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat
        };

        articles.push(dataToAdd);
      }
    });
    cb(articles);
  });
};

module.exports = scrape;
