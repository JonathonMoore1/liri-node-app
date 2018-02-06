### liri-node-app

A simple application designed output data based on user input commands, liri-node-app was made as the solution to a class assignment. 

### Possible commands
    All commands must be inputted starting from the third Node process. Any parameters should be inputted from the forth Node process onwards.

#'my-tweets'
    Outputs the text of the last 20 tweets from my alias Twitter account, along with the time of their creation. 

    Example: node liri.js my-tweets
    ============================
# 'spotify-this-song'
    After inputting the command, add a space and enter the title of the song you would like to look up. It can take in multiple processes. 

    Example: node liri.js spotify-this-song beat on the brat
    ============================
# 'movie-this'
    Similar to the previous command, enter the command followed by the title of the movie you would like to look up.
    
    Example: node liri.js movie-this the virgin spring
    ============================
# 'do-what-it-says'
    This command calls a function which reads a text file, splits the data into an array, and uses the necessary keys as parameters to call the spotify function.


    