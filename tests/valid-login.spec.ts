import { test, expect } from '@playwright/test';

// Test Case 1: Valid Login
test('Verify Login with valid credentials', async ({ page }) => {
  // 1. OrangeHRM demo website par jana
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // 2. Valid username aur password enter karna
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');

  // 3. Login button par click karna
  await page.locator('button[type="submit"]').click();

  // 4. Dashboard URL verify karna
  await expect(page).toHaveURL(/.*dashboard/);
});

// Test Case 2: Invalid Login
test('Verify login fails with invalid credentials', async ({ page }) => {
  // 1. OrangeHRM demo website par jana
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // 2. Invalid username aur password enter karna
  await page.locator('input[name="username"]').fill('WrongAdmin');
  await page.locator('input[name="password"]').fill('wrong123');

  // 3. Login button par click karna
  await page.locator('button[type="submit"]').click();

  // 4. Error message verify karna
  const errorMessage = page.locator('.oxd-alert-content-text');
  await expect(errorMessage).toBeVisible({timeout: 10000});
  await expect(errorMessage).toContainText('Invalid credentials');
});