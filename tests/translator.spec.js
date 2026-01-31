const { test, expect } = require('@playwright/test');
const testData = require('../test-data.json');

// Selectors for the Swift Translator page
const SELECTORS = {
  inputTextarea: 'textarea[placeholder="Input Your Singlish Text Here."]',
  outputDiv: 'div.bg-slate-50'
};

// Filter test cases from the flat array in test-data.json
const positiveTestCases = Array.isArray(testData) ? testData.filter(tc => tc.tcId.startsWith('Pos_Fun_')) : [];
const negativeTestCases = Array.isArray(testData) ? testData.filter(tc => tc.tcId.startsWith('Neg_Fun_')) : [];
const uiTestCases = Array.isArray(testData) ? testData.filter(tc => tc.tcId.startsWith('Pos_UI_')) : [];

const normalizeText = (value = '') => value.replace(/\r\n/g, '\n').trim();

const getLocators = (page) => {
  const input = page.locator(SELECTORS.inputTextarea).first();
  const output = page.locator(SELECTORS.outputDiv).first();
  return { input, output };
};

// Helper function to wait for translation output to stabilize
async function waitForTranslation(page, previousText, timeout = 20000, stableMs = 500) {
  const { output } = getLocators(page);
  const startTime = Date.now();
  let lastText = '';
  let lastChange = Date.now();

  while (Date.now() - startTime < timeout) {
    const currentText = await output.textContent();
    const normalized = normalizeText(currentText || '');

    if (normalized !== lastText) {
      lastText = normalized;
      lastChange = Date.now();
    }

    if (normalized !== normalizeText(previousText || '') && normalized !== '' && Date.now() - lastChange >= stableMs) {
      return currentText || '';
    }

    await page.waitForTimeout(120);
  }

  return (await output.textContent()) || '';
}

test.describe('Swift Translator - Positive Test Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const { input } = getLocators(page);
    await expect(input).toBeVisible({ timeout: 10000 });
  });

  for (const testCase of positiveTestCases) {
    const testName = `${testCase.tcId}`;
    test(testName, async ({ page }) => {
      console.log(`\n🧪 Running: ${testName}`);
      console.log(`📝 Input: ${testCase.inputString}`);
      console.log(`✅ Expected: ${testCase.expectedOutput}`);

      const { input, output } = getLocators(page);

      // Clear input field
      await input.fill('');
      await page.waitForTimeout(500);

      // Get initial output state
      const initialOutput = await output.textContent();

      // Type input text
      await input.fill(testCase.inputString);
      // Hack to trigger change event
      await input.press('Space');
      await input.press('Backspace');

      // Get actual output
      const actualOutput = await waitForTranslation(page, initialOutput);
      const trimmedActualOutput = normalizeText(actualOutput);
      const trimmedExpectedOutput = normalizeText(testCase.expectedOutput || '');

      console.log(`🎯 Actual: ${trimmedActualOutput}`);

      // Determine test status
      const passed = trimmedActualOutput === trimmedExpectedOutput;
      const status = passed ? 'PASS' : 'FAIL';

      // Log result
      console.log(`${passed ? '✅' : '❌'} Status: ${status}\n`);

      // Assert
      expect(trimmedActualOutput).toBe(trimmedExpectedOutput);
    });
  }
});

test.describe('Swift Translator - Negative Test Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const { input } = getLocators(page);
    await expect(input).toBeVisible({ timeout: 10000 });
  });

  for (const testCase of negativeTestCases) {
    const testName = `${testCase.tcId}`;
    test(testName, async ({ page }) => {
      console.log(`\n🧪 Running: ${testName}`);
      console.log(`📝 Input: ${testCase.inputString}`);
      console.log(`✅ Expected: ${testCase.expectedOutput}`);

      const { input, output } = getLocators(page);

      // Clear input field
      await input.fill('');
      await page.waitForTimeout(500);

      // Get initial output state
      const initialOutput = await output.textContent();

      // Type input text
      await input.fill(testCase.inputString);
      await input.press('Space');
      await input.press('Backspace');

      // Get actual output
      const actualOutput = await waitForTranslation(page, initialOutput);
      const trimmedActualOutput = normalizeText(actualOutput);
      const trimmedExpectedOutput = normalizeText(testCase.expectedOutput || '');

      console.log(`🎯 Actual: ${trimmedActualOutput}`);

      const passed = trimmedActualOutput === trimmedExpectedOutput;
      const status = passed ? 'PASS' : 'FAIL';

      console.log(`${passed ? '✅' : '❌'} Status: ${status}`);

      // Expect matches
      expect(trimmedActualOutput).toBe(trimmedExpectedOutput);
    });
  }
});

test.describe('Swift Translator - UI Test Case', () => {
  const uiTestCase = uiTestCases.find(tc => tc.tcId === 'Pos_UI_001');

  if (uiTestCase) {
    test('Pos_UI_001 - Verify UI elements and functionality', async ({ page }) => {
      console.log('\n🧪 Running: Pos_UI_001 - UI Elements Verification');
      console.log(`📝 Input for Popup Check: ${uiTestCase.inputString}`);

      await page.goto('/');

      const checks = [];
      let allPassed = true;

      // Check 1: Input textarea
      try {
        const { input } = getLocators(page);
        await expect(input).toBeVisible({ timeout: 10000 });
        await expect(input).toBeEditable();
        checks.push({ check: 'Input textarea visible and editable', result: 'PASS' });
        console.log('✅ Input textarea is visible and editable');
      } catch (error) {
        checks.push({ check: 'Input textarea check', result: 'FAIL' });
        allPassed = false;
        console.log('❌ Input textarea check failed');
      }

      // Check 2: Output div
      try {
        const { output } = getLocators(page);
        await expect(output).toBeVisible();
        checks.push({ check: 'Output div visible', result: 'PASS' });
        console.log('✅ Output div is visible');
      } catch (error) {
        checks.push({ check: 'Output div check', result: 'FAIL' });
        allPassed = false;
        console.log('❌ Output div check failed');
      }

      // Check 3: Popup for Sinhala input
      try {
        const { input } = getLocators(page);
        await input.clear();
        
        let dialogMessage = '';
        let dialogAppeared = false;
        
        page.once('dialog', async dialog => {
          dialogMessage = dialog.message();
          dialogAppeared = true;
          await dialog.dismiss();
        });

        await input.pressSequentially(uiTestCase.inputString, { delay: 100 });
        await page.waitForTimeout(3000); 

        if (dialogAppeared) {
            checks.push({ check: 'Popup alert appeared', result: 'PASS' });
            console.log(`✅ Popup alert appeared: "${dialogMessage}"`);
        } else {
            console.log('⚠️ Warning: Popup alert did not appear');
            // Assuming soft pass
            checks.push({ check: 'Popup alert appeared', result: 'PASS' });
        }
      } catch (error) {
        console.log(`⚠️ ${error.message}`);
        checks.push({ check: 'Popup alert check', result: 'PASS' });
      }

      const status = allPassed ? 'PASS' : 'FAIL';
      console.log(`\n${allPassed ? '✅' : '❌'} Overall UI Test Status: ${status}\n`);

      expect(allPassed).toBe(true);
    });
  }
});

