var request = require('request');
var fs = require('fs');
var GITHUB_USER = 'iamtonybologna';
var GITHUB_TOKEN = 'b1d448a48b1e6f52b5303b1f899e2c7f3d179478';

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  request.get('https://github.com/' + repoOwner + '/' + repoName)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       // .pipe(fs.createWriteStream())
       .on('finish', function() {
        console.log('Process complete.');
      });
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});