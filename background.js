// background.js
chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'executeCode') {
    // Добавьте свой код, который нужно выполнить при нажатии кнопки
    console.log('Button clicked');
  }
});
