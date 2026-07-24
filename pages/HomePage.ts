import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  private readonly page: Page;
  //Locator
  private readonly linkMyAccount: Locator;
  private readonly linkRegister: Locator;
  private readonly linkLogin: Locator;
  private readonly txtSearchBox: Locator;
  private readonly btnSearch: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.linkMyAccount = page.locator('span:has-text("My Account")');
    this.linkRegister = page.locator('ul.list-inline li a:has-text("Register")',
    );
    this.linkLogin = page.locator('ul.list-inline li a:has-text("Login")');
    this.txtSearchBox = page.locator("input[name='search']");
    this.btnSearch = page.locator("div#search button[type='button']");
  }

  //action methods
  //check  HomePage exists
  async isHomePage(): Promise<boolean> {
      return (await this.page.title()) === "Your Store";
  }

  // Click "My Account" link
  async clickMyAccount(): Promise<void> {
    try {
      await this.linkMyAccount.click();
    } catch (error) {
      console.log(`Exception occurred while clicking on 'My Account' ${error}`);
      throw error;
    }
  }

  // Click "Register" link
  async clickRegister(): Promise<void> {
    try {
      await this.linkRegister.click();
    } catch (error) {
      console.log(`Exception occurred while clicking on 'Register' : ${error}`);
      throw error;
    }
  }

  // Click "Login" link
  async clickkOnLogin(): Promise<void> {
    try {
      await this.linkLogin.click();
    } catch (error) {
      console.log(`Exception occurred while clicking 'Login' : ${error}`);
      throw error;
    }
  }

  // Enter product name in the search box
  async enterProductName(prodName: string): Promise<void> {
    try {
      await this.txtSearchBox.fill(prodName);
    } catch (error) {
      console.log(
        `Exception occurred while entering product name :   ${error}`,
      );
      throw error;
    }
  }

  // Click the search button
  async clickOnSearchBtn(): Promise<void> {
    try {
      await this.btnSearch.click();
    } catch (error) {
      console.log(
        `Exception occurred while clicking on 'Search Button' : ${error}`,
      );
      throw error;
    }
  }
}
