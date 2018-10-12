//requires
//THE VARIABLES==============================================
require('dotenv').config()
const chalk = require("chalk");
var request  = require('request');
var Spotify = require('node-spotify-api');
var keys = require ('./keys');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
// capture user input
var command = process.argv[2];
var query = process.argv[3];
var artist = process.argv.slice(3).join(" ")
    console.log(artist);

    //Spotify==============================================
function getSong(x){
spotify.search({ type: "track", query: x }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
console.log(data.tracks.items[0].name); 
console.log(data.tracks.items[0].artists[0].name );
console.log(data.tracks.items[0].album.name);

});
}
//OMDB ==============================================
function omdb (title){
  var request = require('request');
request('https://www.omdbapi.com/?apikey=' + keys.OMDB.apikey + '&t='+ title, function (error, response, body) {
  console.log(chalk.green("Title of the movie: ") + chalk.blue(JSON.parse(body).Title));
  console.log(chalk.green("Year the movie came out: ") + chalk.blue (JSON.parse(body).Year));
  console.log(chalk.green("IMDB Rating: ") + chalk.blue (JSON.parse(body).imdbRating));
  console.log(chalk.yellow("Country where the movie was produced: ") + chalk.blue (JSON.parse(body).Country));
  console.log(chalk.blue("Movie language: ") + chalk.blue (JSON.parse(body).Language));
  console.log("Movie plot: " + JSON.parse(body).Plot);
  console.log("Actors in the movie: " + JSON.parse(body).Actors);

});

}
//bandsintown==============================================
function bandsintown (title){
  var artist = process.argv.slice(3).join(" ")
  console.log(artist);
 
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  request(queryURL, function (error, response, body) {
      if (error) console.log(error);
      var result  =  JSON.parse(body)[0];
      console.log("Venue name " + result.venue.name);
      console.log("Venue location " + result.venue.city);
      console.log("Date of Event " +  moment(result.datetime).format("MM/DD/YYYY"));
     
  });
  }
  
  //THE CALLS ==============================================
if (command ==='spotify-this-song'){
  getSong(query);
} else if (command === 'movie-this'){
  omdb (query);
}else if (command === 'concert-this'){
  bandsintown (query);
}


