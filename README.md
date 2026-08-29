# TruePath Ultimate

**TruePath Ultimate** is a Chrome extension that generates relative XPath, scripts, and analyzes code on click. Perfect for test automation engineers and web developers.

## 🚀 Features

- ✅ **XPath Generation on Click** - Right-click any element to generate relative XPath
- ✅ **DevTools Integration** - Dedicated panel in Chrome DevTools for XPath generation
- ✅ **Code Analysis** - Upload Java page object files to analyze locators
- ✅ **Multiple XPath Strategies** - Generate XPath with different attributes (id, class, name, index)
- ✅ **Clipboard Support** - One-click copy XPath to clipboard
- ✅ **iFrame Support** - Detect and handle elements inside iframes
- ✅ **Page Object Model** - Auto-generate POM code for Java, C#, and Robot Framework

## 📋 Requirements

- Chrome Browser (Manifest V3 compatible)
- Developer mode enabled for unpacked extensions

## 🛠️ Installation

### For Chrome (Local Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/gsumit1/truepath_ultimate.git
   cd truepath_ultimate
   ```

2. Open Chrome and navigate to:
   ```
   chrome://extensions/
   ```

3. Enable **Developer mode** (toggle in top-right corner)

4. Click **Load unpacked**

5. Select the cloned repository folder

6. The extension should now be installed and ready to use!

### For Production Use

Install from the Chrome Web Store (coming soon)

## 📖 Usage

### Generate XPath via Context Menu

1. Navigate to any webpage
2. Right-click on any element
3. Select **"Relative XPath"** from the context menu
4. Choose from the generated XPath options
5. XPath is copied to clipboard automatically

### Using DevTools Panel

1. Open Chrome DevTools (F12 or Right-click → Inspect)
2. Go to **Elements** tab
3. Look for **TruePath** sidebar panel
4. Select elements in the DOM tree
5. XPath appears automatically in the TruePath panel

### Code Analysis Feature

1. Click the TruePath extension icon in Chrome toolbar
2. Click **"Choose File"** and select a `.java` file
3. The extension analyzes `@FindBy` annotations
4. Results show which locators are found/not found on the page

## 🏗️ Architecture

- **Manifest V3** - Latest Chrome extension manifest version
- **Service Worker** - Event-driven background script
- **Content Scripts** - Injected into web pages for XPath generation
- **DevTools Integration** - Custom panel for advanced features

## 📁 Project Structure

```
TruePath_Chrome_1.0.0/
├── manifest.json              # Extension manifest (V3)
├── extension/
│   └── background.js         # Service worker
├── content-script/
│   ├── content.js           # XPath generation logic
│   ├── contentScript1.js    # Element detection
│   └── contentScript2.js    # Additional handlers
├── devtools-panel/
│   ├── devtools.html        # DevTools panel entry
│   ├── devtools.js          # Panel initialization
│   └── devtools-script.js   # Panel logic
├── popup/
│   ├── TruePath.html        # Extension popup UI
│   └── popup.js             # Popup logic
├── icons/                    # Extension icons
└── styles.css               # Shared styles
```

## 🔄 Manifest V3 Migration

This extension has been fully migrated to Manifest V3. Key changes:

- ✅ Service worker instead of background pages
- ✅ Promise-based APIs
- ✅ Separated `host_permissions` from `permissions`
- ✅ Removed deprecated APIs (`chrome.system.display`)
- ✅ Added `web_accessible_resources`

See [MANIFEST_V3_MIGRATION.md](MANIFEST_V3_MIGRATION.md) for detailed migration notes.

## 🧪 Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for comprehensive testing instructions.

## 📝 Version History

### Version 3.0.0 (Current)
- ✅ Full Manifest V3 compliance
- ✅ Promise-based Chrome APIs
- ✅ Removed deprecated APIs
- ✅ Enhanced error handling

### Version 1.0.0
- Initial release with Manifest V2

## 👨‍💻 Author

**Sumit Ghosh**  
- Email: qaworld.sumit@gmail.com
- Twitter: [@Sumit_fresh](https://twitter.com/Sumit_fresh)
- GitHub: [@gsumit1](https://github.com/gsumit1)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

All rights reserved @ 2020-2026 Sumit Ghosh

## 🐛 Issues

Found a bug? Please report it on the [Issues page](https://github.com/gsumit1/truepath_ultimate/issues)

## 📺 Video Tutorial

Watch the tutorial on YouTube: [TruePath Demo](https://youtu.be/YOCCTdBZb6E)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

## 🔗 Links

- [Homepage](https://qaworld.ga/truepath)
- [Chrome Web Store](https://chrome.google.com/webstore/detail/truepath/mgjhkhhbkkldiihlajcnlfchfcmhipmn)
- [GitHub Issues](https://github.com/gsumit1/TruePath/issues)
