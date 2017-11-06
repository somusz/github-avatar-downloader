var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

if (process.argv[2] && process.argv[3]) {
var owner = process.argv[2];
var repo = process.argv[3];
} else {
  console.log('Please provide a valid Github repo owner id and a valid repo name.');
  return;
}

function getRepoContributors(repoOwner, repoName, cb) {
   var options = {
     url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
     headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
     }
   };
   request(options, (err, res, body) => {
    if (err) {
      console.log("Errors:", err);
    };
    var jsonData = JSON.parse(body);
    jsonData.forEach(function(contributor) {
      var theFilePath = 'avatars/' + contributor.login + ".jpg";
      cb(contributor.avatar_url,theFilePath);
    })
   });
}

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

getRepoContributors(owner, repo, downloadImageByURL);

