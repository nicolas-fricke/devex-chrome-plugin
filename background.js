chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.type == 'watchlistAddEntry') {
      storageManager.addToWatchList(request.entry);
      sendResponse({
        status: 200,
        message: 'Successfully added PR ' + request.entry.pullRequestNumber + ' to watchlist.'
      });
    }
  });
