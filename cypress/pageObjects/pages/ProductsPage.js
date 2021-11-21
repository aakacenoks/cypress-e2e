import { BasePage } from "../BasePage";

const PRODUCT_NAMES = ".inventory_item_name";
const ADD_TO_CART_BUTTONS = ".inventory_item_price + .btn";
const SORTING_DROPDOWN = "[data-test=product_sort_container]"
const PRODUCT_PRICES = ".inventory_item_price"

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

  static sortProductsBy(option) {
    this.selectOption(SORTING_DROPDOWN, option)
  }

  static verifyPricesLowToHigh() {
    let prices = []
    cy.get(PRODUCT_PRICES).each((product) => {
      prices.push(product.text().replace("$", ""))
    })
    cy.wrap(prices).then((array) => {
      let expectedPrices = [...prices].sort((a,b) => a-b)
      expect(array).to.deep.eq(expectedPrices)
    })
  }

  static verifyPricesHighToLow() {
    let prices = []
    cy.get(PRODUCT_PRICES).each((product) => {
      prices.push(product.text().replace("$", ""))
    })
    cy.wrap(prices).then((array) => {
      let expectedPrices = [...prices].sort((a,b) => b-a)
      expect(array).to.deep.eq(expectedPrices)
    })
  }
}
