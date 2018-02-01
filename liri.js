require("dotenv").config();
var keys = require("./keys.js");

// Following two variables return undefined
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var params = process.argv[3];

var request = require("request");

switch (command) {

    case "test":
        test();
        break;

    case "twitter":
        twitter();
        break;
}

function test() {
    console.log("Switch works");
}

function twitter() {
    var queryURL = "https://api.twitter.com/1.1/search/tweets.json"

    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(response);
        }
    })
}
// Example Request
// GET https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames
// &since_id=24012619984051000&max_id=250126199840518145
// &result_type=mixed&count=4