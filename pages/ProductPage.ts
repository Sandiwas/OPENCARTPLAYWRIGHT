import { Page, Locator } from "@playwright/test";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";

export class ProductPage {

  private readonly page: Page;
  
  private readonly txtQuantity: Locator;
  private readonly btnAddToCart: Locator;
  private readonly confirmationMsg: Locator;
  private readonly btnItem: Locator;
  private readonly lnkViewCart: Locator;

  constructor(page: Page) {
    this.page = page;

    this.txtQuantity = page.locator("#input-quantity");
    this.btnAddToCart = page.locator("#button-cart");
    this.confirmationMsg = page.locator(
      "div>div:has-text('Success: You have added')",
    );
    this.btnItem = page.locator("#cart");
    this.lnkViewCart = page.locator("strong:has-text('View Cart')");
  }

  async setQuantity(qty: string): Promise<void> {
    await this.txtQuantity.clear();
    await this.txtQuantity.fill(qty);
  }

  async clickOnAddToCart(): Promise<void> {
    await this.btnAddToCart.click();
  }
  async isConfirmationMessageVisible(): Promise<boolean> {
    const msg = await this.confirmationMsg.textContent();
    return msg?.includes("Success: You have added") ?? false;
  }

  async clickOnIteamNavigateToCart(): Promise<void> {
    await this.btnItem.click();
  }

  async clickViewCart(): Promise<ShoppingCartPage> {
    await this.lnkViewCart.click();
    return new ShoppingCartPage(this.page);
  }
}
