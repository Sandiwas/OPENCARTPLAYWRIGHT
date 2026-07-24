/**
 * Test Case: User Logout
 *
 * Tags: @master @regression
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Go to Login page from Home page
 * 3) Login with valid credentials
 * 4) Verify 'My Account' page
 * 5) Click on Logout link
 * 6) Click on Continue button
 * 7) Verify user is redirected to Home Page
 */

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";

// Declare shared variables
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let homePage: HomePage;
let config: TestConfig;
let logoutPage: LogoutPage;

// Setup before each test
test.beforeEach(async ({ page }) => {
  config = new TestConfig(); // Load test config
  await page.goto(config.appUrl); // Step 1: Navigate to app URL

  // Initialize page objects
  homePage = new HomePage(page);
  myAccountPage = new MyAccountPage(page);
  loginPage = new LoginPage(page);
  //  logoutPage = new LogoutPage(page);
});

// Optional cleanup after each test
test.afterEach(async ({ page }) => {
  await page.waitForTimeout(3000);
  await page.close();
});

test(`User Logout Test @master @Regression`, async () => {
  // Step 2: Navigate to Login page
  expect(await homePage.isHomePage()).toBe(true);
  await homePage.clickMyAccount();
  await homePage.clickkOnLogin();

  // Step 3: Perform login using valid credentials
  await loginPage.performLogin(config.email, config.password);

  // Step 4: Verify successful login
  expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();

  // Step 5: Click Logout, which returns LogoutPage instance
  logoutPage = await myAccountPage.clickOnLogout();

  // Step 6: Verify we are on Logout page
  expect(await logoutPage.isLogoutPageLoaded()).toBeTruthy();

  // Step 7: Click Continue and verify redirection to HomePage
  homePage = await logoutPage.clickOnContinue();
  expect(await homePage.isHomePage()).toBe(true);
});
