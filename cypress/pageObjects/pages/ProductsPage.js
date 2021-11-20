import { BasePage } from "../BasePage";

const PRODUCT_NAMES = ".inventory_item_name";
const ADD_TO_CART_BUTTONS = ".inventory_item_price + .btn";

export class ProductsPage extends BasePage {
  static addFirstItemToCart() {
    cy.get(PRODUCT_NAMES)
      .first()
      .then((element) => {
        cy.wrap(element.text()).as("addedProductName");
      });
    cy.get(ADD_TO_CART_BUTTONS).first().click();
  }

  static verifyRemoveButton() {
    cy.get(ADD_TO_CART_BUTTONS)
      .first()
      .should("have.text", "Remove")
      .should("have.css", "color", "rgb(71, 76, 85)");
  }
}
