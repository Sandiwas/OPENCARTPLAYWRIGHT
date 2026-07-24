import { Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage {
  private readonly page: Page;
  private readonly btnContinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnContinue = page.locator(
      "div[class='buttons'] a:has-text('Continue')",
    );
  }
  async isLogoutPageLoaded(): Promise<boolean> {
    return (await this.page.title()) === "Account Logout";
  }
  async clickOnContinue(): Promise<HomePage> {
    await this.btnContinue.click();
    return new HomePage(this.page);
  }
}
