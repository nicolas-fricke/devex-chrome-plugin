$(document).on('settingsLoaded', function(){
  $.getJSON(localStorage['trackingUrl'], function( data ) {
    console.log(data.data.revision);
  });

  $("#query-btn").click(function() {
    $.getJSON(
        buildGithubApiQuery("/repos/Devex/front-end/commits", settings.githubToken)
      ).done(function(data) {
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

$(document).on('watchlistLoaded', function() {
  $.each(storageManager.watchlist, function(index, watchedElement) {
    var $newRow = $('#pr-template-row')
      .clone()
      .appendTo('#watchlist-body')
      .attr('data-index', index);
    $newRow.children('.repository').children('a')
      .text(watchedElement.repository)
      .attr('href', 'https://github.com/' + watchedElement.repository);
    $newRow.children('.pr-name').children('a')
      .text(watchedElement.pullRequestName)
      .attr('href', 'https://github.com/' + watchedElement.repository + '/pull/' + watchedElement.pullRequestNumber.slice(1));
    $newRow.removeClass('hidden');
  });
});
