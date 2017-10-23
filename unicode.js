const fs = require('fs');
const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);
const UNICHARS = 275297;
const PERHOUR = 5000;

fs.readFile('unicode.txt', 'utf8', function(err, data) {
  var i = 1;
  console.log(data.length)

  function tweetLoop() {
    setTimeout(function() {
      T.post('statuses/update', {
        status: data[i]
      }, function(err, data, response) {
        console.log("Created Tweeted");
      })
      i++;
      if (i < UNICHARS) {
        tweetLoop();
      }
    }, PERHOUR)
  }
  // init
  tweetLoop();
});
