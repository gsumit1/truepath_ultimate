var oldNodes = [];
var oldAttribute = "";
var _document = "";
var totalMatchFound = 0;
var node = "";
var resultXPath = [];
const x = new Map();
var allXpathSet;
var tempXpathSet;

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    switch (message.type) {
      case "uploadedCode":
      //  x = new Map();
        allXpathSet = new Set();
        tempXpathSet = new Set();

        for (var i = 0; i < message.data.length; i++) {
          var p = message.data[i];
          allXpathSet.add(p);
          try {
              myCode(p).then(function(xpath, totalMatchFound) {
              oldNodes.push(xpath);
              resultXPath.push(xpath);
            });
          } catch (err) {}
        }

        if (x.size > 0) {
          createFinalList();
          var array = Array.from(x, ([xpath, value]) => ({
            xpath,
            value
          }));
          chrome.runtime.sendMessage({
            from: 'revalidation',
            display: array
          })
        }
        sendResponse(resultXPath);
        return true;
}});

function createFinalList() {
  for (let xpath of allXpathSet) {
    if (!tempXpathSet.has(xpath)) {
      x.set(xpath, 0);
    }
  }
}

function getXpath(tempString) {
  var regexp = /"[^"]+"/g;
  if (tempString.includes("xpath")) {
    var q = tempString.match(regexp).toString().slice(1).slice(0, -1);
    return q;
  } else if (tempString.includes("name")) {
    var q = tempString.match(regexp).toString().slice(1).slice(0, -1);
    return "//*[.=\'" + q + "\']";
  } else if (tempString.includes("className")) {
    var q = tempString.match(regexp).toString().slice(1).slice(0, -1);
    return "//*[@class=\'" + q + "\']";
  } else if (tempString.includes("id")) {
    var q = tempString.match(regexp).toString().slice(1).slice(0, -1);
    return "//*[@id=\'" + q + "\']";
  } else if (tempString.includes("linkText")) {
    var q = tempString.match(regexp).toString().slice(1).slice(0, -1);
    return "//*[.=\'" + q + "\']";
  } else if (tempString.includes("partialLinkText")) {
    var q = tempString.match(regexp).toString().slice(1).slice(0, -1);
    return "//*[contains(.,\'" + q + "\')]";
  } else if (tempString.includes("tagName")) {
    var q = tempString.match(regexp).toString().slice(1).slice(0, -1);
    return "//" + q;
  }
}

function myCode(rowXpath) {
  var xpath = getXpath(rowXpath)
  return new Promise(function(resolve, reject) {
    _document = document;
    var elements;
    try {
      elements = _document.evaluate(xpath, _document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
      totalMatchFound = elements.snapshotLength
    } catch (err1) {}
    for (var i = 0; i < totalMatchFound; i++) {
      node = elements.snapshotItem(i)
      node.style.cssText = 'outline:3px dotted #3bdacd !important';
      node.scrollIntoViewIfNeeded()
    }
    try {
      showTemp(rowXpath, totalMatchFound)
    } catch (e) {

    }
    resolve(s);
  })
}

function showTemp(data, count) {
  try {
    if (count > 0) {
      tempXpathSet.add(data);
      x.set(data, count)
    }
  } catch (err) {
  }
}
