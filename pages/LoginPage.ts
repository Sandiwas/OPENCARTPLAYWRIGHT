import { Page, expect, Locator } from "@playwright/test";

export class LoginPage {
  // Locators
  private readonly page: Page;
  private readonly txtUsername: Locator;
  private readonly txtPassword: Locator;
  private readonly btnLogin: Locator;
  private readonly txtErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Initialize locators with CSS selectors
    this.txtUsername = page.locator("#input-email");
    this.txtPassword = page.locator("#input-password");
    this.btnLogin = page.locator("input[type='submit']");
    this.txtErrorMessage = page.locator(
      "div[class='alert alert-danger alert-dismissible']",
    );
  }
  //action methods
  //check  Register page exists
  async isLoginPage(): Promise<boolean> {
    const title = await this.page.title();
    return title === "Account Login";
    //return (await this.page.title()) === 'Register Account';
  }

  async enterUsername(username: string): Promise<void> {
    await this.txtUsername.fill(username);
  }

  async enterPassword(password: string) {
    await this.txtPassword.fill(password);
  }

  async clickOnLogin() {
    await this.btnLogin.click();
  }

  async getLoginErrorMessage(): Promise<null | string> {
    return this.txtErrorMessage.textContent();
  }
  async performLogin(username: string, password: string): Promise<void> {
    try {
      await this.isLoginPage();
      await this.enterUsername(username);
      await this.enterPassword(password);
      await this.clickOnLogin();
    } catch (error) {
      throw new Error(`Loing Failed : $(error)`);
    }
  }
}
