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
// var params = process.argv[3];

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
                console.log("============================================");
                console.log("\nTweet text: " + tweets[i].text);
                console.log("\nTweet created: " + tweets[i].created_at); 
                console.log("\n============================================");              
            }
        }
    });
}

function runSpotify() {
    
    var songName = "";
    for (i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songName = songName + nodeArgs[i] + "+" + nodeArgs[i];
        } else {
            songName += nodeArgs[i];
        }
    }

    spotify.search({ type: 'track', query: songName, limit: 1}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        var prettyData = JSON.stringify(data, null, 2);
        console.log("\n============================================\n");
       // console.log(prettyData); 
        console.log(prettyData);
        console.log("\n============================================\n");
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


// {
//     "tracks": {
//         "href": "https://api.spotify.com/v1/search?query=californication&type=track&offset=0&limit=1",
//             "items": [
//                 {
//                     "album": {
//                         "album_type": "album",
//                         "artists": [
//                             {
//                                 "external_urls": {
//                                     "spotify": "https://open.spotify.com/artist/0L8ExT028jH3ddEcZwqJJ5"
//                                 },
//                                 "href": "https://api.spotify.com/v1/artists/0L8ExT028jH3ddEcZwqJJ5",
//                                 "id": "0L8ExT028jH3ddEcZwqJJ5",
//                                 "name": "Red Hot Chili Peppers",
//                                 "type": "artist",
//                                 "uri": "spotify:artist:0L8ExT028jH3ddEcZwqJJ5"
//                             }
//                         ],
//                         "available_markets": [
//                             "AD",
//                             "AR",
//                             "AT",
//                             "AU",
//                             "BE",
//                             "BG",
//                             "BO",
//                             "BR",
//                             "CA",
//                             "CH",
//                             "CL",
//                             "CO",
//                             "CR",
//                             "CY",
//                             "CZ",
//                             "DE",
//                             "DK",
//                             "DO",
//                             "EC",
//                             "EE",
//                             "ES",
//                             "FI",
//                             "FR",
//                             "GB",
//                             "GR",
//                             "GT",
//                             "HK",
//                             "HN",
//                             "HU",
//                             "ID",
//                             "IE",
//                             "IS",
//                             "IT",
//                             "JP",
//                             "LT",
//                             "LU",
//                             "LV",
//                             "MC",
//                             "MT",
//                             "MX",
//                             "MY",
//                             "NI",
//                             "NL",
//                             "NO",
//                             "NZ",
//                             "PA",
//                             "PE",
//                             "PH",
//                             "PL",
//                             "PT",
//                             "PY",
//                             "SE",
//                             "SG",
//                             "SK",
//                             "SV",
//                             "TH",
//                             "TR",
//                             "TW",
//                             "US",
//                             "UY"
//                         ],
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/album/2Y9IRtehByVkegoD7TcLfi"
//                         },
//                         "href": "https://api.spotify.com/v1/albums/2Y9IRtehByVkegoD7TcLfi",
//                         "id": "2Y9IRtehByVkegoD7TcLfi",
//                         "images": [
//                             {
//                                 "height": 640,
//                                 "url": "https://i.scdn.co/image/260c7a6da14bb13a4cc9e75bf5b549fb87fa22a9",
//                                 "width": 640
//                             },
//                             {
//                                 "height": 300,
//                                 "url": "https://i.scdn.co/image/6f98acc4da4eb86ca2f9ebae5f8f173e59c5abef",
//                                 "width": 300
//                             },
//                             {
//                                 "height": 64,
//                                 "url": "https://i.scdn.co/image/2da4d0271d9e4b1f37fd6c195e671d77ed61ca8f",
//                                 "width": 64
//                             }
//                         ],
//                         "name": "Californication (Deluxe Version)",
//                         "type": "album",
//                         "uri": "spotify:album:2Y9IRtehByVkegoD7TcLfi"
//                     },
//                     "artists": [
//                         {
//                             "external_urls": {
//                                 "spotify": "https://open.spotify.com/artist/0L8ExT028jH3ddEcZwqJJ5"
//                             },
//                             "href": "https://api.spotify.com/v1/artists/0L8ExT028jH3ddEcZwqJJ5",
//                             "id": "0L8ExT028jH3ddEcZwqJJ5",
//                             "name": "Red Hot Chili Peppers",
//                             "type": "artist",
//                             "uri": "spotify:artist:0L8ExT028jH3ddEcZwqJJ5"
//                         }
//                     ],
//                     "available_markets": [
//                         "AD",
//                         "AR",
//                         "AT",
//                         "AU",
//                         "BE",
//                         "BG",
//                         "BO",
//                         "BR",
//                         "CA",
//                         "CH",
//                         "CL",
//                         "CO",
//                         "CR",
//                         "CY",
//                         "CZ",
//                         "DE",
//                         "DK",
//                         "DO",
//                         "EC",
//                         "EE",
//                         "ES",
//                         "FI",
//                         "FR",
//                         "GB",
//                         "GR",
//                         "GT",
//                         "HK",
//                         "HN",
//                         "HU",
//                         "ID",
//                         "IE",
//                         "IS",
//                         "IT",
//                         "JP",
//                         "LT",
//                         "LU",
//                         "LV",
//                         "MC",
//                         "MT",
//                         "MX",
//                         "MY",
//                         "NI",
//                         "NL",
//                         "NO",
//                         "NZ",
//                         "PA",
//                         "PE",
//                         "PH",
//                         "PL",
//                         "PT",
//                         "PY",
//                         "SE",
//                         "SG",
//                         "SK",
//                         "SV",
//                         "TH",
//                         "TR",
//                         "TW",
//                         "US",
//                         "UY"
//                     ],
//                     "disc_number": 1,
//                     "duration_ms": 329733,
//                     "explicit": false,
//                     "external_ids": {
//                         "isrc": "USWB19900690"
//                     },
//                     "external_urls": {
//                         "spotify": "https://open.spotify.com/track/48UPSzbZjgc449aqz8bxox"
//                     },
//                     "href": "https://api.spotify.com/v1/tracks/48UPSzbZjgc449aqz8bxox",
//                     "id": "48UPSzbZjgc449aqz8bxox",
//                     "name": "Californication",
//                     "popularity": 84,
//                     "preview_url": "https://p.scdn.co/mp3-preview/175ce440229d2fb5361756f3e68c9647b86a8eee?cid=3cb790a4b5f84a2aa5b96fef6f43531f",
//                     "track_number": 6,
//                     "type": "track",
//                     "uri": "spotify:track:48UPSzbZjgc449aqz8bxox"
//                 }
//             ],
//                 "limit": 1,
//                     "next": "https://api.spotify.com/v1/search?query=californication&type=track&offset=1&limit=1",
//                         "offset": 0,
//                             "previous": null,
//                                 "total": 473
//     }
// }