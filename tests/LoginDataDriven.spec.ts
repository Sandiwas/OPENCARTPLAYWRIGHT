import { test, expect, Config } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";
import { TestConfig } from "../test.config";
import { DataProvide } from "../utils/dataProvider";

//Load JSON test data logindata.json

const jsonPath = "testData/logindata.json";
const jsonTestData: any = DataProvide.getTestDataFromJson(jsonPath);

let config: TestConfig;
let loginPage: LoginPage;
let homePage: HomePage;
let myAccountPage: MyAccountPage;

for (const data of jsonTestData) {
  test(`Login test with JSON Data ${data.testName} @dataDriven`, async ({page}) => {
    config = new TestConfig(); // create instance
    await page.goto(config.appUrl); // getting appURL from test.config.ts file

    homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickkOnLogin();

    loginPage = new LoginPage(page);
    await loginPage.performLogin(data.email, data.password);

    if (data.expected.toLowerCase() === "success") {
      myAccountPage = new MyAccountPage(page);
      expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    } else {
      const errorMessage = await loginPage.getLoginErrorMessage();
      expect(errorMessage).toContain("Warning: Your account");
    }
  });
}

//Load CSV test data logindata.json
const csvPath = "testData/logindata.csv";
const csvTestData = DataProvide.getDataFromCsv(csvPath);

for (const data of csvTestData) {
  test(`Login Test with CSV Data ${data.testName} @dataProvider`, async ({page}) => {
    config = new TestConfig(); // create instance
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    expect(await homePage.isHomePage()).toBeTruthy();
    await homePage.clickMyAccount();
    await homePage.clickkOnLogin();
    
    loginPage = new LoginPage(page);
    expect(await loginPage.isLoginPage()).toBe(true);
    await loginPage.performLogin(data.email, data.password);

    if (data.expected.toLowerCase() === "success") {
      myAccountPage = new MyAccountPage(page);
      expect(await myAccountPage.isMyAccountPageExists()).toBe(true);
    } else {
      expect(await loginPage.getLoginErrorMessage()).toContain(
        "Warning: Your account",
      );
    }
  });
}
