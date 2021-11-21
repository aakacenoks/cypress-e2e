import { BasePage } from "../BasePage";

const PRODUCT_NAMES = "inventory_item_name";
const REMOVE_BUTTONS = "[data-test*=remove]";

export class CheckoutPage extends BasePage {
  static verifyAddedItem() {
    cy.get("@addedProductName").then((name) => {
      this.hasText(PRODUCT_NAMES, name);
    });
  }

  static setupForCartCases(username, addedItems) {
    cy.setAddedItems(addedItems);
    cy.setLoginCookies(username);
    cy.visit("cart.html", {
      failOnStatusCode: false,
    });
  }

  static removeAddedItems() {
    cy.get(REMOVE_BUTTONS).click({ multiple: true });
  }

  static verifyEmptyCart() {
    this.doesNotExist(PRODUCT_NAMES);
    this.doesNotExist(REMOVE_BUTTONS);
  }
}
