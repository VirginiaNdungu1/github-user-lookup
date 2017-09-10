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
