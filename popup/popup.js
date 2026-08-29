window.onload = function() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    var fileSelected = document.getElementById('txtfiletoread');
    fileSelected.addEventListener('change', function(e) {
      var fileExtension = /java.*/;
      var fileTobeRead = fileSelected.files[0];
      var fileExtensionType = fileTobeRead.name.replace(/^.*\./, '');
      if (fileExtensionType === "java") {
        var fileReader = new FileReader();
        var lines = [];
        var xpath = [];
        var webElementName = [];
        let regexp = /"[^"]+"/g;
        fileReader.onload = function(e) {
          lines = fileReader.result.split('\n');
          for (var line = 0; line < lines.length; line++) {
            if (lines[line].includes("@FindBy")) {
              xpath.push(lines[line]);
              //xpath.push(lines[line].match(regexp))
            }
            if (lines[line].includes("WebElement")) {
              if (lines[line].split("WebElement")[1] !== ';') {
                webElementName.push(lines[line].split("WebElement")[1].split(";")[0])
              }
            }
          }
          if (xpath.length > 0) {
            // Updated to use promises for Manifest V3
            chrome.tabs.query({
              active: true,
              currentWindow: true
            }).then(function(tabs) {
              return chrome.tabs.sendMessage(tabs[0].id, {
                type: "uploadedCode",
                data: xpath
              });
            }).then(function(response) {
              //alert(response)
              alert("The Page Analysis has done. No popup will display in case no matching found.")
              window.close();
            }).catch(function(error) {
              console.error("Error sending message:", error);
            });
          } else {
            alert("The java file doesn't have any locators or not following the POM Standard")
          }
        }
        fileReader.readAsText(fileTobeRead);
      } else {
        alert("Please select java file");
      }
    }, false);
  } else {
    alert("Files are not supported");
  }
}
