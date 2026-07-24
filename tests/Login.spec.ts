/**
 * Test Case: Login with Valid Credentials
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage:MyAccountPage;
test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage=new MyAccountPage(page);
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(3000);
  await page.close();
});

test("User login test @regression @master @sanity",async()=>{

   //Navigate to Login page via Home page
    expect(await homePage.isHomePage()).toBeTruthy();
    await homePage.clickMyAccount();
    await homePage.clickkOnLogin();

    //Enter valid credentials and log in
    expect( await loginPage.isLoginPage()).toBe(true);
    await loginPage.enterUsername(config.email);
    await loginPage.enterPassword(config.password);
    await loginPage.clickOnLogin();

    //alternatevly
   // await loginPage.performLogin(config.email,config.password);
   
    //Verify successful login by checking 'My Account' page presence
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    await myAccountPage.clickOnLogout();
});
