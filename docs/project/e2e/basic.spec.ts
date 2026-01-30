import { test, expect } from '@playwright/test';

test.describe('Puzzle-A-Day E2E', () => {
  test('should load the app and display the default solution', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Puzzle-A-Day Solution')).toBeVisible();
    await expect(page.getByText("Today's Solution")).toBeVisible();

    const solutionCounts = page.getByText('Total possible solutions:');
    await expect(solutionCounts.first()).toBeVisible();
  });

  test('should allow toggling solution modes', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('heading', { name: 'Rough Side Only' }).click();
    await page.getByRole('heading', { name: 'Smooth Side Only' }).click();
  });

  test('should allow changing the date', async ({ page }) => {
    await page.goto('/');

    const selects = page.locator('header select');
    const monthSelect = selects.nth(0);
    const daySelect = selects.nth(1);

    await monthSelect.selectOption({ label: 'February' });
    await daySelect.selectOption({ label: '14' });

    await expect(page.getByText('Puzzle-A-Day Solution')).toBeVisible();
  });

  test('should render puzzle pieces on the board', async ({ page }) => {
    await page.goto('/');
    
    // Check that we have puzzle pieces rendered.
    // Based on PuzzlePiece.tsx, they are divs with specific styles.
    // We can check for the existence of the grid container and some children.
    const board = page.locator('.grid.grid-cols-5.grid-rows-5');
    await expect(board).toBeVisible();
    
    // Check that there are children (pieces)
    const pieces = board.locator('> div');
    expect(await pieces.count()).toBeGreaterThan(0);
  });
});
