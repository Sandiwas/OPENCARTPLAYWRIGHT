//1st way for Page Classes 

/* async isLoginPage(): Promise<boolean> {
    return (await this.page.title()) === "Register Account";
}
----------------------------------------------------------------------------
async isLoginPage(): Promise<boolean> {
    const title = await this.page.title();
    return title === "Register Account";
}
 //test
 expect(await registerPage.isRegistrationPage()).toBeTruthy();

 */
//==========================================================================================
//2st way 

/* private readonly heading = this.page.locator("h1");

async isLoginPage(): Promise<boolean> {
    return await this.heading.isVisible();
}
expect(await loginPage.isLoginPage()).toBe(true);
expect(await loginPage.isLoginPage()).toBeTruthy();

===============================================================================================
//here we have to use try catch \
/*     async login(username: string, password: string): Promise<void> {
    try {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    } catch (error) {
        throw new Error(`Login failed: ${error}`);
    }
} */

//======================================================================================================
/*     # Playwright Locator Methods (Interview Cheat Sheet)

| Method                     | Return Type                    | Purpose                          | Example                                  |
| -------------------------- | ------------------------------ | -------------------------------- | ---------------------------------------- |
| `click()`                  | `Promise<void>`                | Click an element                 | `await locator.click()`                  |
| `fill()`                   | `Promise<void>`                | Enter text                       | `await locator.fill("Admin")`            |
| `type()`                   | `Promise<void>`                | Type text character by character | `await locator.type("Admin")`            |
| `clear()`                  | `Promise<void>`                | Clear input field                | `await locator.clear()`                  |
| `press()`                  | `Promise<void>`                | Press keyboard key               | `await locator.press("Enter")`           |
| `check()`                  | `Promise<void>`                | Check checkbox                   | `await locator.check()`                  |
| `uncheck()`                | `Promise<void>`                | Uncheck checkbox                 | `await locator.uncheck()`                |
| `setChecked()`             | `Promise<void>`                | Check/Uncheck using boolean      | `await locator.setChecked(true)`         |
| `selectOption()`           | `Promise<void>`                | Select dropdown value            | `await locator.selectOption("India")`    |
| `hover()`                  | `Promise<void>`                | Hover mouse                      | `await locator.hover()`                  |
| `dblclick()`               | `Promise<void>`                | Double click                     | `await locator.dblclick()`               |
| `tap()`                    | `Promise<void>`                | Tap (Mobile)                     | `await locator.tap()`                    |
| `focus()`                  | `Promise<void>`                | Focus on element                 | `await locator.focus()`                  |
| `blur()`                   | `Promise<void>`                | Remove focus                     | `await locator.blur()`                   |
| `scrollIntoViewIfNeeded()` | `Promise<void>`                | Scroll to element                | `await locator.scrollIntoViewIfNeeded()` |
| `dragTo()`                 | `Promise<void>`                | Drag & Drop                      | `await source.dragTo(target)`            |
| `dispatchEvent()`          | `Promise<void>`                | Trigger event                    | `await locator.dispatchEvent("click")`   |
| `screenshot()`             | `Promise<Buffer>`              | Capture element screenshot       | `await locator.screenshot()`             |
| `isVisible()`              | `Promise<boolean>`             | Check visibility                 | `await locator.isVisible()`              |
| `isHidden()`               | `Promise<boolean>`             | Check hidden state               | `await locator.isHidden()`               |
| `isEnabled()`              | `Promise<boolean>`             | Check enabled state              | `await locator.isEnabled()`              |
| `isDisabled()`             | `Promise<boolean>`             | Check disabled state             | `await locator.isDisabled()`             |
| `isEditable()`             | `Promise<boolean>`             | Check editable state             | `await locator.isEditable()`             |
| `isChecked()`              | `Promise<boolean>`             | Check checkbox/radio state       | `await locator.isChecked()`              |
| `textContent()`            | `Promise<string \| null>`      | Get element text                 | `await locator.textContent()`            |
| `innerText()`              | `Promise<string>`              | Get visible text                 | `await locator.innerText()`              |
| `innerHTML()`              | `Promise<string>`              | Get HTML                         | `await locator.innerHTML()`              |
| `inputValue()`             | `Promise<string>`              | Get input value                  | `await locator.inputValue()`             |
| `getAttribute()`           | `Promise<string \| null>`      | Get attribute value              | `await locator.getAttribute("href")`     |
| `boundingBox()`            | `Promise<BoundingBox \| null>` | Get element position & size      | `await locator.boundingBox()`            |
| `count()`                  | `Promise<number>`              | Count matching elements          | `await locator.count()`                  |
| `first()`                  | `Locator`                      | Select first element             | `locator.first()`                        |
| `last()`                   | `Locator`                      | Select last element              | `locator.last()`                         |
| `nth(index)`               | `Locator`                      | Select nth element               | `locator.nth(2)`                         |
| `allTextContents()`        | `Promise<string[]>`            | Get text of all elements         | `await locator.allTextContents()`        |
| `allInnerTexts()`          | `Promise<string[]>`            | Get visible text of all elements | `await locator.allInnerTexts()`          |
| `locator()`                | `Locator`                      | Find child element               | `locator.locator("button")`              |
| `filter()`                 | `Locator`                      | Filter matching locators         | `locator.filter({ hasText: "Login" })`   | */

//================================================================================================================================
/* | Type   | Example                                | Meaning                                 |
| ------ | -------------------------------------- | --------------------------------------- |
| String | `"Search - iPhone".includes("Search")` | Checks if the text contains `"Search"`  |
| Array  | `["Apple","Mango"].includes("Apple")`  | Checks if `"Apple"` exists in the array |
 */

//check partical text on the page 
/*  async isSearchResultPageExists(): Promise<boolean> {
     const header = await this.txtSearchPageHeader.textContent();
   // return header?.trim() === "Search -";  not allowed beause we are check whole string 
   return  header?.includes('Search -') ?? false;
  }

  //check full text on the page
 /* async isLoginPage(): Promise<boolean> {
    const title = await this.page.title();
    return title === "Register Account";
}
 //test
 expect(await registerPage.isRegistrationPage()).toBeTruthy();

 */

 //================================================================================================================================================

 //if we have list of locator and want to perforn click operation the  use this way 


/*    async selectProduct(productName: string): Promise<ProductPage> {
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
   } */
//---------------------------------------------------------------------------------------------------------------------------------------------
     //if we ahevlist of locator and i need to check one of locator present are not then use below 

/*  async isProductExist(productName: string): Promise<boolean> {
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
    } */

//===========================================================================================================================

/* Quick Memory Trick
function keyword → Outside a class.
No function keyword → Inside a class (Class Method).
=> → Arrow Function.
No function name → Anonymous Function.
Remember:
Outside Class  → async function login() {}
Inside Class   → async login() {}
Arrow Function → const login = async () => {}
Anonymous      → const login = async function() {} */

