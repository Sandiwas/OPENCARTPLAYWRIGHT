import { test, Page, Locator } from "@playwright/test";
import { ProductPage } from "./ProductPage"; // Import ProductPage if needed

export class SearchResultPage {
  private readonly page: Page;
  private readonly txtSearchPageHeader: Locator;
  private readonly searchProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtSearchPageHeader = page.locator("div#content h1");
    this.searchProducts = page.locator("h4>a");
  }

  async isSearchResultPageExists(): Promise<boolean> {
     const header = await this.txtSearchPageHeader.textContent();
   // return header?.trim() === "Search -";  not allowed beause we are check whole string 
   return  header?.includes('Search -') ?? false;
  }

  async isProductExist(productName: string): Promise<boolean> {
    try {
      const count = await this.searchProducts.count();
      for (let i = 0; i < count; i++) {
        const product = this.searchProducts.nth(i);
        const title = await product.textContent();
        if (title?.trim() === productName) {
          return true;
        }
      }
      return false;
    } catch (error) {
      throw new Error(
        `Failed to verify whether product '${productName}' exists: ${error}`,
      );
    }
  }

  async selectProduct(productName: string): Promise<ProductPage> {
    try {
      const count = await this.searchProducts.count();

      for (let i = 0; i < count; i++) {
        const product = this.searchProducts.nth(i);
        const title = await product.textContent();

        if (title?.trim() === productName) {
          await product.click();
          return new ProductPage(this.page);
        }
      }
      throw new Error(`Product ${productName} not found`);
    } catch (error) {
      throw new Error(`Failed to select Product ${productName} : ${error}`);
    }
  }

  async getProductCount(): Promise<number> {
    return await this.searchProducts.count();
  }
}
