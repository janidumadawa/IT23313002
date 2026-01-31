# IT23313002 - Swift Translator Automation Testing

## Quick Start Guide

### Installation
```bash
npm install
npx playwright install
```

### Run Tests
```bash
npm test                    # Run all tests
npm run test:chromium       # Chromium only
npm run test:firefox        # Firefox only
npm run test:webkit         # WebKit only
npm run test:all            # All browsers
npm run test:headed         # See browser in action
```

### View Reports
```bash
npm run report              # Open HTML report
```

Excel reports are auto-generated in `test-results/` folder.

## Test Coverage
- ✅ 25 Positive test cases
- ❌ 10 Negative test cases
- 🎨 1 UI test case
- **Total: 36 test cases**

## Project Structure
```
IT23313002/
├── tests/              # Test scripts
├── utils/              # Report generators
├── test-data.json      # All test cases
├── test-results/       # Generated reports
└── README.md           # Full documentation
```

See [README.md](README.md) for complete documentation.

---
**Student:** IT23313002 | **Course:** ITPM | **Deadline:** Feb 1, 2026
