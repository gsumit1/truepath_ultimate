var backgroundPageConnection = chrome.runtime.connect({
  name: "devtools-page"
});

function handleShown() {
  chrome.runtime.sendMessage({
    message: "generate-selector"
  })
}

function handleHidden() {
  var e = ["xpath", "", !1];
  backgroundPageConnection.postMessage({
    name: "highlight-element",
    tabId: chrome.devtools.inspectedWindow.tabId,
    xpath: e
  })
}
chrome.devtools.panels.elements.createSidebarPane("TruePath", function(e) {
  e.setPage("../devtools-panel/devtools-content.html"), e.onShown.addListener(handleShown), e.onHidden.addListener(handleHidden)
});
