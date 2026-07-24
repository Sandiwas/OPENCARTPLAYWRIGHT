import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ProductPage } from "../pages/ProductPage";
import { TestConfig } from "../test.config";

let config: TestConfig;
let homePage: HomePage;
let searchReseultPage: SearchResultPage;
let productPage: ProductPage;
test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);

  homePage = new HomePage(page);
  searchReseultPage = new SearchResultPage(page);
 // productPage = new ProductPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close(); // Optional cleanup
});

test(`Add Product to Cart test @master @regression`, async () => {

  expect(await homePage.isHomePage()).toBeTruthy();
  await homePage.enterProductName(config.productName);
  await homePage.clickOnSearchBtn();

  expect(await searchReseultPage.isSearchResultPageExists()).toBeTruthy();
  expect(await searchReseultPage.isProductExist(config.productName)).toBe(true);
  
    productPage=await searchReseultPage.selectProduct(config.productName);
    await productPage.setQuantity(config.productQuantity);
    await productPage.clickOnAddToCart();
    // Step 8: Assert success message is visible
    expect(await productPage.isConfirmationMessageVisible()).toBeTruthy()
});
