chrome.runtime.onInstalled.addListener((function(){console.log("Extension installed")})),chrome.runtime.onMessage.addListener((function(e,n,o){"executeCode"===e.action&&console.log("Button clicked")}));