import { test, expect } from '@playwright/test';

test('user logs in and sees leads page', async ({ page }) => {
  // 1. Navigate to the login page
  await page.goto('http://localhost:3000/login');

  // 2. Ensure the login form is visible
  await expect(page.locator('text=Login')).toBeVisible();

  // 3. Fill in login credentials
  await page.fill('input[data-testid="email-input"]', 'example@example.com');
  await page.fill('input[data-testid="password-input"]', 'Example!23');

  // 4. Submit the form
  await page.click('button[type="submit"]');

  // 5. Verify redirect to dashboard
  await expect(page).toHaveURL(/.*dashboard/);

  // 6. Navigate to leads page
  await page.goto('http://localhost:3000/dashboard/leads');

  // 7. Optionally verify that the leads table is visible
  await expect(page.locator('table')).toBeVisible();
});

test('unauthenticated user is redirected to login', async ({ page }) => {
  // 1. Try to access protected route
  await page.goto('http://localhost:3000/dashboard');

  // 2. Should be redirected to login
  await expect(page).toHaveURL(/.*login/);

  // 3. Ensure login page content is visible
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});
