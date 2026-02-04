const { test, expect } = require('@playwright/test');

test('Client App Login', async ({ page }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  const productName = "ZARA COAT 3";

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await page.locator("#userEmail").fill("nauman.ahmed07.na@gmail.com");
  await page.locator("#userPassword").fill("Password123");
  await Promise.all(
    [
    page.waitForLoadState('networkidle'),
    page.locator('#login').click(),
    ]);

  await page.locator(".card-body b").first().waitFor({ timeout: 15000 });

  const products = page.locator(".card-body");
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const title = await products.nth(i).locator("b").textContent();

    if (title.trim() === productName) {
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='/cart']").click();
  await page.locator("div li").first().waitFor();
  const bool =  page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();




  
});