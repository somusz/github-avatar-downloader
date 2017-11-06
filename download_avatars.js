var request = require('request');
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
    var jsonData = JSON.parse(body);
    cb(err,jsonData);
   });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("result:", result);
  result.forEach(function(contributor) {
    console.log(contributor.avatar_url);
  });
  // console.log("Result:", result);
});