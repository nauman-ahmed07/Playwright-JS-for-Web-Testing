const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('Browser Context Playwright test',async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 
    console.log(await page.title());
    //CSS
    const userEmail = page.locator('#userEmail');
    const login = page.locator('#login');
    await userEmail.fill("nauman.ahmed07.na@gmail.com");
    await page.locator('#userPassword').fill("Password123");
    await login.click();
    const cardTitles =  page.locator(".card-body b");
    //console.log(await page.locator("#error").textContent());
    await page.locator(".card-body b").first().waitFor();
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
//test2
});