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
  await page.locator("li[class='totalRow'] button[type='button']").click();
  await page.locator("input[placeholder='Select Country']").pressSequentially("Ind",{delay:150});
  const dropdown = page.locator(".ta-results.list-group.ng-star-inserted");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i=0; i< optionsCount; ++i)
  {

    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India")
    {
        await dropdown.locator("button").nth(i).click();
        break;
    }

  }

  await expect(page.locator("label[type='text']")).toHaveText("nauman.ahmed07.na@gmail.com");
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderID = await page.locator("label[class='ng-star-inserted']").textContent();
  console.log(orderID);



   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderID.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderID.includes(orderIdDetails)).toBeTruthy();

});