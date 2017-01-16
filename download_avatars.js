var request = require('request');
var https = require('https');
var fs = require('fs');
var GITHUB_USER = 'iamtonybologna';
var GITHUB_TOKEN = 'b1d448a48b1e6f52b5303b1f899e2c7f3d179478';

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

  request.get(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var body = JSON.parse(body);
      callback(error, body);
    };
  })

};

function downloadImageByURL(url, filePath) {
  request.get(url)
    .pipe(fs.createWriteStream(filePath))
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

//   getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
//   result.forEach(function(entry) {
//     downloadImageByURL(entry.avatar_url, ./;
//   })
// });
