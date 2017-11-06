var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

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

getRepoContributors("jquery", "jquery", downloadImageByURL);

