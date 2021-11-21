import {LandingPage} from "../../pageObjects/pages/LandingPage";
import {ProductsPage} from "../../pageObjects/pages/ProductsPage";
import {NavigationBar} from "../../pageObjects/components/NavigationBar";
import {CheckoutPage} from "../../pageObjects/pages/CheckoutPage";

describe("Checkout test cases", () => {
  it("Add first item to cart", () => {
    LandingPage.login("normal_user");
    ProductsPage.addFirstItemToCart();
    ProductsPage.verifyRemoveButton();
    NavigationBar.goToCart();
    CheckoutPage.verifyAddedItem();
  });

  it("Removing items from the cart", () => {
    CheckoutPage.setupForCartCases("normal_user", "[4, 3, 2]");
    CheckoutPage.removeAddedItems();
    CheckoutPage.verifyEmptyCart();
  });
})