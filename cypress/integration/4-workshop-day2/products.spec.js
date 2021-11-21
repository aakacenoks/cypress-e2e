import {LandingPage} from "../../pageObjects/pages/LandingPage";
import {ProductsPage} from "../../pageObjects/pages/ProductsPage";

context("Products page test cases", () => {
  it("Sorting the products list by price - low to high", () => {
    LandingPage.login("normal_user")
    ProductsPage.sortProductsBy("lohi")
    ProductsPage.verifyPricesLowToHigh()
  });

  it("Sorting the products list by price - high to low", () => {
    LandingPage.login("normal_user")
    ProductsPage.sortProductsBy("hilo")
    ProductsPage.verifyPricesHighToLow()
  });
})