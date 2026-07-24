import { Locator, Page, expect } from "@playwright/test";

export class RegistrationPage {
  private readonly page: Page;

  // Locators using CSS selectors
  private readonly txtFirstName: Locator;
  private readonly txtLastname: Locator;
  private readonly txtEmail: Locator;
  private readonly txtTelephone: Locator;
  private readonly txtPassword: Locator;
  private readonly txtPasswordConfirm: Locator;
  private readonly chkPolicy: Locator;
  private readonly btnContinue: Locator;
  private readonly msgConfirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    // Initialize locators with CSS selectors
    this.txtFirstName = page.locator("#input-firstname");
    this.txtLastname = page.locator("#input-lastname");
    this.txtEmail = page.locator("#input-email");
    this.txtTelephone = page.locator("#input-telephone");
    this.txtPassword = page.locator("#input-password");
    this.txtPasswordConfirm = page.locator("#input-confirm");
    this.chkPolicy = page.locator("input[type='checkbox']");
    this.btnContinue = page.locator("input[value='Continue']");
    this.msgConfirmation = page.locator("div#content h1");
  }

  //action methods
  //check  HomePage exists
  async isRegistrationPage(): Promise<boolean> {
    return (await this.page.title()) === "Register Account";
  }
  //Sets the first name in the registration form
  async setFirstName(firstName: string): Promise<void> {
    await this.txtFirstName.fill(firstName);
  }

  //Sets the last name in the registration form
  async setLastName(lastName: string): Promise<void> {
    await this.txtLastname.fill(lastName);
  }

  // Sets the email in the registration form
  async setEmail(email: string): Promise<void> {
    await this.txtEmail.fill(email);
  }

  //Sets the telephone number in the registration form
  async setTelephone(telephone: string): Promise<void> {
    await this.txtTelephone.fill(telephone);
  }

  //* Sets the password in the registration form
  async setPassword(pwd: string): Promise<void> {
    await this.txtPassword.fill(pwd);
  }

  //Sets the confirm password in the registration form
  async setConfirmPassword(pwd: string): Promise<void> {
    await this.txtPasswordConfirm.fill(pwd);
  }

  //Checks the privacy policy checkbox
  async setPrivatePolicy(): Promise<void> {
    await this.chkPolicy.check();
  }

  //Clicks the Continue button
  async clickOnContinue(): Promise<void> {
    await this.btnContinue.click();
  }

  //Gets the confirmation message text
  async getConfirmationMsg(): Promise<string> {
    return (await this.msgConfirmation.textContent()) ?? " ";
  }

  //Complete registration workflow
  async completeRegistration(userData: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
  }): Promise<void> {
    try {
      await this.setFirstName(userData.firstName);
      await this.setLastName(userData.lastName);
      await this.setEmail(userData.email);
      await this.setTelephone(userData.telephone);
      await this.setPassword(userData.password);
      await this.setConfirmPassword(userData.password);
      await this.setPrivatePolicy();
      await this.clickOnContinue();
      await expect(this.msgConfirmation).toBeVisible();
    } catch (error) {
      throw new Error(`Regetration Failed !!! $(error)`);
    }
  }
}
