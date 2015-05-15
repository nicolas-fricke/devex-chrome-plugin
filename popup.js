$(document).on('settingsLoaded', function(){
  $.getJSON(localStorage['trackingUrl'], function( data ) {
    console.log(data.data.revision);
  });

  $("#query-btn").click(function() {
    $.getJSON(buildGithubApiQuery("/repos/Devex/front-end/commits", settings.githubToken)).
        done(function(data) {
          var commitHashes = [];
          $.each(data, function(index, commit) {
            commitHashes.push(commit);
          });
          console.log(commitHashes);
        });
  });
});

function buildGithubApiQuery(route, githubToken) {
  return "https://api.github.com" + route + "?access_token=" + githubToken
}
