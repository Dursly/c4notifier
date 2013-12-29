
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('index.html', {
    'id': '_mainWindow',
    'bounds': {'width': 370, 'height': 600},
    'minWidth':405
  });
});
