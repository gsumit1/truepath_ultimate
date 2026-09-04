/*
TruePath: Xpath On Click
Version: 1.0.0
Owner: Sumit Ghosh
Email: qaworld.sumit@gmail.com
All rights reserved @ 2020.
*/
function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index == 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

window.addEventListener("mousedown", function(event) {
  if (event.button == 2) {
    var node = event.target
    tagName = node.nodeName.toLowerCase();
    var xpathContainsArr = [];
    var uniquesArr = [];
    var threeStar = [];
    var twoStar = [];
    var oneStar = [];
    var name, value, locator, xpathContains, xpathEquals, firstXpath;
    var flag1 = true;
    var flag2 = true;
    var resultArrays = [];
    var iFrameUrl = "The Element is not inside an iframe";
    var isInIFrameFlag = "na";
    var pageTitle = "na";
    var elementName = "Please write yourself";
    try {
      var pageTitle = window.document.title;
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
        //code for elementName
        elementName=getElementName(name, value,elementName)
        if (!name.indexOf("style")) continue;
        if (!name.indexOf("truepath")) continue;

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
          //code for elementName
          elementName=getElementName("value", nodeText,elementName)
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

      for (var i = 0; i < threeStar.length; i++){
      	console.log(threeStar[i])
      }

      console.log("**************twoStar*****************")
      for (var i = 0; i < twoStar.length; i++){
      	console.log(twoStar[i])
      }

      console.log("**************oneStar*****************")
      for (var i = 0; i < oneStar.length; i++){
      	console.log(oneStar[i])
      }
      /*****************************************************************************************
      */
      resultArrays.push(threeStar);
      resultArrays.push(twoStar);
      resultArrays.push(oneStar);
      resultArrays.push(iFrameUrl);
      resultArrays.push(isInIFrameFlag);
      resultArrays.push(pageTitle);
      resultArrays.push(elementName);

      var shadowPath = tpBuildShadowSelectorPath(node);
      resultArrays.push(shadowPath.isInShadowDOM ? 'Yes' : 'No');
      resultArrays.push(shadowPath.hostChain);
      resultArrays.push(tpGeneratePlaywrightShadowLocator(node));
      resultArrays.push(tpGenerateSeleniumShadowCode(node));
    }

    var tempXpath = ["xpathInfo", resultArrays]
      chrome.runtime.sendMessage(tempXpath);
      //chrome.runtime.sendMessage(resultArrays);
  }
}, true);

//code for elementName
function getElementName(name, value,elementName){
                  try {
                    if(name=="value")
                    elementName = camelize(value).replace(/[^a-zA-Z ]/g, "").substring(0, 20);
                  } catch (err) {}
                  if (elementName == '') {
                    elementName = "Please write yourself"
                  }

                  return elementName
                  //code for element name
}
