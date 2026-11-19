import { expect, test } from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Les teves tasques' }),
  ).toBeVisible();
  await expect(page.getByText('Preparar classe Ionic')).toBeVisible();
});
