//Garfbot V1.0 by Julian Moore
//Oct 22 2020

const Discord = require("discord.js");
const moment = require("moment");
const _ = require('underscore');

const garfbot = new Discord.Client();
garfbot.login("");
garfbot.once("ready", () => {
  console.log("Ready!");
  //message.channel.send(helpText);
});
function getDay(month) {
  let days31 = [1, 3, 5, 7, 8, 10, 12];
  let days30 = [4, 6, 9, 11];
  if (days31.includes(month)) {
    return Math.floor(Math.random() * 31 + 1);
  }
  if (days30.includes(month)) {
    return Math.floor(Math.random() * 30 + 1);
  }
  if (month == 2) {
    return Math.floor(Math.random() * 28 + 1);
  }
}
//[1,2,3,4,5,6,7,8,9,10,11,12].forEach(n => console.log(n, getDay(n))) //debugging undefined error in ${day}
function dailyGarf(message)
{
  let year = moment().format("YYYY");
  let month = moment().format("MM");
  let day = moment().format("DD");
  let dailyComic = `https://www.gocomics.com/garfield/${year}/${month}/${day}`;
  message.channel.send(dailyComic);
}
function spookyGarf(message)
{
  let videos = [
    "jUQXuHrVnHc",
    "g1n-Yofo3oo",
    "zF1TIkT-cYY",
    "bAUbJtEEee4",
    "xY-u7KMXyP4",
    "5U6j_mbAPtg",
    "ip8HDAi9yMg",
    "jUQXuHrVnHc",
    "2wgUqPw_W4g",
    "RayesppVEZs",
    "Cyl7lV3IV3U",
    "IsmUsoK_LIA",
    "BuEo3MyE37w",
    "nLjV5jw3tqU",
    "nIvntwwSaow",
    "bG-4-CbCbUU",
    "baQEfOYhhFk",
    "q1TuHEORyME",
    "nN9BF7ZmMXU",
    "UXIn-ejzpxg",
    "W8g6ZawDDcw",
    "DNX2Uhq2PMM"
  ];
  //let selectedVideo = videos.random();
  let selectedVideo = _.shuffle(videos)[0];
  let video = `http://www.youtube.com/watch?v=${selectedVideo}`;
  message.channel.send(video);
}
function randomGarf(message){
  //this could easily be done using https://www.gocomics.com/random/garfield but this way is more fun
   let year = Math.floor(Math.random() * 42 + 1978);
   let month = Math.floor(Math.random() * 12 + 1);
  // let days31 = ["1", "3", "5", "7", "8", "10", "12"];
  // let days30 = ["4", "6", "9", "11"];
  let day = getDay(month);
  let randomComic = `https://www.gocomics.com/garfield/${year}/${month}/${day}`;
  message.channel.send(randomComic);
}

function dailyGarfHere(message){
  let i = setInterval(function () {
    let year = moment().format("YYYY");
    let month = moment().format("MM");
    let day = moment().format("DD");
    var dailyComic = `https://www.gocomics.com/garfield/${year}/${month}/${day}`;
    message.channel.send(dailyComic);
  }, 1 * 86400000); //24 hour timer
}


const helpText = 
`!garfhelp to see list of commands
!dailygarf to see today's garf
!randomgarf to see a random garf
!spookygarf to see a spooky garf video from lumpytouch
!dailygarfhere to specify a channel to get the daily garf`;

garfbot.on('guildCreate', joinedGuild => {
  joinedGuild.channel.send(helpText);
  });
garfbot.on("message", (message) => {
  messageContent = message.content;
  if (messageContent.startsWith("!")) {
    console.log(messageContent);
    switch (messageContent) {
      case "!dailygarfhere":
        dailyGarfHere(message);
        break;
      case "!dailygarf":
        dailyGarf(message);
        break;
      case "!randomgarf":
        randomGarf(message);
        break;
      case "!spookygarf":
        spookyGarf(message);
        break;
      case "!garfhelp":
        {
          message.channel.send(helpText);
        }
        break;
        case "!help":
          {
            message.channel.send(helpText);
          }
          break;
      // default:
      //   {
      //     message.channel.send(helpText);
      //   }
      //   break;
    }
  }
});
//garfbot.user.setActivity('garfield and friends', { type: 'WATCHING' });