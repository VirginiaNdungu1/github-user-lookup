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
