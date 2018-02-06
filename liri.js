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
    spotify
        .request('GET https://api.spotify.com/v1/search?q=bad&type=track')
        .then(function(data) {
            console.log(data); 
        })
        .catch(function(err) {
            console.error('Error occurred: ' + err); 
        });
}

function runOMDB() {

}

// console.log(client);
// Example Request
// GET https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames
// &result_type=recent&count=20