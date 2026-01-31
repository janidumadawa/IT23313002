/**
 * IT23313002 - Submission Preparation Script
 * This script helps prepare the project for final submission
 */

const fs = require('fs');
const path = require('path');

console.log('📦 IT23313002 - Submission Preparation\n');
console.log('=' .repeat(50));

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'playwright.config.js',
  'test-data.json',
  'tests/translator.spec.js',
  'utils/reportGenerator.js',
  'README.md',
  '.gitignore'
];

console.log('\n✅ Checking required files...\n');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`  ${exists ? '✓' : '✗'} ${file}`);
  if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing!');
  process.exit(1);
}

console.log('\n✅ All required files present!');

// Check test data
console.log('\n📊 Checking test data...\n');
const testData = require('./test-data.json');

const posCount = testData.positiveTestCases.length;
const negCount = testData.negativeTestCases.length;
const hasUI = testData.uiTestCase ? 1 : 0;
const total = posCount + negCount + hasUI;

console.log(`  Positive Tests: ${posCount} (Required: 24+) ${posCount >= 24 ? '✓' : '✗'}`);
console.log(`  Negative Tests: ${negCount} (Required: 10+) ${negCount >= 10 ? '✓' : '✗'}`);
console.log(`  UI Tests: ${hasUI} (Required: 1) ${hasUI >= 1 ? '✓' : '✗'}`);
console.log(`  Total Tests: ${total}`);

if (posCount < 24 || negCount < 10 || hasUI < 1) {
  console.log('\n⚠️  Warning: Test count requirements not met!');
}

// Pre-submission checklist
console.log('\n📋 Pre-Submission Checklist:\n');
console.log('  [ ] Run: npm install');
console.log('  [ ] Run: npx playwright install');
console.log('  [ ] Run: npm test');
console.log('  [ ] Check test results in test-results/ folder');
console.log('  [ ] Review Excel report');
console.log('  [ ] Ensure Git repository is public');
console.log('  [ ] Push all files to Git');
console.log('  [ ] Verify README is complete');
console.log('  [ ] Create zip file: IT23313002.zip');
console.log('  [ ] Upload to Course Web');

console.log('\n' + '='.repeat(50));
console.log('\n🎯 To run tests:\n');
console.log('   npm install');
console.log('   npx playwright install');
console.log('   npm test\n');

console.log('📄 Good luck with your submission!\n');
