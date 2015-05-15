$(document).ready(function(){
  $("#tracking-url").val(localStorage['trackingUrl']);
  $("#github-token").val(localStorage['githubToken']);

  $("#save-btn").click(function() {
    localStorage['trackingUrl'] = $("#tracking-url").val();
    localStorage['githubToken'] = $("#github-token").val();
  });

  $.getJSON(localStorage['trackingUrl'], function( data ) {
    console.log(data.data.revision);
  });

  $("#query-btn").click(function() {
    $.getJSON(buildGithubApiQuery("/repos/Devex/front-end/commits")).
        done(function(data) {
          var commitHashes = [];
          $.each(data, function(index, commit) {
            commitHashes.push(commit.sha);
          });
          console.log(commitHashes);
        });
  });
});

function buildGithubApiQuery(route) {
  return "https://api.github.com" + route + "?access_token=" + localStorage['githubToken']
}