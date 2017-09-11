var apiKey = require('./../.env').apiKey;

//create GithubUser Object
Githubuser = function() {

};

//Create constructor with method getGithubUser()
Githubuser.prototype.getGithubUser = function(gitUser) {
  // get github user
  $.get("https://api.github.com/users/" + gitUser + "?access_token=" + apiKey).then(function(results) {
    $("#get-user-repos").prepend("<p>" + "Github User: " + results.name + "</p></br>" + "<p>" + "Github User Status: " + results.bio + "</p></br>" + "<p>" + "Github username: " + gitUser + "</p></br>" + "<p>" + "Public Repositories: " + results.public_repos + "</p></br>");
  }).fail(function(error) {
    $("#get-user-repos").text(error.responseJSON.message);
  });

  //get user's repositories
  $.get("https://api.github.com/users/" + gitUser + "/repos?access_token=" + apiKey).then(function(responses) {
    console.log(responses);
    console.log(JSON.stringify(responses));
    responses.forEach(function(response) {
      if (response.description === null) {
        $("#get-user-repos").append("<ol>" + response.name + "</ol>" + "<a href =" +
          response.html_url + ">" + " Oooopss!! Repository Description NOT Found!!!");
      } else {
        $("#get-user-repos").append("<ol>" + response.name + "</ol>" + "<a href =" +
          response.html_url + ">" + response.description);

      }
    }).fail(function(error) {
      $("#get-user-repos").text(error.responseJSON.message);
    });
  });
};
exports.GithubuserModule = Githubuser;
