$(document).on('settingsLoaded', function(event, settings){
  $("#tracking-url").val(settings.trackingUrl);
  $("#github-token").val(settings.githubToken);
});

$('#save-btn').click(function(){
  chrome.storage.sync.set({
    trackingUrl: $("#tracking-url").val(),
    githubToken: $("#github-token").val()
  }, function() {
    $('#status').text('Options saved.');
  });
});
