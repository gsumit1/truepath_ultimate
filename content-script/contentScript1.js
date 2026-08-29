/*
TruePath: Xpath On Click
Version: 1.0.0
Owner: Sumit Ghosh
Email: qaworld.sumit@gmail.com
All rights reserved @ 2020.
*/
var oldNodes = [];
var oldAttribute = "";
var allNodes = [];
var _document = "";

class Stack {
  constructor() {
    this.stac = new Array();
    this.pop = function () {
      return this.stac.pop();
    };
    this.push = function (item) {
      this.stac.push(item);
    };
  }
}
var stack=new Stack();

function generateRelXpath(element) {
    /*new code added*/
 try{
 stack.pop().style.outline="";
  } catch (err) {}
 stack.push(element);

  element.style.cssText = 'outline:2px dotted green !important';
  element.scrollIntoViewIfNeeded()

  try {
    for (var i = 0; i < oldNodes.length; i++) {
      removeAttribute(oldNodes[i], "truepath", "false")
    }
  } catch (err) {}
  /*new code added*/

  var node = element
  tagName = element.tagName.toLowerCase();
  var xpathContainsArr = [];
  var uniquesArr = [];
  var threeStar = [];
  var twoStar = [];
  var oneStar = [];
  var name, value, locator, xpathContains, xpathEquals, firstXpath;
  var flag1 = true;
  var flag2 = true;
  var resultArrays = [];
  var iFrameUrl = "na";
  var isInIFrameFlag = "na";
  var nameElement="";
  var idElement="";

  try {
    var isInIFrame = (window.location != window.parent.location);
    if (isInIFrame == true) {
      iFrameUrl = window.document.URL;
      isInIFrameFlag = "ya";
    }
  } catch (err) {}
  if (tagName != 'body') {

    for (var i = 0; i < node.attributes.length; i++) {
      name = node.attributes[i].name;
      value = node.attributes[i].value;

      if (!name.indexOf("style")) continue;
      if (name=="id"){idElement=value;}
      if (name=="name"){nameElement=value;}

      var isNoHrefFalg = (name.indexOf("href") === -1);
      var isNoSrcFalg = (name.indexOf("src") === -1);
      var isNoIdFalg = (name.indexOf("id") === -1);
      var isNoHttpFlag = (value.indexOf("http") === -1);

      if (value.indexOf("\'") < 0 && value.length > 0) {
        if ((isNoHrefFalg) && (isNoSrcFalg)) {
          xpathContains = "//" + tagName + "[contains(@" + name + ",\'" + value + "\')]";
          xpathContainsArr.push(xpathContains);
          var xpr = node.ownerDocument.evaluate("count(" + xpathContains + ")", node.ownerDocument.body, null, XPathResult.NUMBER_TYPE, null);
          var bUnique = (xpr.numberValue === 1);
          uniquesArr.push(bUnique);
          if ((isNoIdFalg) && (isNoHttpFlag) && bUnique) {
            threeStar.push(xpathContains);
          } else if (bUnique) {
            twoStar.push(xpathContains);
          }
        }

        xpathEquals = "//" + tagName + "[@" + name + "=\'" + value + "\']";
        xpathContainsArr.push(xpathEquals);
        if (flag1 && (name != 'id')) {
          if (firstXpath != undefined) {
            firstXpath = firstXpath + "[@" + name + "=\'" + value + "\']";
            flag1 = false;
          } else {
            firstXpath = xpathEquals;
            flag1 = false;
          }
        }

        xpr = node.ownerDocument.evaluate("count(" + xpathEquals + ")", node.ownerDocument.body, null, XPathResult.NUMBER_TYPE, null);
        bUnique = (xpr.numberValue === 1);
        uniquesArr.push(bUnique);

        if (((isNoIdFalg) && (isNoHrefFalg) && (isNoSrcFalg) && (isNoHttpFlag)) && bUnique) {
          threeStar.push(xpathEquals);
        } else if (bUnique) {
          twoStar.push(xpathEquals);
        }

        if (value.indexOf("_") !== -1) {
          var arr = value.split("_");
          var newval = (arr[arr.length - 1])
          value = newval;
          xpathContains = "//" + tagName + "[contains(@" + name + ",\'" + value + "\')]";

          if (name === 'ID' || name === 'id' || name === 'Id') {
            if (firstXpath != undefined) {
              firstXpath = firstXpath + "[contains(@" + name + ",\'" + value + "\')]";
            } else {
              firstXpath = xpathContains;
            }
          }

          xpathContainsArr.push(xpathContains);
          xpr = node.ownerDocument.evaluate("count(" + xpathContains + ")", node.ownerDocument.body, null, XPathResult.NUMBER_TYPE, null);
          bUnique = (xpr.numberValue === 1);
          uniquesArr.push(bUnique);

          if (((isNoIdFalg) && (isNoHrefFalg) && (isNoSrcFalg) && (isNoHttpFlag)) && bUnique) {
            threeStar.push(xpathContains);
          } else if (bUnique) {
            twoStar.push(xpathContains);
          }
        }

        if (value.indexOf("$") !== -1) {
          var arr = value.split("$");
          var newval = (arr[arr.length - 1])
          value = newval;
          xpathContains = "//" + tagName + "[contains(@" + name + ",\'" + value + "\')]";
          xpathContainsArr.push(xpathContains);
          xpr = node.ownerDocument.evaluate("count(" + xpathContains + ")", node.ownerDocument.body, null, XPathResult.NUMBER_TYPE, null);
          bUnique = (xpr.numberValue === 1);
          uniquesArr.push(bUnique);

          if (((isNoIdFalg) && (isNoHrefFalg) && (isNoSrcFalg) && (isNoHttpFlag)) && bUnique) {
            threeStar.push(xpathContains);
          } else if (bUnique) {
            twoStar.push(xpathContains);
          }
        }
      }
    }
    var nodeText = node.textContent.trim();
    if (nodeText.indexOf("\'") < 0 && nodeText.length > 0) {
      if (tagName != 'select') {
        xpath = "//" + tagName + "[contains(.,\'" + nodeText + "\')]";
        xpathContainsArr.push(xpath);
        if (flag2) {
          if (firstXpath != undefined) {
            firstXpath = firstXpath + "[contains(.,\'" + nodeText + "\')]";
            flag2 = false;
          } else {
            firstXpath = xpath;
            flag2 = false;
          }
        }
        var xpr = node.ownerDocument.evaluate("count(" + xpath + ")", node.ownerDocument.body, null, XPathResult.NUMBER_TYPE, null);
        var bUnique = (xpr.numberValue === 1);
        uniquesArr.push(bUnique);
        if (bUnique) {
          threeStar.push(xpath);
        }
      }

    }
    //Generate Unique XPath using index
    for (var i = 0; i < uniquesArr.length; i++) {
      if (!uniquesArr[i]) {
        var xpath = xpathContainsArr[i];
        var nodes = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
        var counts = document.evaluate("count(" + xpath + ")", document, null, XPathResult.NUMBER_TYPE, null);
        if (counts.numberValue == 0) {
          oneStar.push(xpath);
        }
        var results = [],
          nodex;
        var index = 0;
        while (nodex = nodes.iterateNext()) {
          index++;
          if (nodex.isSameNode(node)) {
            xpathContainsArr[i] = "(" + xpath + ")[" + index + "]";
            oneStar.push("(" + xpath + ")[" + index + "]");
          }
        }
      }
    }
    //Constructing XPath with attributes
    var nodes = document.evaluate(firstXpath, document, null, XPathResult.ANY_TYPE, null);
    var counts = document.evaluate("count(" + firstXpath + ")", document, null, XPathResult.NUMBER_TYPE, null);
    if (counts.numberValue > 1) {
      var results = [],
        nodex;
      var index = 0;
      while (nodex = nodes.iterateNext()) {
        index++;
        if (nodex.isSameNode(node)) {
          var tempXpath = "(" + firstXpath + ")[" + index + "]";
          if (xpathContainsArr.indexOf(tempXpath) == -1) {
            xpathContainsArr.unshift("(" + firstXpath + ")[" + index + "]");
            oneStar.unshift("(" + firstXpath + ")[" + index + "]");
            uniquesArr.unshift(false);
          }
        }
      }
    } else {
      if (xpathContainsArr.indexOf(firstXpath) == -1) {
        xpathContainsArr.unshift(firstXpath);
        uniquesArr.unshift(true);
        if (firstXpath != undefined) {

          var id = firstXpath.split("@")[1].startsWith("id");
          var href = firstXpath.split("@")[1].startsWith("href");
          var src = firstXpath.split("@")[1].startsWith("src");

          if ((id == false) && (href == false) && (src == false) && (firstXpath.indexOf("http") === -1)) {
            threeStar.unshift(firstXpath);
          } else {
            twoStar.unshift(firstXpath);
          }
        }
      }
    }
    /***********************************Diagnosis********************************************
    for (var i = 0; i < uniquesArr.length; i++){
    	console.log(xpathContainsArr[i])
    }

    console.log("**************threeStar*****************")

    for (var i = 0; i < threeStar.length; i++) {
      console.log(threeStar[i])
    }

    console.log("**************twoStar*****************")
    for (var i = 0; i < twoStar.length; i++) {
      console.log(twoStar[i])
    }

    console.log("**************oneStar*****************")
    for (var i = 0; i < oneStar.length; i++) {
      console.log(oneStar[i])
    }
    /*****************************************************************************************
     */

    resultArrays.push(threeStar);
    resultArrays.push(twoStar);
    resultArrays.push(oneStar);
    resultArrays.push(iFrameUrl);
    resultArrays.push(isInIFrameFlag);
    resultArrays.push(idElement);
    resultArrays.push(nameElement);
    resultArrays.push(createAbsXpath(element));

  }
  return resultArrays;
  //  chrome.runtime.sendMessage(resultArrays);
};

var addAttribute = function(element, attributeName, attributeValue) {
  if (attributeName.includes('xpath')) {
    attributeName = "truepath"
  }
  try {
    element.setAttribute(attributeName, attributeValue)
  } catch (err) {
    return
  }
}

var removeAttribute = function(element, attributeName, onChange) {
  try {
    attributeName = oldAttribute;
    //fix for truepath attribute
    attributeName="truepath"
    element.removeAttribute(attributeName);
    element.style.outline = ""
  } catch (err) {
    return
  }
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  this.tempXpath = "";
  this.indexes = [];
  this.matchIndex = [];
  idChecked = "";


  if ((message.xpath || message.xpath === "")) {
    if (message.name.includes("highlight-element")) {
        if (message.xpath[0].charAt(0).includes("/") || message.xpath[0].charAt(0).includes("(") || message.xpath[0].substr(0, 2).includes('./')) {
          message.name = 'xpath'
          highlightElements(message.name, message.xpath[0], message.xpath[1])
        }

    }
  }

  if (message.name === "xpath") {
    var ele = _document.querySelector('[truepath="' + message.index + '"]');
    if (ele) {
      ele.style.cssText = 'outline:2px dotted red !important';
      ele.scrollIntoViewIfNeeded()
    }
  }

  if (message.name === "xpath-remove") {
    var ele = _document.querySelector('[truepath="' + message.index + '"]');
    if (ele) {
      ele.style.outline = ""
    }
  }
  message.xpath = ""
});



highlightElements = function(relativeXPath, xpath, onChange) {
  //_document = _document ? _document : document;
  _document = document;
  var elements;
  try {
    if ((relativeXPath.includes("xpath")) && (xpath !== '')) {
      elements = _document.evaluate(xpath, _document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    } else {
      elements = _document.querySelectorAll(xpath)
    }
  } catch (err) {
    if (xpath) {
      chrome.runtime.sendMessage({
        count: "wrongXpath"
      })
    } else {
      chrome.runtime.sendMessage({
        count: "blank"
      })
    }

    for (var i = 0; i < oldNodes.length; i++) {
      removeAttribute(oldNodes[i], relativeXPath, onChange)
    }
    oldNodes = [];
    allNodes = [];
    return
  }

  var totalMatchFound, node;

  if (relativeXPath.includes("xpath")) {
    totalMatchFound = elements.snapshotLength
  } else {
    totalMatchFound = elements.length
  }

  //console.log("totalMatchFound "+totalMatchFound);

  for (var i = 0; i < oldNodes.length; i++) {
    removeAttribute(oldNodes[i], relativeXPath, onChange)
  }

  oldNodes = [];
  allNodes = [];

  /*chrome.runtime.sendMessage({
      count: totalMatchFound
    }); */

  for (var i = 0; i < totalMatchFound; i++) {
    if (relativeXPath.includes("xpath")) {
      node = elements.snapshotItem(i)
      node.style.cssText = 'outline:2px dotted blue !important';
      node.scrollIntoViewIfNeeded()

    } else {
      node = elements[i]
    }
    if (i === 0 && !(xpath === "/" || xpath === "." || xpath === "/." || xpath === "//." || xpath === "//..")) {
      node.scrollIntoViewIfNeeded()
    }
    oldNodes.push(node);
    oldAttribute = relativeXPath;
    addAttribute(node, relativeXPath, i + 1);
    allNodes.push(node.outerHTML)
  }

  //console.log("Nodes"+allNodes.length)
  if (allNodes.length > 0) {
    chrome.runtime.sendMessage({
      count: allNodes
    });
    return;
  }

  if (_document !== document) {
    chrome.runtime.sendMessage({
      count: "iframe"
    });
    var styles = "[xpath], [css]{outline: 2px dotted #0715f7f7 !important}";
    var styleElement = _document.createElement("style");
    styleElement.innerHTML = styles;
    _document.documentElement.appendChild(styleElement);
    styles = '[xpath="1"], [css="1"]{outline:2px dotted #ffa500 !important}';
    styleElement = _document.createElement("style");
    styleElement.innerHTML = styles;
    _document.documentElement.appendChild(styleElement)
  } else

  {
    chrome.runtime.sendMessage({
      count: "notIframe"
    })
  }
};

function createAbsXpath(element) {
  if (element.tagName.toLowerCase().includes("style") || element.tagName.toLowerCase().includes("script")) {
    return "This is " + element.tagName.toLowerCase() + " tag. For " + element.tagName.toLowerCase() + " tag, no need to write selector. :P"
  }
  if (element.tagName.toLowerCase() === 'html')
    return '/html[1]';
  if (element.tagName.toLowerCase() === 'body')
    return '/html[1]/body[1]';
  var ix = 0;
  var siblings = element.parentNode.childNodes;
  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i];
    if (sibling === element) {
      if (element.tagName.toLowerCase().includes('svg')) {
        var absXpath = createAbsXpath(element.parentNode) + '/' + '*';
        return absXpath
      } else {
        var absXpath = createAbsXpath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
        if (absXpath.includes("/*/")) {
          absXpath = "It might be child of iframe and it is not supported currently."
        }
        return absXpath
      }
    }
    if (sibling.nodeType === 1 && sibling.tagName.toLowerCase() === element.tagName.toLowerCase()) {
      ix++
    }
  }
}
