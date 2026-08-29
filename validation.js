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


document.addEventListener('DOMContentLoaded', function() {
  // Updated to use promises for Manifest V3
  chrome.runtime.sendMessage({
    from: 'validation'
  }).then(setDOMInfo).catch(function(error) {
    console.error("Error sending message:", error);
  });
});

function setDOMInfo(info) {
  _gaq.push(['_trackPageview']);
  _gaq.push(['_trackEvent', 'Validation', 'Analysis']);
  if (info.length > 0) {
    for (let i = 0; i < info.length; i++) {
      //console.log(Object.values(info[i]))
      //exclude css
      if (!Object.values(info[i])[0].includes("css")){
      addElement(Object.values(info[i])[0], Object.values(info[i])[1])
      }
    }
  } else {
    noElement()
  }
}

function noElement() {
  var contents = document.getElementById('fileContents');
  frag1 = document.createDocumentFragment();
  div = document.createElement("li");
  div.style.cssText = 'display: inline-block;vertical-align: top;';
  span = document.createElement("span");
  span.style.cssText = 'display: inline-block;color:#f2f2f2; width:400px;height:25px;font-size: 12px; text-overflow: ellipsis;white-space: nowrap;overflow: hidden;';
  span.setAttribute('type', "text");
  txt = document.createTextNode("Not a single match found for the Locators");
  span.appendChild(txt);
  frag1.appendChild(div);
  div.appendChild(span)
  contents.appendChild(frag1);
}

var no=0
function addElement(xp, count) {
  no=no+1;
  var contents = document.getElementById('fileContents');
  frag1 = document.createDocumentFragment();
  div = document.createElement("li");
  div.style.cssText = 'display: inline-block;vertical-align: top;';

  span0 = document.createElement("span");
  span0.style.cssText = 'display: inline-block;color:#f2f2f2; width:20px; height:25px;font-size: 12px; text-overflow: ellipsis;white-space: nowrap;overflow: hidden;';
  span0.setAttribute('type', "text");
  txt0 = document.createTextNode(no+". ");
  span0.appendChild(txt0);


  span = document.createElement("span");
  span.style.cssText = 'display: inline-block;color:#f2f2f2; width:400px;height:25px;font-size: 12px; text-overflow: ellipsis;white-space: nowrap;overflow: hidden;';
  span.setAttribute('type', "text");
  txt = document.createTextNode(xp);
  span.appendChild(txt);
  span1 = document.createElement("span");
  span1.setAttribute('type', "text");
  if (count == 0) {
    //console.log("0")
    img = document.createTextNode("\u2718");
    span1.style.cssText = 'display: inline-block;  background-color: #cb2431; border:1px solid #d4d2cd; vertical-align: top;'
    span1.appendChild(img);

  } else if (count == 1) {
    //console.log("1")
    img = document.createTextNode("\u2713");
    span1.style.cssText = 'display: inline-block; border:1px solid #d4d2cd;  background-color: #28a745; vertical-align: top;'
    span1.appendChild(img);
  } else if (count > 1) {
    //console.log("2")
    img = document.createTextNode("\u2713");
    span1.style.cssText = 'display: inline-block; border:1px solid #9ba028;  background-color: #f0f92f; vertical-align: top;'
    span1.appendChild(img);
  }

  frag1.appendChild(div);
  div.appendChild(span0)
  div.appendChild(span)
  div.appendChild(span1)
  contents.appendChild(frag1);
}
