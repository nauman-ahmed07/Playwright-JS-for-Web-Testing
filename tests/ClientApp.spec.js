const { test, expect } = require('@playwright/test');

test('Client App Login', async ({ page }) => {

  const productName = 'ZARA COAT 3';

  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  await page.fill('#userEmail', 'nauman.ahmed07.na@gmail.com');
  await page.fill('#userPassword', 'Password123');

  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.click('#login'),
  ]);

  await page.locator('.card-body b').first().waitFor({ timeout: 15000 });

  const products = page.locator('.card-body');
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const title = await products.nth(i).locator('b').textContent();
    if (title === productName) {
      await products.nth(i).locator('text= Add To Cart').click();
      break;
    }
  }
  await page.locator("[routerlink*='/cart']").click();
  await page.locator("div li").first().waitFor();
  const bool =  page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();




  
});