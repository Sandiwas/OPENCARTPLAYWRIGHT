import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { TestConfig } from "../test.config";
import { DataProvide } from "../utils/dataProvider";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { beforeEach } from "node:test";

let config: TestConfig;
let homePage: HomePage;
let registerPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  registerPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(3000);
  await page.close();
});

test("Account Regestration @sanity @regression @master", async () => {
  expect(await homePage.isHomePage()).toBeTruthy();
  await homePage.clickMyAccount();
  await homePage.clickRegister();
  expect(await registerPage.isRegistrationPage()).toBeTruthy();
  await registerPage.setFirstName(RandomDataUtil.getFirstName());
  await registerPage.setLastName(RandomDataUtil.getLastName());
  await registerPage.setEmail(RandomDataUtil.getEmail());
  await registerPage.setTelephone(RandomDataUtil.getPhoneNumber());
  const password = RandomDataUtil.getPassword();
  await registerPage.setPassword(password);
  await registerPage.setConfirmPassword(password);
  await registerPage.setPrivatePolicy();
  await registerPage.clickOnContinue();
  const confirmation = await registerPage.getConfirmationMsg();
  expect(confirmation).toContain("Your Account Has Been Created!");
});
