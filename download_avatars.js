var request = require('request');
var secrets = require('secrets');

function getRepoContributors(repoOwner, repoName, cb) {
   var options = {
     url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
     headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
     }
   };
   request(options, (err, res, body) => {
    cb(err,body);
   });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});