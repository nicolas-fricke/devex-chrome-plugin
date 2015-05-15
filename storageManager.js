settings = {};

function loadSettings(callback) {
  chrome.storage.sync.get({
    trackingUrl: null,
    githubToken: null
  }, function(items) {
    settings['trackingUrl'] = items.trackingUrl;
    settings['githubToken'] = items.githubToken;

    if (typeof callback === "function") {
      callback(settings);
    }

    $(document).trigger('settingsLoaded', settings);
  });
}

$(document).ready(function(){
  loadSettings();
});
