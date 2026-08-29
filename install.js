/*chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'install') {
        chrome.tabs.create({'url': 'http://qaworld.ga/truepath/'});
    }
});*/
chrome.runtime.setUninstallURL('http://qaworld.ga/feedback/');
