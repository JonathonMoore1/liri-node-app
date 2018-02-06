require("dotenv").config();
var keys = require("./keys.js");

// Twitter API Set-up
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
// client.get(paths, params, callback);
// client.post(path, params, callback);
// client.stream(path, params, callback);

// Spotify API Set-up
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// (Second line continues from first)
//search: function({ type: 'artist OR album OR track', 
//query: 'My search query', limit: 20 }, callback);

var nodeArgs = process.argv;
var command = process.argv[2];
var params = process.argv[3];

var request = require("request");

switch (command) {

    case "test":
        test();
        break;

    case "my-tweets":
        runTwitter();
        break;
    
    case "spotify-this-song":
        runSpotify();
        break;

    case "movie-this":
        runOMDB();
        break;
    
    case "do-what-it-says":
        fooBar();
        break;
}

function test() {
    console.log("Switch works");
}

function runTwitter() {
    var params = {screen_name: 'therealunclejo'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
    });
}

function runSpotify() {
    // var url = 'https://api.spotify.com/v1/search?type=track&q=name:';
    // spotify
    //     .request(url + params)
    //     .then(function(data) {
    //         console.log(data); 
    //     })
    //     .catch(function(err) {
    //         console.error('Error occurred: ' + err); 
    //     });
        spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
          
            console.log(JSON.parse(data)); 
        });
}

function runOMDB() {
    var movieName = "";
    for (i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // console.log(queryURL);
    request(queryURL, function(error, response, body) {

        var data = JSON.parse(body);
        
        console.log("\n============================================\n");
        console.log("\nTitle: " + data.Title);
        console.log("\nRelease date: " + data.Released);
        console.log("\nIMDB rating: " + data.Ratings[0].Value);
        console.log("\nRotten Tomatoes rating: " + data.Ratings[1].Value);
        console.log("\nCountry: " + data.Country);
        console.log("\nLanguage: " + data.Language);
        console.log("\nPlot summary: " + data.Plot);
        console.log("\nStarring: " + data.Actors);
        console.log("\n============================================\n");
        
    })
}

// console.log(client);
// Example Request
// GET https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames
// &result_type=recent&count=20