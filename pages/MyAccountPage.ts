import { Page, Locator } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { LogoutPage } from "./LogoutPage";

export class MyAccountPage {
  private readonly page: Page;
  private readonly headingMyAccount: Locator;
  private readonly lnkLogout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headingMyAccount = page.locator("div#content h2:has-text('My Account')",);
    this.lnkLogout = page.locator("div.list-group a:has-text('Logout')");
  }

  async isMyAccountPageExists(): Promise<boolean> {
    return await this.headingMyAccount.isVisible();
  }

  async clickOnLogout(): Promise<LogoutPage> {
    await this.lnkLogout.click();
    return new LogoutPage(this.page);
  }
}
