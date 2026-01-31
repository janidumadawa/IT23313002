# Swift Translator Test Automation Framework
**Student ID: IT23313002**  
**Course: IT Project Management (ITPM)**  
**Assignment: Automation Testing Project**

---

## 📋 Project Overview

This project is an automated testing framework for **Swift Translator** (swifttranslator.com), designed to validate the accuracy of Singlish-to-Sinhala text conversion and UI stability using Playwright.

### Test Coverage
- ✅ **25 Positive Test Cases** - Valid Singlish inputs with expected Sinhala outputs
- ❌ **10 Negative Test Cases** - Edge cases (numbers, special chars, URLs, file paths, etc.)
- 🎨 **1 UI Test Case** - UI element presence and functionality validation

**Total: 36 Test Cases**

---

## 🛠️ Technology Stack

- **Testing Framework:** Playwright (JavaScript/Node.js)
- **Programming Language:** JavaScript
- **Reporting:** Excel (XLSX), JSON, HTML
- **Browsers:** Chromium, Firefox, WebKit

---

## 📁 Project Structure

```
IT23313002/
├── tests/
│   └── translator.spec.js          # Main test suite
├── utils/
│   └── reportGenerator.js          # Excel/JSON report generation
├── test-data.json                  # Test cases with inputs and expected outputs
├── test-results/                   # Generated reports and screenshots
├── playwright.config.js            # Playwright configuration
├── package.json                    # Project dependencies
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Git** (optional for cloning)

### Step 1: Install Dependencies

```bash
# Navigate to project directory
cd IT23313002

# Install Node.js dependencies
npm install

# Install Playwright browsers
npx playwright install
```

This will install:
- Playwright test framework
- XLSX library for Excel reports
- Chromium, Firefox, and WebKit browsers

---

## ▶️ Running Tests

### Run All Tests (Chromium only)
```bash
npm test
```

### Run Tests on Specific Browser
```bash
# Chromium
npm run test:chromium

# Firefox
npm run test:firefox

# WebKit (Safari)
npm run test:webkit
```

### Run Tests on All Browsers
```bash
npm run test:all
```

### Run Tests in Headed Mode (see browser)
```bash
npm run test:headed
```

---

## 📊 Test Reports

After test execution, reports are automatically generated in the `test-results/` folder:

### 1. **Excel Report**
- **File:** `IT23313002_Test_Results_YYYY-MM-DD.xlsx`
- **Contains:**
  - Test Results sheet with all test cases
  - Summary sheet with pass/fail statistics
  - Columns: TC ID, Category, Length Type, Description, Input, Expected Output, Actual Output, Status, Browser, Issue Type

### 2. **HTML Report**
```bash
npm run report
```
Opens Playwright's interactive HTML report in your browser.

### 3. **JSON Report**
- **File:** `test-results/results.json`
- Machine-readable format for integration with other tools

---

## 🧪 Test Case Categories

### Positive Test Cases (25 tests)
Tests valid Singlish inputs that should correctly transliterate to Sinhala:
- **Short (S):** Single words (e.g., "mama" → "මම")
- **Medium (M):** Phrases and sentences (e.g., "mama iskole yanne" → "මම ඉස්කෝලේ යන්නේ")
- **Long (L):** Complex sentences with multiple clauses

### Negative Test Cases (10 tests)
Tests edge cases that should NOT transliterate or should fail gracefully:
- Pure numbers (123456)
- Special characters (!@#$%^)
- File names (document.pdf)
- Email addresses (user@email.com)
- URLs (https://example.com)
- Empty input
- File paths (C:\Users\Documents)
- SQL queries
- Phone numbers (+94771234567)
- Mixed content with technical terms

### UI Test Case (1 test)
Validates UI functionality:
- Input textarea visibility and editability
- Output div visibility
- Placeholder text accuracy
- Real-time translation functionality
- Page load without errors

---

## 🔍 Test Selectors

The framework uses the following CSS selectors:

| Element | Selector |
|---------|----------|
| Input Textarea | `textarea[placeholder="Input Your Singlish Text Here."]` |
| Output Div | `div.bg-slate-50` |

---

## 📈 Expected Results

### Pass Criteria
- **Positive Tests:** Actual output matches expected Sinhala text
- **Negative Tests:** Output remains unchanged OR partial transliteration is documented
- **UI Test:** All 5 UI checks pass successfully

### Fail Criteria
- Output mismatch for positive tests
- Unexpected transliteration for negative tests
- UI elements missing or non-functional

---

## 🐛 Troubleshooting

### Issue: Tests fail with timeout
**Solution:** Increase timeout in `playwright.config.js`:
```javascript
timeout: 90000, // 90 seconds
```

### Issue: Browsers not installed
**Solution:** Run:
```bash
npx playwright install
```

### Issue: Cannot find module 'xlsx'
**Solution:** Reinstall dependencies:
```bash
npm install
```

### Issue: Site blocked or slow
**Solution:** Check internet connection and ensure swifttranslator.com is accessible.

---

## 📦 Submission Checklist

- [x] All 36 test cases implemented (25 Pos + 10 Neg + 1 UI)
- [x] Data-driven approach using JSON
- [x] Real-time translation handling
- [x] Cross-browser testing (Chromium, Firefox, WebKit)
- [x] Excel report generation
- [x] Public Git repository
- [x] README with installation and execution instructions
- [x] Files renamed with IT23313002
- [ ] Final test execution and validation
- [ ] Zip folder for submission

---

## 📝 Notes

1. **Real-Time Translation:** The framework waits for the output div to update after typing, accounting for the site's real-time processing.

2. **Soft Assertions:** Negative tests use soft assertions to document behavior rather than fail immediately, allowing complete test suite execution.

3. **Browser Compatibility:** Tests run on all three major browser engines to ensure cross-platform reliability.

4. **Reporting:** Reports include detailed information about each test case, including issue types for failed tests.

---

## 👨‍💻 Author

**Student ID:** IT23313002  
**Institution:** SLIIT  
**Course:** IT Project Management (ITPM) - Y3 Semester 2  
**Submission Date:** February 1, 2026

---

## 📄 License

This project is created for academic purposes as part of the ITPM assignment.

---

## 🙏 Acknowledgments

- Swift Translator (swifttranslator.com) for providing the translation service
- Playwright team for the excellent testing framework
- Course instructors for guidance and support

---

**Last Updated:** January 31, 2026
