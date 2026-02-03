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

});


test('UI Controls',async ({page})=>
{
  
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");  
    const userEmail = page.locator('#userEmail');
    const login = page.locator('#login');
    const blinkingText = page.locator(".blinkingText");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("Consultant");
    await page.locator(".checkmark").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".checkmark").last().isChecked());
    await expect(page.locator(".checkmark").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect( await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(blinkingText).toHaveAttribute("class","blinkingText");

})


test.only('Child window Handling',async ({browser})=>
    
{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");  
    const userEmail = page.locator('#userEmail');
    const blinkingText = page.locator(".blinkingText");

    const [newPage] = await Promise.all(
    [ 
    context.waitForEvent("page"),    //listen for a new page pending,rejected, fulfilled
    blinkingText.click(),
    ])  //new page is opened



const text = await newPage.locator(".red").textContent();
const arrayText = text.split("@");
const domain = arrayText[1].split(" ")[0]
console.log(domain);
await page.locator("#username").fill(domain);
await page.pause();
console.log(await page.locator("#username").textContent());  //inputvalue();


})