import { Page, Locator } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";

export class ShoppingCartPage {
  private readonly page: Page;
  private readonly lblTotalPrice: Locator;
  private readonly btnCheckout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lblTotalPrice = page.locator("//*[@id='content']/div[2]/div/table//tr[4]//td[2]",);
    this.btnCheckout = page.locator("div[class='buttons clearfix'] a:has-text('Checkout')",
    );
  }

  async ShoppingCartPageExists():Promise<boolean>{
   const title = await this.page.title();
    return title  === 'Shopping Cart';
  }

  async getTotalPrice(): Promise<string |null> {
    try {
        return await this.lblTotalPrice.textContent();
    } catch (error) {
        throw new Error(`Failed to retrieve total price: ${error}`);
    }
}

  async clickOnCheckout(): Promise<CheckoutPage> {
    await this.btnCheckout.click();
    return new CheckoutPage(this.page);
  }
}
