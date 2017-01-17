const request = require('request');
const https = require('https');
const fs = require('fs');
const GITHUB_USER = 'iamtonybologna';
const GITHUB_TOKEN = 'b1d448a48b1e6f52b5303b1f899e2c7f3d179478';

var owner;
var repo;
owner = process.argv[2];
repo = process.argv[3];

console.log('\nWelcome to the GitHub Avatar Downloader!\n');

// throws error if owner or repo variables aren't provided and lets user know what's wrong
if (owner === undefined || repo === undefined) {
  console.log('You didn\'t provide an owner and repo for me! Please run me again: node download_avatars.js <owner> <repo>\n\n\n');
  throw new Error('Need owner and repo inputs')
};

// gets repo contributors based on github api URL, owner, and repo then gets and parses data into JSON object
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

// downloads images to avatars/ folder for each iteration of the data file and sets filename to username
function downloadImageByURL(url, filePath) {
  request.get(url)
    .pipe(fs.createWriteStream(filePath))
}

  getRepoContributors(owner, repo, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
  result.forEach(function(entry) {
    downloadImageByURL(entry.avatar_url + '.png', 'avatars/' + entry.login);
  });
});