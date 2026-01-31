# Swift Translator – Test Automation Framework

**Student ID:** IT23313002  
**Course:** IT3040 – IT Project Management (ITPM)  
**Assignment:** Assignment 1 – Software Testing & Automation  

---

## Project Overview
This project contains a test automation framework developed to evaluate the Singlish-to-Sinhala transliteration functionality of **Swift Translator**  
https://www.swifttranslator.com/

The objective of this assignment is to design and execute test cases that validate:
- Correct transliteration for valid Singlish input
- System robustness when handling invalid or mixed inputs
- Basic UI-level input constraints

---

## Test Coverage
A total of **35 test cases** are implemented as required:

- **24 Positive Functional Test Cases**  
  Validate correct transliteration of common sentences, mixed language usage, dates, numbers, and technical terms.

- **10 Negative Functional Test Cases**  
  Validate system behavior for edge cases such as:
  - URLs
  - File paths
  - Email addresses
  - Alphanumeric combinations
  - Special characters  

- **01 UI Test Case**  
  Validates that Sinhala characters are not allowed in the Singlish input field.

---

## Technology Stack
- **Language:** JavaScript  
- **Runtime:** Node.js  
- **Testing Approach:** Data-Driven Testing (DDT)  
- **Test Data Source:** `test-data.json`

---

## How to Run the Project
---
### Install Dependencies
```bash
npm install
npx playwright install

Run All Test Cases
npx playwright test

Run Tests with Browser UI
npx playwright test --headed

View Test Report
npx playwright show-report

```
---

Submission Information

Student ID: IT23313002
Module: IT3040
