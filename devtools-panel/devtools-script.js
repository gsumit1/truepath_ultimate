/*
TruePath: Xpath On Click
Version: 0.7.0
Owner: Sumit Ghosh
Email: qaworld.sumit@gmail.com
All rights reserved @ 2020.
*/

/*
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-121369733-1']);
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = 'https://ssl.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
try {
  s.parentNode.insertBefore(ga, s);
} catch (err) {}
*/
let instanceDropdown;
var backgroundPageConnection = chrome.runtime.connect({
  name: "devtools-page"
});

var elementRegEx = /(?:^(<.+?>)(.+)(<\/.+?>)$)|(?:^(<.+?>)$)/;
var threeStarEvent;
var oneStarEvent;
var twoStarEvent;
var flag3 = 0;
var flag2 = 0;
var flag1 = 0;

//For runtime dropdown
let dropdownSet = class {
  constructor(x, y, z, p, q, r) {
    this.threeStar = x;
    this.twoStar = y;
    this.oneStar = z;
    this.idElement = p;
    this.NameElement = q;
    this.absElement = r;
  }
  get threeStar() {
    return this._threeStar;
  }
  get twoStar() {
    return this._twoStar;
  }
  get oneStar() {
    return this._oneStar;
  }

  get idElement() {
    return this._idElement;
  }
  get NameElement() {
    return this._nameElement;
  }
  get absElement() {
    return this._absElement;
  }
  set threeStar(value) {
    this._threeStar = value;
  }

  set twoStar(value) {
    this._twoStar = value;
  }

  set oneStar(value) {
    this._oneStar = value;
  }
  set idElement(value) {
    return this._idElement = value;
  }
  set NameElement(value) {
    return this._nameElement = value;
  }
  set absElement(value) {
    return this._absElement = value;
  }
};

chrome.devtools.panels.elements.onSelectionChanged.addListener(generateXPath);

backgroundPageConnection.onMessage.addListener(function(message) {
  if (message[0] != undefined && message[0] == "xpathInfo") {
    return;
  }

  var wrong;
  var iframe;
  var notIframe;
  var inputBox = document.querySelector(".xpath-input");
  try {
    wrong = (message.count).includes("wrongXpath");
    iframe = (message.count).includes("iframe");
    notIframe = (message.count).includes("notIframe")
  } catch (err) {}

  if (iframe) {
    iframeIcon.style.display = "block";
    iframeIcon.style.backgroundColor = "#aba9a9ba";
    inputBox.style.width = "calc(100% - 15px)";
    inputBox.style.marginLeft = "15px"
  } else if (notIframe) {
    //iframeIcon.style.display = "none";
    inputBox.style.width = "100%";
    inputBox.style.marginLeft = "0px"
  } else {
    if (wrong) {
      highlightWrongXpath();
      showTotalCount(message.count);
      return
    } else {
      removeWrongXpath();
      showTotalCount(message.count);
      displayAllMatchedNode(message.count);
    }
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "generate-selector") {
    generateXPath()
  }
});

backgroundPageConnection.postMessage({
  name: "init",
  tabId: chrome.devtools.inspectedWindow.tabId,
  contentScript: "../content-script/contentScript1.js"
});

document.addEventListener("DOMContentLoaded", function() {
  instanceDropdown = new dropdownSet(0, 0, 0, 0, 0, 0);
  var inputBox = document.querySelector(".jsXpath");
  inputBox.focus();
  inputBox.addEventListener("keyup", function(event) {
    var key = event.which || event.keyCode;
    if (key === 13) {
      pullNodeFrmPage(document.querySelector(".jsXpath").value, !1)
    }
  });
  loadDevTool();
});

var pullNodeFrmPage = function(inputBoxValue, onChange) {
  if (inputBoxValue.charAt(0).includes("/") || inputBoxValue.charAt(0).includes("(") || inputBoxValue.substr(0, 2).includes('./')) {
    var xpath = [inputBoxValue, onChange];
    backgroundPageConnection.postMessage({
      name: "highlight-element",
      tabId: chrome.devtools.inspectedWindow.tabId,
      xpath: xpath
    })
  }
};

var removeWrongXpath = function() {
  try {
    var inputBox = document.querySelector(".xpath-input.wrongXpath");
    inputBox.classList.remove("wrongXpath")
  } catch (err) {}
};

var highlightWrongXpath = function() {
  var inputBox = document.querySelector(".xpath-input");
  inputBox.className += " wrongXpath"
};

var clearElements = function() {
  var listElements = document.querySelector("#eleContainer");
  var countElement = document.querySelector(".returnNodeCount");
  countElement.innerHTML = "";
  listElements.innerHTML = ""
};

function generateXPath() {
  var inputBoxValue = document.querySelector(".jsXpath").value;
  if (inputBoxValue) {
    document.querySelector(".jsXpath").value = '';
  }


  function removeCopyButton(id) {
    try {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        element.parentNode.removeChild(element);
      }
    } catch (error) {}
  }

  function createIconsOpentions(threeStarMain, threeStarPng, threeStarDotPng, threeStar, copyButton1, copyButton2, data) {
    var iconThreeStar = document.querySelector(threeStarMain);
    frag1 = document.createDocumentFragment();
    img = document.createElement("img");
    img.setAttribute('id', threeStarPng);
    img.setAttribute('class', "xpathIcon");
    img.setAttribute('src', threeStarDotPng);
    select = document.createElement("select");
    select.setAttribute('id', threeStar);
    select.setAttribute('class', "dynamicDropdown");
    copyButton = document.createElement("button");
    copyButton.setAttribute('id', copyButton1);
    copyButton.setAttribute('title', "Copy Normal XPath");
    copyButton.setAttribute('class', "copy-btn box relCopyButton");
    copyButton1 = document.createElement("button");
    copyButton1.setAttribute('id', copyButton2);
    copyButton1.setAttribute('title', "Copy POM XPath");
    copyButton1.setAttribute('class', "copy-btn box relCopyButton");
    for (var i = 0; i < data.length; i++) {
      select.options.add(new Option(data[i], data[i]));
    }
    frag1.appendChild(img);
    iconThreeStar.appendChild(frag1);
    iconThreeStar.appendChild(select);
    iconThreeStar.appendChild(copyButton);
    iconThreeStar.appendChild(copyButton1);
  }

  function createIDName(threeStarMain, id_label, id_textbox, copyButton1, copyButton2, data) {
    var iconThreeStar = document.getElementById(threeStarMain);
    frag1 = document.createDocumentFragment();
    span = document.createElement("span");
    span.setAttribute('type', "text");
    span.setAttribute('id', id_label);

    span1 = document.createElement("span");
    span1.setAttribute('type', "text");
    span1.setAttribute('id', id_textbox);
    span1.setAttribute('class', "box jsSelector");

    copyButton = document.createElement("button");
    copyButton.setAttribute('id', copyButton1);
    copyButton.setAttribute('title', "Copy Normal Format");
    copyButton.setAttribute('class', "copy-btn box relCopyButton");

    copyButton1 = document.createElement("button");
    copyButton1.setAttribute('id', copyButton2);
    copyButton1.setAttribute('title', "Copy POM Format");
    copyButton1.setAttribute('class', "copy-btn box relCopyButton");

    frag1.appendChild(span);
    iconThreeStar.appendChild(frag1);
    iconThreeStar.appendChild(span1);
    iconThreeStar.appendChild(copyButton);
    iconThreeStar.appendChild(copyButton1);
  }

  function createXpathContainer(id) {
    var iconThreeStar1 = document.querySelector("#xpathContainer");
    frag1 = document.createDocumentFragment();
    li = document.createElement("li");
    li.setAttribute('id', id);
    li.setAttribute('class', "selectorsContainer");
    frag1.append(li);
    iconThreeStar1.append(frag1);
  }

  var removeXpathContainer = function() {
    try {

      if (instanceDropdown.absElement > 0) {
        removeCopyButton("absElement");
      }

      if (instanceDropdown.idElement > 0) {
        removeCopyButton("idElement");
      }

      if (instanceDropdown.NameElement > 0) {
        removeCopyButton("nameElement");
      }

      if (instanceDropdown.threeStar > 0) {
        removeCopyButton("threeStarMain");
      }

      if (instanceDropdown.twoStar > 0) {
        removeCopyButton("twoStarMain");
      }

      if (instanceDropdown.oneStar > 0) {
        removeCopyButton("oneStarMain");
      }
    } catch (err) {}
  }

  var relXPath = chrome.devtools.inspectedWindow.eval('generateRelXpath($0)', {
    useContentScriptContext: !0
  }, function(result) {
    console.log("result "+result);
    clearElements();
    removeXpathContainer();

    try {

      if (undefined !== result[7] && result[7].length > 0) {
        createXpathContainer("absElement");
      }

      if (undefined !== result[5] && result[5].length > 0) {
        createXpathContainer("idElement");
      }

      if (undefined !== result[6] && result[6].length > 0) {
        createXpathContainer("nameElement");
      }

      if (undefined !== result[0] && result[0].length > 0) {
        createXpathContainer("threeStarMain");
      }

      if (undefined !== result[1] && result[1].length > 0) {
        createXpathContainer("twoStarMain");
      }

      if (undefined !== result[2] && result[2].length > 0) {
        createXpathContainer("oneStarMain");
      }
    } catch (error) {}

    try {
      if (null !== result[7] && result[7].length) {
        createIDName("absElement", "abs_label", "abs_textbox", "copyButtonAbs1", "copyButtonAbs2", result[7])
        document.getElementById("abs_label").innerHTML = "abs: "
        document.getElementById("abs_textbox").innerHTML = result[7];
        try {
          absEvent = document.getElementById("abs_textbox");
          absEvent.addEventListener("click", function() {
            document.querySelector(".jsXpath").value = result[7];
          });
        } catch (err) {}
        instanceDropdown.absElement = 1;
        copyIDName("#copyButtonAbs1", result[7], "normal", "xpath")
        copyIDName("#copyButtonAbs2", result[7], "pom","xpath")
      }
    } catch (err) {}

    try {
      if (null !== result[5] && result[5].length) {
        createIDName("idElement", "idElement_label", "idElement_textbox", "copyButtonID1", "copyButtonID2", result[5])
        document.getElementById("idElement_label").innerHTML = "id: "
        document.getElementById("idElement_textbox").innerHTML = result[5];
        instanceDropdown.idElement = 1;
        copyIDName("#copyButtonID1", result[5], "normal", "id")
        copyIDName("#copyButtonID2", result[5], "pom","id")
      }
    } catch (err) {}

    try {
      if (null !== result[6] && result[6].length) {
        createIDName("nameElement", "nameElement_label", "nameElement_textbox", "copyButtonName1", "copyButtonName2", result[6])
        document.getElementById("nameElement_label").innerHTML = "name: "
        document.getElementById("nameElement_textbox").innerHTML = result[6];
        instanceDropdown.NameElement = 1;
        copyIDName("#copyButtonName1", result[6], "normal","name")
        copyIDName("#copyButtonName2", result[6], "pom","name")
      }
    } catch (err) {}

    try {
      if (undefined !== result[0] && result[0].length) {
        createIconsOpentions("#threeStarMain", "threeStarPng", "threeStar.png", "threeStar", "copyButton1", "copyButton2", result[0]);
        threeStarEvent = document.getElementById('threeStar');

        try {
          threeStarEvent.addEventListener("click", function() {
            var selValue = threeStarEvent.options[threeStarEvent.selectedIndex].value;
            document.querySelector(".jsXpath").value = selValue;
          });
        } catch (err) {}
        instanceDropdown.threeStar = 1;
        copyXPath("#copyButton1", 'threeStar', "normal")
        copyXPath("#copyButton2", 'threeStar', "pom")
      }
    } catch (err) {}

    try {
      if (undefined !== result[1] && result[1].length) {
        createIconsOpentions("#twoStarMain", "twoStarPng", "twoStar.png", "twoStar", "copyButton3", "copyButton4", result[1]);
        twoStarEvent = document.getElementById('twoStar');
        try {
          twoStarEvent.addEventListener("click", function() {
            var selValue = twoStarEvent.options[twoStarEvent.selectedIndex].value;
            document.querySelector(".jsXpath").value = selValue;
          });
        } catch (err) {}
        copyXPath("#copyButton3", 'twoStar', "normal")
        copyXPath("#copyButton4", 'twoStar', "pom")
        instanceDropdown.twoStar = 1;
      }
    } catch (err) {}

    try {
      if (undefined !== result[2] && result[2].length) {
        createIconsOpentions("#oneStarMain", "oneStarPng", "oneStar.png", "oneStar", "copyButton5", "copyButton6", result[2]);
        oneStarEvent = document.getElementById('oneStar');
        try {
          oneStarEvent.addEventListener("click", function() {
            var selValue = oneStarEvent.options[oneStarEvent.selectedIndex].value;
            document.querySelector(".jsXpath").value = selValue;
          });
        } catch (err) {}
        copyXPath("#copyButton5", 'oneStar', "normal")
        copyXPath("#copyButton6", 'oneStar', "pbm")
        instanceDropdown.oneStar = 1;
      }
    } catch (err) {}
    //createIframe();
  })
};

var createIframe = function() {
  if (document.getElementById("iframe") == null) {
    var iframeElement = document.querySelector("#frame");
    frag1 = document.createDocumentFragment();
    iframe = document.createElement("iframe");
    iframe.setAttribute('id', "iframe");
    iframe.setAttribute('class', "iframeDetails24");
    iframe.setAttribute('width', "300px");
    iframe.setAttribute('height', "17");
    iframe.setAttribute('align', "center");
    iframe.setAttribute('src', "http://qaworld.in/update/");
    iframe.setAttribute('marginwidth', "0");
    iframe.setAttribute('marginheight', "0");
    iframe.setAttribute('frameborder', "0");
    iframe.setAttribute('scrolling', "no");
    frag1.appendChild(iframe);
    iframeElement.appendChild(frag1);
  }
}

var copyXPath = function(buttonName, XPathOptionName, XPathType) {
  var copyText = document.querySelector(buttonName);
  copyText.addEventListener("click", function() {
    threeStarEvent = document.getElementById(XPathOptionName);
    var selValue = threeStarEvent.options[threeStarEvent.selectedIndex].value;
    let textarea = document.createElement('textarea');
    textarea.id = 't';
    textarea.style.height = 0;
    document.body.appendChild(textarea);
    if (XPathType == "normal") {
      textarea.value = selValue;
    } else {
      textarea.value = "@FindBy(xpath = " + "\"" + selValue + "\")";
    }
    let selector = document.querySelector('#t');
    selector.select();
    document.execCommand('copy');
    document.body.removeChild(textarea)
  });
}

var copyIDName = function(buttonName, value, XPathType,type) {
  var copyText = document.querySelector(buttonName);
  copyText.addEventListener("click", function() {
    copyDetails(value, XPathType, type);
  });
}

var copyDetails = function(value, XPathType, type) {
  let textarea = document.createElement('textarea');
  textarea.id = 't';
  textarea.style.height = 0;
  document.body.appendChild(textarea);
  if (XPathType == "normal") {
    textarea.value = value;
  } else {
    textarea.value = "@FindBy("+type+" = " + "\"" + value + "\")";
  }
  let selector = document.querySelector('#t');
  selector.select();
  document.execCommand('copy');
  document.body.removeChild(textarea)
}

var displayAllMatchedNode = function(allNode) {
  var nodeDom = document.querySelector("#eleContainer");
  var inputBoxValue = document.querySelector(".jsXpath").value;
  relativeXPath = "xpath"
  nodeDom.innerHTML = "";
  if (allNode != "blank" && allNode != "undefined") {
    for (var i = 1; i <= allNode.length; i++) {
      allNode[i - 1] = allNode[i - 1] ? allNode[i - 1] : "";
      if (allNode[i - 1]) {
        var domStr = allNode[i - 1];
        domStr = domStr.replace(/(\r\n|\n|\r)/gm, "");
        var elementToCreate = "";
        if (domStr.match(/^<td/) || domStr.match(/^<th/)) {
          elementToCreate = "tr"
        } else if (domStr.match(/^<tr/)) {
          elementToCreate = "tbody"
        } else if (domStr.match(/^<tbody/)) {
          elementToCreate = "table"
        } else if (domStr.match(/^<body/)) {
          domStr = domStr.replace('<body', '<bodytag').replace('body>', 'bodytag>');
          elementToCreate = "li"
        } else {
          elementToCreate = "li"
        }
        var dummyElement = createElement(elementToCreate);
        dummyElement.innerHTML = domStr;
        var treeStructure = changeToTreeStructure(dummyElement, "parent closed");
        treeStructure.setAttribute(relativeXPath, i);
        nodeDom.appendChild(treeStructure);
        treeStructure.onmouseover = function() {
          focusElement(this)
        }
        treeStructure.onmouseout = function() {
          removeFocusElement(this)
        }
      }
    }
  }
};

var changeToTreeStructure = function(node, classList) {
  var element, openTag;
  var childElements, wrapper;
  if (!node.childElementCount) {
    classList = "text-node level-padding";
    wrapper = createElement("div", classList);
    wrapper.innerText = node.textContent;
    return wrapper
  }
  if (node.childNodes.length > 1) {
    var children = node.childNodes;
    var parentWrapper = createElement("div", (classList + " children-cont"));
    for (var i = 0; i < children.length; i++) {
      element = children[i];
      wrapper = getWrapperNodeFromPage(element, "child closed");
      parentWrapper.appendChild(wrapper)
    }
    return parentWrapper
  } else {
    element = node.childNodes[0];
    wrapper = getWrapperNodeFromPage(element, classList);
    return wrapper
  }
};

var createElement = function(elementName, classList) {
  var element = document.createElement(elementName);
  if (classList) {
    element.setAttribute("class", classList)
  }
  return element
}

var getTextNodeWrapperFromPage = function(textNode) {
  var wrapper = createElement("div", "child level-padding");
  wrapper.innerText = textNode.textContent;
  return wrapper
}

var getWrapperNodeFromPage = function(element, classList) {
  var openCloseTag = getDetailTag(element);
  if (element.nodeType === Node.TEXT_NODE) {
    return getTextNodeWrapperFromPage(element)
  }
  if ((element.childNodes && element.childNodes.length === 0) && !element.textContent) {
    classList = "leaf-node level-padding"
  }
  var wrapper = createElement("div", classList);
  var openTagText = createElement("span", "open-tag-label");
  openTagText.innerText = openCloseTag.openTag;
  wrapper.appendChild(openTagText);
  if ((element.childNodes && element.childNodes.length > 0) || element.textContent) {
    childElements = changeToTreeStructure(element, "child level-padding closed");
    wrapper.appendChild(childElements)
  }
  var closeTagText = createElement("span", "close-tag-label");
  closeTagText.innerText = openCloseTag.closeTag;
  wrapper.appendChild(closeTagText);
  return wrapper
};

var getDetailTag = function(element) {
  var matches = elementRegEx.exec(element.outerHTML);
  var openTag = '',
    closeTag = '';
  if (matches) {
    openTag = matches[1] ? matches[1] : matches[0];
    closeTag = matches[3] ? matches[3] : ''
  }
  return {
    openTag: openTag,
    closeTag: closeTag
  }
};

var focusElement = function(ele) {
  var inputBoxValue = document.querySelector(".jsXpath").value;
  relativeXPath = "xpath"
  var eleIndex = ele.getAttribute(relativeXPath);
  backgroundPageConnection.postMessage({
    name: relativeXPath,
    tabId: chrome.devtools.inspectedWindow.tabId,
    index: eleIndex
  })
}

var removeFocusElement = function(ele) {
  var inputBoxValue = document.querySelector(".jsXpath").value;
  relativeXPath = "xpath"
  var eleIndex = ele.getAttribute(relativeXPath);
  backgroundPageConnection.postMessage({
    name: relativeXPath + "-remove",
    tabId: chrome.devtools.inspectedWindow.tabId,
    index: eleIndex
  })
}

var showTotalCount = function(count) {
  var totalCountElem = document.querySelector(".returnNodeCount");
  var relativeXPath = document.querySelector(".xpath-input").value;
  try {
    if ((count).includes("blank")) {
      totalCountElem.className += " hideCountMsg"
    } else {
      totalCountElem.classList.remove("hideCountMsg");
      var xpathValue = document.querySelector(".jsXpath").value;
      if ((count).includes("wrongXpath")) {
        totalCountElem.innerHTML = "Invalid " + relativeXPath + " pattern. Please enter valid " + relativeXPath + "."
      } else if (count.length === 0) {
        totalCountElem.innerHTML = count.length + " matching node found."
      } else if (xpathValue === "/" || xpathValue === "." || xpathValue === "/.") {
        totalCountElem.innerHTML = count.length + " matching node found. It's a default DOM, available left side in Elements tab."
      } else if (xpathValue === "//.") {
        totalCountElem.innerHTML = count.length + " matching node found. These are all nodes in DOM, available left side in Elements tab."
      } else {
        if (count.length === 1) {
          totalCountElem.innerHTML = count.length + " matching node found. Find the matching node below:"
        } else {
          totalCountElem.innerText = count.length + " matching nodes found. Find the list of matching nodes below:"
        }
      }
    }
  } catch (err) {}
};

var helpButton = document.getElementById("helpButton");
helpButton.addEventListener("mouseover", function() {
  buttonMouseHover(helpButton)
});
helpButton.addEventListener("mouseout", function() {
  buttonMouseOut(helpButton)
});

var feedbackButton = document.getElementById("feedbackButton");
feedbackButton.addEventListener("mouseover", function() {
  buttonMouseHover(feedbackButton)
});
feedbackButton.addEventListener("mouseout", function() {
  buttonMouseOut(feedbackButton)
});

function buttonMouseHover(ele, imgSrc) {
  ele.style.outline = "0.01em solid #73bde2f2";
  ele.style.backgroundImage = "url('" + imgSrc + "')"
}

function buttonMouseOut(ele, imgSrc) {
  ele.style.boxShadow = "";
  ele.style.outline = "";
  ele.style.backgroundImage = "url('" + imgSrc + "')"
}

function buttonMouseHover(ele) {
  ele.style.outline = "0.01em solid #73bde2f2";
  ele.style.backgroundColor = "#fafafa";
  ele.style.color = "#53bbd4";
}

function buttonMouseOut(ele) {
  ele.style.backgroundColor = "";
  ele.style.color = "";
  ele.style.outline = "";
}

setTimeout(function() {
  try {
    var copyBtn1 = document.getElementById("copyButton1");
    copyBtn1.addEventListener("click", function() {
      trackXPathEvent("GreenNormalXPathCopy");
    });
  } catch (err) {}

  try {
    var copyBtn3 = document.getElementById("copyButton3");
    copyBtn3.addEventListener("click", function() {
      trackXPathEvent("YellowNormalXPathCopy");
    });
  } catch (err) {}

  try {
    var copyBtn5 = document.getElementById("copyButton5");
    copyBtn5.addEventListener("click", function() {
      trackXPathEvent("RedNormalXPathCopy");
    });
  } catch (err) {}

  try {
    var copyBtn2 = document.getElementById("copyButton2");
    copyBtn2.addEventListener("click", function() {
      trackXPathEvent("GreenPOMXPathCopy");
    });
  } catch (err) {}

  try {
    var copyBtn4 = document.getElementById("copyButton4");
    copyBtn4.addEventListener("click", function() {
      trackXPathEvent("YellowPOMXPathCopy");
    });
  } catch (err) {}

  try {
    var copyBtn6 = document.getElementById("copyButton6");
    copyBtn6.addEventListener("click", function() {
      trackXPathEvent("RedPOMXPathCopy");
    });
  } catch (err) {}

  try {
    var copyBtnName1 = document.getElementById("copyButtonName1");
    copyBtnName1.addEventListener("click", function() {
      trackXPathEvent("NameCopy");
    });
  } catch (err) {}

  try {
    var copyBtnName2 = document.getElementById("copyButtonName2");
    copyBtnName2.addEventListener("click", function() {
      trackXPathEvent("NamePOMCopy");
    });
  } catch (err) {}

  try {
    var copyBtnID1 = document.getElementById("copyButtonID1");
    copyBtnID1.addEventListener("click", function() {
      trackXPathEvent("IDCopy");
    });
  } catch (err) {}

  try {
    var copyBtnID2 = document.getElementById("copyButtonID2");
    copyBtnID2.addEventListener("click", function() {
      trackXPathEvent("IDPOMCopy");
    });
  } catch (err) {}

  try {
    var copyBtnAbs1 = document.getElementById("copyButtonAbs1");
    copyBtnAbs1.addEventListener("click", function() {
      trackXPathEvent("AbsCopy");
    });
  } catch (err) {}

  try {
    var copyBtnAbs2 = document.getElementById("copyButtonAbs2");
    copyBtnAbs2.addEventListener("click", function() {
      trackXPathEvent("AbsPOMCopy");
    });
  } catch (err) {}

try {
  var customBtn = document.getElementById("customPOM");
  customBtn.addEventListener("click",function() {
  copyBoxPOMValueToClipboard()
  trackXPathEvent("CustomXpathPOM");
  });
} catch (error) {
}

try {
  var customBtn = document.getElementById("custom");
  customBtn.addEventListener("click",function(){
  copyBoxValueToClipboard();
  trackXPathEvent("CustomXpath");
  });
} catch (error) {
}

}, 1000);

function copyBoxPOMValueToClipboard() {
  var text = document.querySelector(".jsXpath").value
  copyValueToClipboard("@FindBy(xpath = " + "\"" + text + "\")")
}

function copyBoxValueToClipboard() {
  var text = document.querySelector(".jsXpath").value
  copyValueToClipboard(text)
}

var copyValueToClipboard = function(value) {
  let textarea = document.createElement('textarea');
  textarea.id = 't';
  textarea.style.height = 0;
  document.body.appendChild(textarea);
  textarea.value = value;
  let selector = document.querySelector('#t');
  selector.select();
  document.execCommand('copy');
  document.body.removeChild(textarea)
}

function trackXPathEvent(xpathType) {
 // _gaq.push(['_trackEvent', xpathType, 'clicked']);
}

var helpButton = document.getElementById("helpButton");
helpButton.addEventListener("click", function() {
  window.open("https://qaworld.ga/truepath/", "_blank ");
});

var feedbackButton = document.getElementById("feedbackButton");
feedbackButton.addEventListener("click", function() {
  window.open("https://chrome.google.com/webstore/detail/truepath/mgjhkhhbkkldiihlajcnlfchfcmhipmn?authuser=0&hl=en", "_blank ");
});


var loadDevTool = function() {
  // _gaq.push(['_trackPageview']);
}

var clickToCopyBoxValue = function() {
  var customBtn = document.getElementById("custom");
  customBtn.addEventListener("click", copyBoxValueToClipboard)
  trackXPathEvent("CustomXpath");
}