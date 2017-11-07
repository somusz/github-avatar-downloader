//download_avatars.js
//downloading avatars from accessible Github project contributors, ...
//...provided valid repo owner and repo name are entered through command line

//requiring external resources: request, fs and github token through external file
require('dotenv').config( {path: './process.env'} );
var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

//input validity check - return error message in case of incomplete input
if (process.argv[2] && process.argv[3]) {
  var owner = process.argv[2];
  var repo = process.argv[3];
} else {
    console.log('Please provide a valid Github repo owner id and a valid repo name.');
    return;
  }

//this function executes given action (callback) on provided repo info
function getRepoContributors(repoOwner, repoName, cb) {
//the function builds url and request info
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': process.env.GITHUB_TOKEN
    }
  };
//the function requests response from the url
  request(options, (err, res, body) => {
    if (err) {
      console.log("Errors:", err);
    };
//the function transforms returned response into JSON data
    var jsonData = JSON.parse(body);
//the function iterates over items in data
    jsonData.forEach(function(contributor) {
      var theFilePath = 'avatars/' + contributor.login + ".jpg";
//the function executes given callback function, on valid repo data
      cb(contributor.avatar_url,theFilePath);
    })
  });
}

//this function specifies a stream to get the data from the url and write it to given file
function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(err) {
          throw err;
         })
         .on('end', function () {
          console.log(filePath + ' downloaded');
         })
         .pipe(fs.createWriteStream(filePath));
}

//calling function getRepoContributors on valid repo info and given action
getRepoContributors(owner, repo, downloadImageByURL);

