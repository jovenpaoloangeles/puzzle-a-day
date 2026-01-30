import { test, expect } from '@playwright/test';

test.describe('Puzzle-A-Day E2E', () => {
  test('should load the app and display the default solution', async ({ page }) => {
    // Go to the base URL
    await page.goto('/');

    // Check for the main title
    await expect(page.getByText('Puzzle-A-Day Solution')).toBeVisible();

    // Check for the "Today's Solution" text
    await expect(page.getByText("Today's Solution")).toBeVisible();

    // Check for the solution modes. Since there are 3, we expect multiple.
    // We can verify that at least one is visible.
    const solutionCounts = page.getByText('Total possible solutions:');
    await expect(solutionCounts.first()).toBeVisible();
    
    // Optionally check count is > 0
    // const countText = await solutionCounts.first().textContent();
    // expect(countText).toMatch(/Total possible solutions: \d+/);
  });

  test('should allow toggling solution modes', async ({ page }) => {
    await page.goto('/');

    // Click on "Rough Side Only"
    // Use exact: true to avoid ambiguity if possible, or get by role/heading
    await page.getByRole('heading', { name: 'Rough Side Only' }).click();
    
    // Verify interaction (e.g. check for a selected state class if implemented, 
    // or just ensure no error occurred)
    
    // Click on "Smooth Side Only"
    await page.getByRole('heading', { name: 'Smooth Side Only' }).click();
  });

  test('should allow changing the date', async ({ page }) => {
    await page.goto('/');

    // Change month to February. We need to find the select elements.
    // Header has 3 selects: Month, Day, Year.
    const selects = page.locator('header select');
    const monthSelect = selects.nth(0);
    const daySelect = selects.nth(1);

    // Select February (value '1')
    await monthSelect.selectOption({ label: 'February' });

    // Select 14th
    await daySelect.selectOption({ label: '14' });

    // Verify the page title is still there (basic check that app didn't crash)
    await expect(page.getByText('Puzzle-A-Day Solution')).toBeVisible();
  });
});