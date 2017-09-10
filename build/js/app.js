(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "b7fe71031b62aec5c8f6af3002bafe582dbeaeee";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;
//create GithubUser Object
Githubuser = function() {

};
//Create constructor with method getGithubUser()
Githubuser.prototype.getGithubUser = function(gitUser) {
  // get github user
  $.get("https://api.github.com/users/" + gitUser + "?access_token=" + apiKey, (function(results) {
    // console.log(results.name);
    // console.log(results.bio);
    $('#get-user-repos').prepend("<p>" + "Github User: " + results.name + "</p></br>" + "<p>" + "Github User Status: " + results.bio + "</p></br>" + "<p>" + "Github username: " + gitUser + "</p></br>");
  }));
  //get user's repositories
  $.get("https://api.github.com/users/" + gitUser + "/repos" + "?access_token=" + apiKey, (function(responses) {
    console.log(responses);
    console.log(JSON.stringify(responses));
    responses.forEach(function(response) {
      if (response.description === null) {
        $("#get-user-repos").append("<ol>" + response.name + "</ol>" + "<p>" + response.html_url + "</p>" + "<p>" + "Oooopss!! Repository Description not found !!!" + "</p></br>");
      } else {
        $("#get-user-repos").append("<ol>" + response.name + "</ol>" + "<p>" + response.html_url + "</p>" + "<p>" + response.description + "</p></br>");
      }
      // console.log(response.name);
      // console.log(response.html_url);
      // console.log(response.description);
    });
  }));
}
exports.GithubuserModule = Githubuser;

},{"./../.env":1}],3:[function(require,module,exports){
//require the github-user.js file here
var Githubuser = require("./../js/github-user.js").GithubuserModule;

$(document).ready(function() {
  var currentGithubUserObject = new Githubuser();

  $('#userRepos').click(function(event) {
    // console.log("grooot");
    event.preventDefault();

    var gitUser = $('#gitUsername').val();
    $('#gitUsername').val(" ");

    // console.log(gitUser);

    currentGithubUserObject.getGithubUser(gitUser);
  });
});

},{"./../js/github-user.js":2}]},{},[3]);
