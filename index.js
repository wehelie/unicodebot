let express = require('express'),
path = require('path');
var app = express();
let server = require('http').Server(app);
var port = process.env.PORT || 8000;
const fs = require('fs');
const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);
const UNICHARS = 275297;
const PERHOUR = 6000;


app.use(express.static(path.join(__dirname)));

//app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname +"public")));

app.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname+'/index.html'));
});


server.listen(port, function() {
    console.log("App is running on port " + port);
});


fs.readFile('unicode.txt', 'utf8', function(err, data) {
  var i = 1;
  console.log(data[0])

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
      // tweets every ten minutes
    }, PERHOUR)
  }
  // init
  tweetLoop();
});
