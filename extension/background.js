/**********************************************************************/
/*
TruePath: Xpath On Click
Version: 3.0.0 (Manifest V3)
Owner: Sumit Ghosh
Email: qaworld.sumit@gmail.com
All rights reserved @ 2020.

NOTE: Manifest V3 uses Service Workers instead of background pages.
Service workers don't persist - they are event-driven and can be terminated.
Global variables may not persist between events. For persistent data,
consider using chrome.storage API.
*/


var devtoolsRegEx = /^chrome-devtools:\/\//;
var connections = {};
var master = {};
var flag2 = 0;
var win = null;
var flagMenu = true;
var oldParent=[];
try {
       removeOldMenuItems();
        var parent = chrome.contextMenus.create({
            id:"truepath",
            "title": "Relative XPath",
            "contexts": ["all"]
        });
        console.log("How many times main menu created "+parent)
        
} catch (err) {}
var oldValue = [];
var menuID;
var iFrame;
var browser_version = "NA";
var browser_name = "Chrome";
var compositeDataTracker = [];
var iFrameUrl;
var isInFrame;
var details = [];
var pageTitle = "NA";
var elementName = "NA";


try {
    if (browser.runtime.getBrowserInfo !== undefined) {
        browser.runtime.getBrowserInfo().then((info) => {
            browser_name = info.name;
            browser_version = info.version.split(".")[0];
        });
    }
} catch (err) {}

var showInfo = function (xpath) {
    iFrameUrl = xpath[3];
    isInFrame = xpath[4];
    pageTitle = xpath[5];
    elementName = xpath[6];
    removeOldMenuItems();
    if (browser_version > 55 && browser_name === 'Firefox') {
        uniqueXpath(xpath);
    } else {
        createMenuItemsOldVersion(xpath);
    }
}

var showIFrameInfo = function (xpath) {
    removeOldMenuItems();
    if (browser_version > 55 && browser_name === 'Firefox') {
        iFrame = chrome.contextMenus.create({
            "id": (Math.random() + 1).toString(36).substring(7),
            "title": "Clicked on iFrame can't generate XPath now",
            "icons": {
                "64": "unProcess.png"
            },
            "parentId": parent,
            "contexts": ["all"]
        });
    } else {
        iFrame = chrome.contextMenus.create({
            "id": (Math.random() + 1).toString(36).substring(7),
            "title": "Clicked on iFrame can't generate XPath now",
            "parentId": parent,
            "contexts": ["all"]
        });
    } oldValue.push(iFrame);
}

var removeOldMenuItems = function () {
    if (oldValue.length > 0) {
        try {
            for (var i = 0; i < oldValue.length; i++) {
                chrome.contextMenus.remove(oldValue[i], () => void chrome.runtime.lastError);
            }
        } catch (err) {}
    }
}

var uniqueXpath = function (xpath) {
    for (var i = 0; i < xpath[0].length; i++) {
        threeStar = chrome.contextMenus.create({
            "title": xpath[0][i],
            "icons": {
                "64": "threeStar.png"
            },
            "parentId": parent,
            "id": xpath[0][i]
        });
        oldValue.push(threeStar);
    }

    if ((xpath[0].length > 0) && (xpath[1].length > 0)) {
        createSeparator();
    }

    for (var i = 0; i < xpath[1].length; i++) {
        twoStar = chrome.contextMenus.create({
            "title": xpath[1][i],
            "icons": {
                "64": "twoStar.png"
            },
            "parentId": parent,
            "id": xpath[1][i]
        });
        oldValue.push(twoStar);
    }

    if ((xpath[1].length > 0) && (xpath[2].length > 0)) {
        createSeparator();
    }

    if ((xpath[2].length > 0) && (xpath[0].length > 0) && (xpath[1].length == 0)) {
        createSeparator();
    }

    for (var i = 0; i < xpath[2].length; i++) {
        oneStar = chrome.contextMenus.create({
            "title": xpath[2][i],
            "icons": {
                "64": "oneStar.png"
            },
            "parentId": parent,
            "id": xpath[2][i]
        });
        oldValue.push(oneStar);
    }
}

var createMenuItemsOldVersion = function (xpath) {

    if (xpath[0] === undefined) {
        return;
    }

    var threeStarlenght = xpath[0].length;
    var twoStarlenght = xpath[1].length;
    var oneStarlenght = xpath[2].length;

    if (twoStarlenght > 0) {
        twoStarMenu = chrome.contextMenus.create({
            "id": (Math.random() + 1).toString(36).substring(7),
            "title": "XPath with id, href, src...",
            "parentId": parent,
            "contexts": ["all"]
        });
        for (var i = 0; i < twoStarlenght; i++) {
            twoStar = chrome.contextMenus.create({"title": xpath[1][i], "parentId": twoStarMenu, "id": xpath[1][i], "contexts": ["all"]});
        }
        oldValue.push(twoStarMenu);
    }

    if ((threeStarlenght > 0) && (twoStarlenght > 0)) {
        createSeparator();
    }

    if (threeStarlenght > 0) {
        threeStarMenu = chrome.contextMenus.create({
            "id": (Math.random() + 1).toString(36).substring(7),
            "title": "XPath with class, name, title...",
            "parentId": parent,
            "contexts": ["all"]
        });
        for (var i = 0; i < threeStarlenght; i++) {
            threeStar = chrome.contextMenus.create({"title": xpath[0][i], "parentId": threeStarMenu, "id": xpath[0][i], "contexts": ["all"]});
        }
        oldValue.push(threeStarMenu);
    }

    if ((threeStarlenght > 0) && (oneStarlenght > 0)) {
        createSeparator();
    }

    if ((twoStarlenght > 0) && (oneStarlenght > 0) && (threeStarlenght == 0)) {
        createSeparator();
    }

    if (oneStarlenght > 0) {
        oneStarMenu = chrome.contextMenus.create({
            "id": (Math.random() + 1).toString(36).substring(7),
            "title": "XPath with index",
            "parentId": parent,
            "contexts": ["all"]
        });
        for (var i = 0; i < oneStarlenght; i++) {
            oneStar = chrome.contextMenus.create({"title": xpath[2][i], "parentId": oneStarMenu, "id": xpath[2][i], "contexts": ["all"]});
        }
        oldValue.push(oneStarMenu);
    }
}

var createSeparator = function () {
    separatorKey = chrome.contextMenus.create({
        "id": (Math.random() + 1).toString(36).substring(7),
        type: "separator",
        "parentId": parent,
        contexts: ["all"]
    });
    oldValue.push(separatorKey);
}

chrome.contextMenus.onClicked.addListener(openPlane);


function openPlane(data, tab) {
    win = tab.windowId;
    if (flag2 == 1) {
        chrome.runtime.sendMessage({
            xpath: data.menuItemId + "@@@@" + pageTitle + "@@@@" + elementName + "@@@@" + isInFrame + "@@@@" + iFrameUrl
        }, function (response) {});
        return;
    } else {
        copyToClipboard(data, tab);
    }

}


chrome.windows.onRemoved.addListener(function (windowId) {
    flag2 = 0;
    if (! win) 
        return;
    
    if (windowId = win.id) 
        win = null;
    
});

var flag23 = "y";
var testdata = [];
function showTemp(data) { // var testdata = new Map(Object.entries(data));
    testdata = "";
    testdata = data;
    if (testdata.length > 0) {
        setTimeout(function () {
            if (flag23 === "y") {
                var w = 500;
                var h = 500;
                // Removed chrome.system.display (deprecated in V3)
                var left = 100;
                var top = 200;
                flag23 = "5";
                chrome.windows.create({
                    url: chrome.runtime.getURL('validation.html'),
                    type: 'popup',
                    width: w,
                    height: h,
                    left: left,
                    top: top
                });
            }
        }, 100)
    }
}

function copyToClipboard(data, tab) {
    var w = 560;
    var h = 550;
    // Removed chrome.system.display (deprecated in V3)
    var left = 100;
    var top = 200;
    flag2 = 1;
    chrome.windows.create({
        url: chrome.runtime.getURL('dialog.html'),
        type: 'popup',
        width: w,
        height: h,
        left: left,
        top: top
    });
    saveClickMenuInfo(data);

}

var saveClickMenuInfo = function (xpath) {
    menuID = xpath.menuItemId;
    if (compositeDataTracker.length > 0) {
        compositeDataTracker = []
    }
    compositeDataTracker.push(menuID);
    compositeDataTracker.push(browser_name);
    compositeDataTracker.push(browser_version);
    compositeDataTracker.push(iFrameUrl);
    compositeDataTracker.push(isInFrame);
    compositeDataTracker.push(pageTitle);
    compositeDataTracker.push(elementName);
}
/*******************************************************************/
var messageToContentScript = function (message) {
    chrome.tabs.sendMessage(message.tabId, message)
};

chrome.runtime.onConnect.addListener(function (port) {
    var extensionListener = function (message, sender, sendResponse) {
        if (message.name == "init") {
            connections[message.tabId] = port;
            return
        } else {
            messageToContentScript(message)
        }
    }
    port.onMessage.addListener(extensionListener);
    port.onDisconnect.addListener(function (port) {
        port.onMessage.removeListener(extensionListener);
        var tabs = Object.keys(connections);
        for (var i = 0, len = tabs.length; i < len; i++) {
            if (connections[tabs[i]] == port) {
                delete connections[tabs[i]]
                break
            }
        }
    })
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if ((message.from === 'popup') && (message.subject === 'DOMInfo')) {
        sendResponse(compositeDataTracker);
    } else if (message.messagePass === 'iframe') {
        showIFrameInfo(message);
    } else if (message[0] === 'xpathInfo') {
        showInfo(message[1]);
    } else if (message.from === 'revalidation') { // flag23==="y";
        showTemp(message.display);
    } else if (message.from === 'validation') {
        sendResponse(testdata);
        // return true;
        flag23 = "y";
        testdata = '';
    } else {
        chrome.tabs.sendMessage(1, message)
        // chrome.tab.sendMessage({from: 'uploadedCode', data:message.data })
    }

    if (sender.tab) {
        if (devtoolsRegEx.test(sender.tab.url)) {
            if (message.event === "shown" || message.event === "hidden") {
                var tabId = sender.tab.id;
                if (tabId in connections) {
                    connections[tabId].postMessage(message)
                } else {}
            }
            messageToContentScript(message)
        } else {
            var tabId = sender.tab.id;
            if (tabId in connections) {
                connections[tabId].postMessage(message)
            } else {}
        }
    } else {}
    /*********************************************************************/


    /*********************************************************************/
    return !0
})
