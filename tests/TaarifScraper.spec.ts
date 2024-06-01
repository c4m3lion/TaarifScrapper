import { test, expect } from '@playwright/test';
import { BitePages } from '../shared/bite-page';

test.describe('Scrape Bite LV', () => {
  let biteTaarifData: any = [];

  test('5G taarifs', { tag: ['@internet'] }, async ({ page }) => {
    await page.goto(BitePages.taarifUrl);
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(BitePages.taarifUrl);
    await page.waitForSelector(BitePages.taarifPlanList);
    const taarifList = page.locator(BitePages.taarifPlanList);
    const taarifListLength = await taarifList.count();
    for (let i = 0; i < taarifListLength; i++) {
      const title = await taarifList.nth(i).locator(BitePages.taarifPlanItemTitle).innerText();
      const price = await taarifList.nth(i).locator(BitePages.taarifPlanItemPrice).innerText();
      biteTaarifData.push({ title, price });
    }
    test.info().annotations.push({
      type: 'Bite Taarif Plans',
      description: JSON.stringify(biteTaarifData),
    });
  });
});