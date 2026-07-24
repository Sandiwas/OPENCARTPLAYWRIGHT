import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { SearchResultPage } from "../pages/SearchResultPage";
import { HomePage } from "../pages/HomePage";

let config: TestConfig;
let searchReseultPage: SearchResultPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);

  homePage = new HomePage(page);
  searchReseultPage = new SearchResultPage(page);
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(3000);
  await page.close();
});

test(`Product Search test @master @regression`, async () => {
  expect(await homePage.isHomePage()).toBeTruthy();
  await homePage.enterProductName(config.productName);
  await homePage.clickOnSearchBtn();

  expect(await searchReseultPage.isSearchResultPageExists()).toBeTruthy();
  const isProductFound = await searchReseultPage.isProductExist(
    config.productName,
  );
  expect(isProductFound).toBeTruthy();
});
