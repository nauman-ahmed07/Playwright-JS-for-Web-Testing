const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('Client App Login',async ({browser})=>
{

    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); 
    const userEmail = page.locator('#userEmail');
    const login = page.locator('#login');
    await userEmail.fill("nauman.ahmed07.na@gmail.com");
    await page.locator('#userPassword').fill("Password123");
    await login.click();
    await page.locator(".card-body b").first().waitFor();
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
//test2
});