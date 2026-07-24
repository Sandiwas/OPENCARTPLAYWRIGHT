/**
 * Test Case: End-to-End Test on Demo E-commerce Application
 *
 * Purpose:
 * This test simulates a complete user flow on an e-commerce site.
 *
 * Steps:
 * 1) Register a new account
 * 2) Logout after registration
 * 3) Login with the same account
 * 4) Search for a product and add it to the shopping cart
 * 5) Verify cart contents
 * 6) Attempt checkout (disabled since feature isn't available on demo site)
 */

import { test, expect, Page } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import { HomePage } from "../pages/HomePage";
import { LogoutPage } from "../pages/LogoutPage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { TestConfig } from "../test.config";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { ProductPage } from "../pages/ProductPage";

test("Execute End ToEnd Test @end-to-end", async ({ page }) => {
  const config = new TestConfig();
  await page.goto(config.appUrl);
  let registerEmail = await performanceRegistration(page);
  console.log("Registration is Completed");

  await PerformLogout(page);
  console.log("Logout is completed!");

  await performLogin(page, registerEmail);
  console.log("Login is completed!");

  await addProductToCart(page);
  console.log("Product added to cart!");

  await verifyShoppingCart(page);
  console.log("Shopping cart verification completed!");
});

async function performanceRegistration(page: Page): Promise<string> {
  const homePage = new HomePage(page);
  expect(await homePage.isHomePage()).toBeTruthy();
  await homePage.clickMyAccount();
  await homePage.clickRegister();

  const registrationPage = new RegistrationPage(page);
  expect(await registrationPage.isRegistrationPage()).toBeTruthy();
  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getLastName());

  const email = RandomDataUtil.getEmail();
  await registrationPage.setEmail(email);
  await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

  await registrationPage.setPassword("test123");
  await registrationPage.setConfirmPassword("test123");

  await registrationPage.setPrivatePolicy();
  await registrationPage.clickOnContinue();

  const confirmMsg = await registrationPage.getConfirmationMsg();
  expect(confirmMsg).toContain("Your Account Has Been Created!");
  return email;
}

async function PerformLogout(page: Page) {
  const myAccountPage = new MyAccountPage(page);
  const logoutPage: LogoutPage = await myAccountPage.clickOnLogout();
  expect(await logoutPage.isLogoutPageLoaded()).toBeTruthy();

  const homePage = await logoutPage.clickOnContinue();
  expect(await homePage.isHomePage()).toBe(true);
}

async function performLogin(page: Page, email: string) {
  //const config = new TestConfig();
  //await page.goto(config.appUrl);
  const homePage = new HomePage(page);
  await homePage.clickMyAccount();
  await homePage.clickkOnLogin();
  const loginPage = new LoginPage(page);
  await loginPage.performLogin(email, "test123");
  const myAccountPage = new MyAccountPage(page);
  expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
}

async function addProductToCart(page: Page) {
  const config = new TestConfig();
  const homePage = new HomePage(page);
  await homePage.enterProductName(config.productName);
  await homePage.clickOnSearchBtn();
  const searchResultPage = new SearchResultPage(page);
  expect(await searchResultPage.isSearchResultPageExists()).toBeTruthy();
  expect(
    await searchResultPage.isProductExist(config.productName),
  ).toBeTruthy();

  const productPage: ProductPage = await searchResultPage.selectProduct(
    config.productName,
  );
  await productPage.setQuantity(config.productQuantity);
  await productPage.clickOnAddToCart();
  expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();
}

async function verifyShoppingCart(page: Page) {
  const productPage = new ProductPage(page);

  await productPage.clickOnIteamNavigateToCart();
  const shoppingCartPage = await productPage.clickViewCart();
  expect(await shoppingCartPage.ShoppingCartPageExists()).toBeTruthy();
  const config = new TestConfig();
  const totalPriceOfProduct = await shoppingCartPage.getTotalPrice();

  expect(totalPriceOfProduct).toBe(config.totalPrice);
}
// Function to perform checkout (disabled for demo site)
async function performCheckout(page: Page) {
    // Checkout feature is not implemented since it's a demo site.
    // Place your checkout flow logic here if backend is available.
}