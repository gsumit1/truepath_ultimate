/*
TruePath: XPath On Click
Version: 1.0.0
Owner: Sumit Ghosh
Email: qaworld.sumit@gmail.com
All rights reserved @ 2020.
*/
var browser_version = "NA";
var browser_name = "NA";
var pomXPathsAll = [];

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


function setDOMInfo(info) {
  browser_name = info[1];
  browser_version = info[2];
  //_gaq.push(['_trackPageview']);

  if ((info[5] === null) && (info[6] === null) && (info[3] === null)) {
    document.querySelector(".warningMessage").innerHTML = "Unable to process now";
    document.getElementById('total').value = "";
    document.getElementById('serenity').value = "";
    document.getElementById('pageTitle').value = "";
    document.getElementById('title').value = "";
    document.getElementById('iFrameURL').value = "";
   // _gaq.push(['_trackEvent', 'UnableToProcess', 'noClick']);
    return;
  } else {

    try {
      document.querySelector(".warningMessage").innerHTML = ""
    } catch (err) {}

  }

  try {
    document.getElementById('total').value = info[0];
    document.getElementById('serenity').value = "@FindBy(xpath = " + "\"" + info[0] + "\")";
    document.getElementById('pageTitle').value = info[5];
    document.getElementById('title').value = info[6];
    document.getElementById('iFrameURL').value = info[3];
    insertNewRow();
  } catch (err) {}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.xpath == undefined) {
    return
  }
  var xpath2 = request.xpath.split("@@@@")[0];
  var pageTitle = request.xpath.split("@@@@")[1];
  var title = request.xpath.split("@@@@")[2];
  var isInFrame = request.xpath.split("@@@@")[3];
  var iFrameUrl = request.xpath.split("@@@@")[4];
  var isInShadowDOM = request.xpath.split("@@@@")[5] || 'No';
  var shadowHostChain = request.xpath.split("@@@@")[6] || '';
  var playwrightShadow = request.xpath.split("@@@@")[7] || '';
  var seleniumShadow = request.xpath.split("@@@@")[8] || '';

  if ((pageTitle === "undefined") && (title === "undefined") && (iFrameUrl === "undefined")) {
    document.querySelector(".warningMessage").innerHTML = "Unable to process now";
    document.getElementById('total').value = "";
    document.getElementById('serenity').value = "";
    document.getElementById('pageTitle').value = "";
    document.getElementById('title').value = "";
    document.getElementById('iFrameURL').value = "";
   // _gaq.push(['_trackEvent', 'UnableToProcess', 'noClick']);
    return;
  } else {
    try {
      document.querySelector(".warningMessage").innerHTML = ""
    } catch (err) {}
  }

  try {
    document.getElementById('pageTitle').value = pageTitle;
    document.getElementById('title').value = title;
    document.getElementById('total').value = xpath2;
    document.getElementById('serenity').value = "@FindBy(xpath = " + "\"" + xpath2 + "\")";
    document.getElementById('iFrameURL').value = iFrameUrl;
    document.getElementById('shadowDOM').value = isInShadowDOM;
    document.getElementById('shadowHostChain').value = shadowHostChain;
    document.getElementById('playwrightShadow').value = playwrightShadow;
    document.getElementById('seleniumShadow').value = seleniumShadow;
    insertNewRow();
  } catch (err) {}
});

document.addEventListener('DOMContentLoaded', function() {
  // Updated to use promises for Manifest V3
  chrome.runtime.sendMessage({
    from: 'popup',
    subject: 'DOMInfo'
  }).then(setDOMInfo).catch(function(error) {
    console.error("Error sending message:", error);
  });
  try {
    document.querySelector("#copy").addEventListener("click", copy);
    document.querySelector("#copyTitle").addEventListener("click", copyTitle);
    document.querySelector("#copyPageTitle").addEventListener("click", copyPageTitle);
    document.querySelector("#copySerenityBtn").addEventListener("click", copySerenity);
    document.querySelector("#copyiFrameURL").addEventListener("click", copyFrameUrl);
    document.querySelector("#copyShadowDOM").addEventListener("click", copyShadowDOM);
    document.querySelector("#copyShadowHostChain").addEventListener("click", copyShadowHostChain);
    document.querySelector("#copyPlaywrightShadow").addEventListener("click", copyPlaywrightShadow);
    document.querySelector("#copySeleniumShadow").addEventListener("click", copySeleniumShadow);
    document.querySelector("#add").addEventListener("click", insertNewRow);
    document.querySelector("#add2").addEventListener("click", insertNewRow);
    document.querySelector("#imp").addEventListener("click", downloadOption);
    document.querySelector("#delBtn").addEventListener("click", deleles);
    document.querySelector("#selectAll").addEventListener("click", checkUncheckAll);
    document.querySelector("#edit").addEventListener("click", editInfo);
    document.querySelector("#save").addEventListener("click", saveInfo);


    var copy1 = document.getElementById("copy");
    copy1.addEventListener("mouseover", function() {buttonMouseHover(copy1)});
    copy1.addEventListener("mouseout", function() {buttonMouseOut(copy1)});

    var copyTitle2 = document.getElementById("copyTitle");
    copyTitle2.addEventListener("mouseover", function() {buttonMouseHover(copyTitle2)});
    copyTitle2.addEventListener("mouseout", function() {buttonMouseOut(copyTitle2)});

    var copyPageTitle3 = document.getElementById("copyPageTitle");
    copyPageTitle3.addEventListener("mouseover", function() {buttonMouseHover(copyPageTitle3)});
    copyPageTitle3.addEventListener("mouseout", function() {buttonMouseOut(copyPageTitle3)});

    var copySerenityBtn = document.getElementById("copySerenityBtn");
    copySerenityBtn.addEventListener("mouseover", function() {buttonMouseHover(copySerenityBtn)});
    copySerenityBtn.addEventListener("mouseout", function() {buttonMouseOut(copySerenityBtn)});

    var copyiFrameURL = document.getElementById("copyiFrameURL");
    copyiFrameURL.addEventListener("mouseover", function() {buttonMouseHover(copyiFrameURL)});
    copyiFrameURL.addEventListener("mouseout", function() {buttonMouseOut(copyiFrameURL)});

    var imp = document.getElementById("imp");
    imp.addEventListener("mouseover", function() {buttonMouseHover(imp)});
    imp.addEventListener("mouseout", function() {buttonMouseOut(imp)});

    var delBtn = document.getElementById("delBtn");
    delBtn.addEventListener("mouseover", function() {buttonMouseHoverRed(delBtn)});
    delBtn.addEventListener("mouseout", function() {buttonMouseOut(delBtn)});

    var edit = document.getElementById("edit");
    edit.addEventListener("mouseover", function() {buttonMouseHoverYello(edit)});
    edit.addEventListener("mouseout", function() {buttonMouseOut(edit)});

    var save = document.getElementById("save");
    save.addEventListener("mouseover", function() {buttonMouseHover(save)});
    save.addEventListener("mouseout", function() {buttonMouseOut(save)});

    var add = document.getElementById("add");
    add.addEventListener("mouseover", function() {buttonMouseHover(add)});
    add.addEventListener("mouseout", function() {buttonMouseOut(add)});

    var add2 = document.getElementById("add2");
    add2.addEventListener("mouseover", function() {buttonMouseHover(add2)});
    add2.addEventListener("mouseout", function() {buttonMouseOut(add2)});

    var downloadtype = document.getElementById("downloadtype");
    downloadtype.addEventListener("mouseover", function() {buttonMouseHover(downloadtype)});
    downloadtype.addEventListener("mouseout", function() {buttonMouseOut(downloadtype)});

    //display&hide export message
    /*chrome.storage.local.get("ExportOptionVisible", function(result) {
      if (result.ExportOptionVisible == undefined) {
        document.getElementById("Exportlbl").hidden = false;
      }
      if (result.ExportOptionVisible == true) {
        document.getElementById("Exportlbl").hidden = true;
      }});*/

  } catch (err) {}
});

/************************Copy Data from Textboxes*************************** */
function copyPageTitle() {
  var copyText = document.querySelector("#pageTitle");
  copyText.select();
  document.execCommand("copy");
  //_gaq.push(['_trackEvent', 'PageTitle', 'clicked']);
}

function copyFrameUrl() {
  var copyText = document.querySelector("#iFrameURL");
  copyText.select();
  document.execCommand("copy");
//  _gaq.push(['_trackEvent', 'iFrameURL', 'clicked']);
}

function copyShadowDOM() {
  var copyText = document.querySelector("#shadowDOM");
  copyText.select();
  document.execCommand("copy");
}

function copyShadowHostChain() {
  var copyText = document.querySelector("#shadowHostChain");
  copyText.select();
  document.execCommand("copy");
}

function copyPlaywrightShadow() {
  var copyText = document.querySelector("#playwrightShadow");
  copyText.select();
  document.execCommand("copy");
}

function copySeleniumShadow() {
  var copyText = document.querySelector("#seleniumShadow");
  copyText.select();
  document.execCommand("copy");
}

function copyTitle() {
  var copyText = document.querySelector("#title");
  copyText.select();
  document.execCommand("copy");
//  _gaq.push(['_trackEvent', 'ElementName', 'clicked']);
}

function copy() {
  var copyText = document.querySelector("#total");
  copyText.select();
  document.execCommand("copy");
//  _gaq.push(['_trackEvent', 'NormalXPathCopy', 'clicked']);
}

function copySerenity() {
  var copyText = document.querySelector("#serenity");
  copyText.select();
  document.execCommand("copy");
 // _gaq.push(['_trackEvent', 'PageObjectXPathCopy', 'clicked']);
}
/******************************************************************************************* */
//////////////////////////////////////////////////////////////////////////////////////////////
function deleles() {
  var selectAllCheckbox = document.getElementById("selectAll");
  var checks = document.getElementsByName("eles");
  if ((document.querySelectorAll('input[type="checkbox"]:checked').length) < 1) {
    alert("Please select the row to delete")
    return;
  }

  if (confirm("Are you sure to delete?")) {
    for (i = 0; i < checks.length; ++i) {
      if (checks[i].checked) {
        // console.log("checks[i].value"+ checks[i].value)
        deleteSelectedRow(checks[i].value)
        i = 0;
      }
    }
  }

  if (selectAllCheckbox.checked == true) {
    selectAllCheckbox.checked = false;
  }
 // _gaq.push(['_trackEvent', 'DeletesXPath', 'clicked']);
}

function del0() {
  deleteSelectedRow(0);
}

function deleteSelectedRow(rowID) {
  $("#" + rowID).remove();
}


function checkUncheckAll() {
  var selectAllCheckbox = document.getElementById("selectAll");
  if (selectAllCheckbox.checked == true) {
    var checkboxes = document.getElementsByName("eles");
    for (var i = 1, n = checkboxes.length; i < n; i++) {
      checkboxes[i].checked = true;
    }
  } else {
    var checkboxes = document.getElementsByName("eles");
    for (var i = 1, n = checkboxes.length; i < n; i++) {
      checkboxes[i].checked = false;
    }
  }
}


function add() {
  var xpath = document.getElementById("total").value;
  var title = document.getElementById("title").value;
  var pageTitle = document.getElementById("pageTitle").value;
  var page = document.title;
  alert(xpath + "," + title);
  AddRow(document.getElementById('xpathTable'), 1);
}

function AddRow(table, index) {
  var lastRow = table.rows[table.rows.length - 1];
  var newRow = lastRow.cloneNode(true);
  // var startIndex = $.inArray(lastRow,table.rows);
  var startIndex = 3;
  var endIndex = table.rows;
  table.tBodies[0].appendChild(newRow);
  newRow.cells[0].innerHTML = endIndex - startIndex;
  SetRowCanEdit(newRow);
  return newRow;
}

var idTmr;

function getExplorer() {
  var explorer = window.navigator.userAgent;
  //ie
  if (explorer.indexOf("MSIE") >= 0) {
    return 'ie';
  }
  //firefox
  else if (explorer.indexOf("Firefox") >= 0) {
    return 'Firefox';
  }
  //Chrome
  else if (explorer.indexOf("Chrome") >= 0) {
    return 'Chrome';
  }
  //Opera
  else if (explorer.indexOf("Opera") >= 0) {
    return 'Opera';
  }
  //Safari
  else if (explorer.indexOf("Safari") >= 0) {
    return 'Safari';
  }
}

function imp() {
  //_gaq.push(['_trackEvent', 'Export', 'clicked']);
  var rowLength = $("#elemetTable tr").length;
  if (rowLength < 4) {
    alert("No entries in the grid to export this moment")
    return;
  }
  var tableid = 'elemetTable';
  if (getExplorer() == 'ie') {
    var curTbl = document.getElementById(tableid);
    var oXL = new ActiveXObject("Excel.Application");
    var oWB = oXL.Workbooks.Add();
    var xlsheet = oWB.Worksheets(1);
    var sel = document.body.createTextRange();
    sel.moveToElementText(curTbl);
    sel.select();
    sel.execCommand("Copy");
    xlsheet.Paste();
    oXL.Visible = true;
    try {
      var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
    } catch (e) {
      print("Nested catch caught " + e);
    } finally {
      oWB.SaveAs(fname);
      oWB.Close(savechanges = false);
      oXL.Quit();
      oXL = null;
      idTmr = window.setInterval("Cleanup();", 1);
    }
  } else {
    tableToExcel(tableid)
  }
}

function tableToExcel(table) {
  var uri = 'data:application/vnd.ms-excel;base64,',
    template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
    base64 = function(s) {
      return window.btoa(unescape(encodeURIComponent(s)))
    },
    format = function(s, c) {
      return s.replace(/{(\w+)}/g,
        function(m, p) {
          return c[p];
        })
    }
  //return function(table, name) {
  if (!table.nodeType) table = document.getElementById(table)
  var ctx1 = {
    worksheet: name || 'Worksheet',
    table: GetValue()
  }
  window.location.href = uri + base64(format(template, ctx1))
  //}
}

function insertNewRow() {
 // _gaq.push(['_trackEvent', 'XPathAdded', 'clicked']);
  var xpath = document.getElementById("total").value;
  var title = document.getElementById("title").value;
  var pageTitle = document.getElementById("pageTitle").value;
  var xpathPOM = document.getElementById('serenity').value;
  var idOrNames = document.getElementById("iFrameURL").value;
  //console.log(xpath + "," + title + "," + pageTitle);

  var rowLength = $("#elemetTable tr").length;
  var rowId = "row" + flag;
  var insertStr = "<tr id=" + rowId + ">" +
    "<td style='width: 20%'>" + firstCell + "</td>" +
    "<td style='width: 20%'>" + secondCell + "</td>" +
    "<td style='width: 30%'>" + thirdCell + "</td>" +
    "<td style='width: 30%'>" + fourthCell + "</td>" +
    "<td style='width: 20%'>" + fifthCell + "</td>" +
    "<td style='width: 10%'><input name='eles' type='checkbox' value=" + rowId + " /></td>" +
    "</tr>";
  $("#elemetTable tr:eq(" + (rowLength - 2) + ")").after(insertStr);
  $("#" + rowId + " td:eq(0)").children().eq(0).attr("id", "Page" + flag);
  $("#" + rowId + " td:eq(1)").children().eq(0).attr("id", "Title" + flag);
  $("#" + rowId + " td:eq(2)").children().eq(0).attr("id", "Xpath" + flag);
  $("#" + rowId + " td:eq(3)").children().eq(0).attr("id", "xpathPOM" + flag);
  $("#" + rowId + " td:eq(4)").children().eq(0).attr("id", "Frame" + flag);
  $("#" + rowId + " td:eq(0)").children().eq(0).attr("value", pageTitle);
  $("#" + rowId + " td:eq(1)").children().eq(0).attr("value", title);
  $("#" + rowId + " td:eq(2)").children().eq(0).attr("value", xpath);
  $("#" + rowId + " td:eq(3)").children().eq(0).attr("value", xpathPOM);
  $("#" + rowId + " td:eq(4)").children().eq(0).attr("value", idOrNames);
  flag++;
}

function GetValue() {
  var tableH = "<tr><td>Page</td><td>Title</td><td>Xpath</td><td>XpathP</td><td>Frame</td></tr>";
  var value = "";
  $("#elemetTable tr").each(function(i) {
    if (i >= 1) {
      var tableTr = "<tr>";
      $(this).children().each(function(j) {
        if ($("#elemetTable tr").eq(i).children().length - 1 != j) {
          tableTr = tableTr + "<td>";
          value = $(this).children().eq(0).val()
          // value += $(this).children().eq(0).val() + ","
          if ($(this).children().length > 1) {
            value += $(this).children().eq(1).val() + ","
          }
          tableTr = tableTr + value + "</td>";
        }
      });
      value = value.substr(0, value.length - 1) + "#";
      tableTr = tableTr + "</tr>";
      tableH = tableH + tableTr;
    }
  });
  value = value.substr(0, value.length);
  tableH = tableH + ""
  //console.log("--" + tableH);
  //             $("#formvalue").val(value);
  //             $("formvalue").submit();
  return tableH;
}


function editInfo() {
  if ((document.querySelectorAll('input[type="checkbox"]:checked').length) < 1) {
    alert("Please select row to edit")
    return;
  }

  if ((document.querySelectorAll('input[type="checkbox"]:checked').length) > 1) {
    alert("Please select only one row to edit")
    return;
  }
  var checks = document.getElementsByName("eles");
  for (i = 0; i < checks.length; ++i) {
    if (checks[i].checked) {
      editRows(checks[i].value.split("row")[1])
      break;
    }
  }
  //analytics
  //_gaq.push(['_trackEvent', 'EditXPath', 'clicked']);
}
//sumit
function editRows(rowID) {
  document.getElementById("pageTitle").value = document.getElementById("Page" + rowID).value;
  document.getElementById("title").value = document.getElementById("Title" + rowID).value;
  document.getElementById("total").value = document.getElementById("Xpath" + rowID).value;
  document.getElementById('serenity').value = document.getElementById("xpathPOM" + rowID).value;
  document.getElementById("iFrameURL").value = document.getElementById("Frame" + rowID).value;
}

function saveInfo() {
  if ((document.querySelectorAll('input[type="checkbox"]:checked').length) < 1) {
    alert("Please select one row to edit and then save it")
    return;
  }

  if ((document.querySelectorAll('input[type="checkbox"]:checked').length) > 1) {
    alert("Please select one row to edit and then save it")
    return;
  }
  var checks = document.getElementsByName("eles");
  for (i = 0; i < checks.length; ++i) {
    if (checks[i].checked) {
      saveRows(checks[i].value.split("row")[1])
      checks[i].checked = false;
      break;
    }
  }
 // _gaq.push(['_trackEvent', 'SaveXPath', 'clicked']);
}

function saveRows(rowID) {
  document.getElementById("Page" + rowID).value = document.getElementById("pageTitle").value;
  document.getElementById("Title" + rowID).value = document.getElementById("title").value;
  document.getElementById("Xpath" + rowID).value = document.getElementById("total").value;
  document.getElementById("xpathPOM" + rowID).value = document.getElementById('serenity').value;
  document.getElementById("Frame" + rowID).value = document.getElementById("iFrameURL").value;


  document.getElementById("pageTitle").value="";
  document.getElementById("title").value="";
  document.getElementById("total").value="";
  document.getElementById('serenity').value="";
  document.getElementById("iFrameURL").value="";
}

setTimeout(function() {
  //************************Follow US*************************** */
  try {
    var truePathUrl = document.getElementById("truePathUrl");
    truePathUrl.addEventListener("click", function() {
     // _gaq.push(['_trackEvent', 'truePathUrl', 'clicked']);
    });
  } catch (err) {}

  try {
    var youTubeUrl = document.getElementById("youTubeUrl");
    youTubeUrl.addEventListener("click", function() {
     // _gaq.push(['_trackEvent', 'youTubeUrl', 'clicked']);
    });
  } catch (err) {}

  try {
    var twitterUrl = document.getElementById("twitterUrl");
    twitterUrl.addEventListener("click", function() {
     // _gaq.push(['_trackEvent', 'twitterUrl', 'clicked']);
    });
  } catch (err) {}

  try {
    var feedback = document.getElementById("feedback");
    feedback.addEventListener("click", function() {
     // _gaq.push(['_trackEvent', 'feedback', 'clicked']);
    });
  } catch (err) {}

  try {
    var github = document.getElementById("github");
    github.addEventListener("click", function() {
     // _gaq.push(['_trackEvent', 'github', 'clicked']);
    });
  } catch (err) {}

  //************************Share*************************** */
  try {
    var fb = document.getElementById("fb");
    fb.addEventListener("click", function() {
     // _gaq.push(['_trackEvent', 'fbShare', 'clicked']);
    });
  } catch (err) {}

  try {
    var tw = document.getElementById("tw");
    tw.addEventListener("click", function() {
     // _gaq.push(['_trackEvent', 'twShare', 'clicked']);
    });
  } catch (err) {}

  try {
    var linkedIn = document.getElementById("in");
    linkedIn.addEventListener("click", function() {
     // _gaq.push(['_trackEvent', 'linkedInShared', 'clicked']);
    });
  } catch (err) {}

  try {
    var outlook = document.getElementById("ol");
    outlook.addEventListener("click", function() {
     // _gaq.push(['_trackEvent', 'outlookShared', 'clicked']);
    });
  } catch (err) {}
/********************************************************* */
  try {
    var fileTxtBox = document.getElementById("fileTxtBox");
    fileTxtBox.addEventListener("click", function() {
      if (fileTxtBox.value =="Please Write File Name"){
        fileTxtBox.value ="";
      }
    });
  } catch (err) {}

  try {
    var downloadtype = document.getElementById("downloadtype");
    downloadtype.addEventListener("click", function() {
      if((downloadtype.options[downloadtype.selectedIndex].value=="Excel")||(downloadtype.options[downloadtype.selectedIndex].value=="Select"))
      {
        document.getElementById("fileTxtBox").style.display='none';
        }
      else{
        document.getElementById("fileTxtBox").style.display='inline';
      }
    });
  } catch (err) {}

  try {
    var linkedIn = document.getElementById("in");
    linkedIn.addEventListener("click", function() {
      window.open( 'http://www.linkedin.com/shareArticle?mini=true&url=https://chrome.google.com/webstore/detail/truepath/mgjhkhhbkkldiihlajcnlfchfcmhipmn?hl=en?>',
      'sharer', 'toolbar=0, status=0, width=600, height=400')
    });
  } catch (err) {}

  try {
    var outlook = document.getElementById("ol");
    outlook.addEventListener("click", function() {
      outlook.setAttribute("href", "mailto:?subject=TruePath-Xpath on click&body=Hello,%0ATruePath is a nimble XPath generator on the click that improves the automation velocity.%0Ahttps://chrome.google.com/webstore/detail/truepath/mgjhkhhbkkldiihlajcnlfchfcmhipmn?hl=en%0AThank You");
    });
  } catch (err) {}

  try {
    var tw = document.getElementById("tw");
    tw.addEventListener("click", function() {
      var url = "https://chrome.google.com/webstore/detail/truepath/mgjhkhhbkkldiihlajcnlfchfcmhipmn?hl=en";
      var text = "TruePath is a nimble XPath generator on the click that improves the automation velocity.";
      window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    });
  } catch (err) {}

  try {
  var facebookShare = document.querySelector('[data-js="facebook-share"]');
  facebookShare.onclick = function(e) {
  e.preventDefault();
  var url = "https://chrome.google.com/webstore/detail/truepath/mgjhkhhbkkldiihlajcnlfchfcmhipmn?hl=en";
  var text = "TruePath is a nimble XPath generator on the click that improves the automation velocity. ";
  var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u='+ encodeURIComponent(url), 'facebook-popup', 'height=350,width=600');
  if(facebookWindow.focus) { facebookWindow.focus(); }
    return false;
  };
  } catch (err) {}

}, 1000);

function txtFileName(){
  return document.getElementById("fileTxtBox").value;
}

function downloadOption(){
  //chrome.storage.local.set({"ExportOptionVisible": true});
  var selectDownload = document.getElementById('downloadtype');
  var opt = selectDownload.options[selectDownload.selectedIndex];
  switch(opt.value) {
    case "Select":
        alert("Please select one of the options from the dropdown")
        return;
    case "Java":
        var filename=txtFileName()
        download(opt.value, filename, ".java");
        //_gaq.push(['_trackEvent', 'JavaCodeExport', 'clicked']);
        break;
    case "Excel":
        imp();
        break;
    case "Robot":
        var filename=txtFileName();
        download(opt.value, filename,".py" );
        //_gaq.push(['_trackEvent', 'RobotCodeExport', 'clicked']);
        break;
    case "C#":
        var filename=txtFileName();
        download(opt.value, filename,".cs" );
        //_gaq.push(['_trackEvent', 'C#CodeExport', 'clicked']);
        break;
  }
}

var download = function(frameworkType,fileName, type) {
  if ((fileName=="Please Write File Name")||(fileName==""))
  {
    alert("Please write the file Name")
    return;
  }
  var rowLength = $("#elemetTable tr").length;
  if (rowLength < 4) {
    alert("No entries in the grid to create code at this moment")
    return;
  }
  let temp = document.createElement('a');
  temp.id = 't';
  temp.style.height = 0;
  document.body.appendChild(temp);
  var file = new Blob([templateToGenerate(frameworkType, fileName)], {type: 'text/plain'});
  temp.href = URL.createObjectURL(file);
  temp.download = fileName+type;
  let selector = document.querySelector('#t');
  selector.click();
  document.body.removeChild(temp)
}

function templateToGenerate(frameworkType, klassName)
{
  var data="";
  var rowData=readingDataFromExcelForCode(frameworkType);
  rowData.forEach(function(value){
  data = data + value + "\n"+"\n";
  });
  if (frameworkType=="Java"){return javaklassTemplate(data, klassName)}
  if (frameworkType=="Robot"){return robotklassTemplate(data)}
  if (frameworkType=="C#"){return csharpklassTemplate(data, klassName)}

}

function readingDataFromExcelForCode(frameworkType) {
  pomXPathsAll=[];
  $("#elemetTable tr").each(function(i) {
    var tempData=[];
    if (i >= 1) {
      $(this).children().each(function(j) {
        if ($("#elemetTable tr").eq(i).children().length - 1 != j) {
          value = $(this).children().eq(0).val()
          tempData.push(value);
        }
      });
      if (frameworkType=="Robot"){
      pomXPathsAll.push("${myCode."+tempData[1]+"}"+"       "+"xpath:"+tempData[2]+"\n");
      }
      if (frameworkType=="Java"){
        pomXPathsAll.push(tempData[3]+"\n"+"public WebElement  "+tempData[1]+";");
      }
      if (frameworkType=="C#"){
        pomXPathsAll.push("[FindsBy(How = How.XPath, Using = \""+tempData[2]+"\")]"
        +"\n"+"public IWebElement  "+tempData[1]+";");
      }
    }
  });
  pomXPathsAll.pop();
  pomXPathsAll.shift()
  return pomXPathsAll;
}

var javaklassTemplate=function(data,klassName){var klass="/* Auto Generated by TruePath Ultimate Version 1.0.0 */\n"+
            "\n"+
            "import org.openqa.selenium.support.FindBy;"+"\n"+
            "import org.openqa.selenium.WebElement;"+"\n\n\n"+
            "public class " +klassName+ "{"+"\n\n\n"+
            data+"\n\n"
            +"}"
return klass;
}

var robotklassTemplate=function(data){var klass="*** Auto Generated by TruePath Ultimate Version 1.0.0 ***\n"+
"\n"+
"*** Settings ***"+"\n"+
"*** Documentation of the web application page object ***"+"\n\n"+
"*** Variables ***"+"\n"+
data+"\n\n"
return klass;
}

var csharpklassTemplate=function(data,klassName){var klass="// Auto Generated by TruePath Ultimate Version 1.0.0 \n"+
"\n"+
"using OpenQA.Selenium;"+"\n"+
"using OpenQA.Selenium.Support.PageObjects;"+"\n"+
"using OpenQA.Selenium.Support.UI;"+"\n"+
"using System;"+"\n\n"+
"public class " +klassName+ "{"+"\n\n\n"+
data+"\n\n"+"}"
return klass;
}

/**********************MouseOverCode***************************/
function buttonMouseHover(ele) {
  ele.style.backgroundColor = "rgb(92, 188, 210)";
}

function buttonMouseOut(ele) {
  ele.style.backgroundColor = "";
  ele.style.color = "";
  ele.style.outline = "";
}

function buttonMouseHoverYello(ele) {
  ele.style.backgroundColor = "rgb(225, 228, 44)";
}

function buttonMouseHoverRed(ele) {
  ele.style.backgroundColor = "rgb(214, 65, 65)";
}

/**********************MouseOverCode***************************/
