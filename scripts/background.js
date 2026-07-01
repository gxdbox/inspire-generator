// background.js - 灵感发生器 Service Worker
chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.tabs.sendMessage(tab.id, { type: 'togglePanel' });
  } catch (e) {
    console.log('Content script not ready');
  }
});
