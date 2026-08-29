# Testing Guide - TruePath Manifest V3

## Quick Start

### Load the Extension
1. Open Chrome and navigate to: `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select folder: `/Users/sghosh/Desktop/TruePath_Chrome_1.0.0`
5. Extension should load without errors

### Verify Installation
✅ Check that "TruePath" appears in the extensions list  
✅ Version should show: **3.0.0**  
✅ No errors should appear (click "Errors" button to check)

## Feature Testing Checklist

### 1. Context Menu XPath Generation
- [ ] Navigate to any webpage (e.g., google.com)
- [ ] Right-click on any element
- [ ] Verify "Relative XPath" menu appears
- [ ] Click the menu to see XPath options
- [ ] Select an XPath - dialog window should open at position (100, 200)
- [ ] XPath should be displayed in the dialog

### 2. DevTools Panel
- [ ] Open Chrome DevTools (F12)
- [ ] Navigate to "Elements" tab
- [ ] Look for "TruePath" sidebar panel
- [ ] Select different elements in the DOM tree
- [ ] Verify XPath is generated in the TruePath panel

### 3. Popup File Upload (Code Analysis)
- [ ] Click the TruePath extension icon in toolbar
- [ ] Popup should open showing the interface
- [ ] Click "Choose File" and select a `.java` file with `@FindBy` annotations
- [ ] Verify "The Page Analysis has done" alert appears
- [ ] Check console for any errors

### 4. Window Popups
- [ ] Generate an XPath via context menu
- [ ] Verify dialog window opens (should be at coordinates 100, 200)
- [ ] Test copy buttons in the dialog
- [ ] Close and repeat to ensure it works consistently

### 5. Clipboard Operations
- [ ] Generate an XPath
- [ ] Click copy button in dialog
- [ ] Paste somewhere (Cmd+V) to verify XPath was copied
- [ ] Test with different XPath types (threeStar, twoStar, oneStar)

## Common Issues & Solutions

### Extension Won't Load
**Error:** "Manifest file is missing or unreadable"
- **Solution:** Ensure you selected the correct folder containing manifest.json

### Service Worker Errors
**Error:** "Service worker registration failed"
- **Solution:** Check [extension/background.js](extension/background.js) for syntax errors
- **Check:** `chrome://extensions/` → Click "service worker" link to see console

### Context Menu Not Appearing
**Error:** Menu items not showing on right-click
- **Solution:** Refresh the webpage after loading the extension
- **Check:** Go to `chrome://extensions/` and verify permissions are granted

### Window Position Issues
**Note:** Windows now open at fixed position (100, 200) instead of screen center
- This is expected behavior after removing deprecated `chrome.system.display` API
- Windows should still be visible and functional

## Console Checks

### Extension Service Worker Console
1. Go to `chrome://extensions/`
2. Find TruePath extension
3. Click "service worker" link
4. Check for any error messages

### Webpage Console
1. Open DevTools on test page (F12)
2. Go to Console tab
3. Generate XPath via right-click
4. Look for any error messages

### Expected Console Output
- ✅ "How many times main menu created truepath"
- ✅ No red error messages
- ❌ No "system.display" errors
- ❌ No "chrome.runtime.sendMessage" errors

## Manifest V3 Specific Tests

### Verify Promise-based APIs
Open DevTools console and run:
```javascript
// Should work without errors
chrome.runtime.sendMessage({test: 'ping'})
  .then(response => console.log('Promise works:', response))
  .catch(error => console.log('Expected - no handler:', error));
```

### Check Service Worker Lifecycle
1. Load extension
2. Use features (context menu, popup)
3. Wait 30 seconds (service worker may terminate)
4. Use features again
5. Features should still work (service worker restarts automatically)

## Success Criteria

All features work correctly:
- ✅ Context menus generate XPath
- ✅ DevTools panel shows XPath
- ✅ Popup file upload works
- ✅ Dialog windows open
- ✅ Copy to clipboard works
- ✅ No console errors
- ✅ Extension loads without warnings

## Reporting Issues

If you encounter issues:
1. Check `chrome://extensions/` for error messages
2. Click "Errors" button for detailed error logs
3. Check service worker console
4. Check webpage console
5. Note which feature fails and exact error message

## Next Steps

After successful testing, consider:
1. Publishing to Chrome Web Store (requires Manifest V3)
2. Adding chrome.storage for persistent data (optional enhancement)
3. Implementing better window positioning using chrome.windows API
