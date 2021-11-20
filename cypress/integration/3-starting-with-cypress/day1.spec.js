import { LandingPage } from "../../pageObjects/pages/LandingPage";
import { NavigationBar } from "../../pageObjects/components/NavigationBar";
import { ProductsPage } from "../../pageObjects/pages/ProductsPage";
import { CheckoutPage } from "../../pageObjects/pages/CheckoutPage";

//Application for unit tests
// function fizzBuzz(number) {
//   if (number % 3 === 0 && number % 5 === 0) {
//     return "fizzbuzz";
//   }
//   if (number % 3 === 0) {
//     return "fizz";
//   }
//   if (number % 5 === 0) {
//     return "buzz";
//   }
//   return "Not a multiple of 3 or 5";
// }
//
// function numbersExpectedToEq(array, expected) {
//   array.forEach((number) => {
//     expect(fizzBuzz(number)).to.eq(expected);
//   });
// }
//
// // Cypress tests
// describe("First day test cases", () => {
//   it("Returns fizz if number is a multiple of 3", () => {
//     numbersExpectedToEq([3, 6, 9, 12], "fizz");
//   });
//
//   it("Returns buzz if number is a multiple of 5", () => {
//     numbersExpectedToEq([5, 10, 20], "buzz");
//   });
//
//   it("Returns fizzbuzz if number is a multiple of 3 and 5", () => {
//     numbersExpectedToEq([15, 30, 60], "fizzbuzz");
//   });
// });

describe.only("First day E2E test cases", () => {
  // Hooks
  // before(() => {
  //   cy.log("Running once before the test cases")
  // })
  //
  // beforeEach(() => {
  //   cy.log("Running before each test case")
  // })
  //
  // after(() => {
  //   cy.log("Running once after the test cases")
  // })
  //
  // afterEach(() => {
  //   cy.log("Running after each test case")
  // })

  it("Login with standard user", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("[data-test=username]").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get(".submit-button").click();
    cy.get(".header_secondary_container").should("be.visible");
    cy.getCookie("session-username").then((cookie) => {
      // console.log(cookie)
      expect(cookie.value).to.eq("standard_user");
    });
  });

  it("Login with standard user on mobile viewport", () => {
    cy.viewport("iphone-6");
    cy.visit("https://www.saucedemo.com/");
    cy.get("[data-test=username]").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get(".submit-button").click();
    cy.get(".header_secondary_container").should("be.visible");
    cy.get("[data-test*=add-to-cart]").last().scrollIntoView();
  });

  it("Starting test case allready logged in", () => {
    cy.setLoginCookies("standard_user");
    cy.visit("https://www.saucedemo.com/inventory.html", {
      failOnStatusCode: false,
    });
    cy.get(".header_secondary_container").should("be.visible");
  });

  it("Login and logout", () => {
    LandingPage.login("standard_user");
    NavigationBar.logout();
    LandingPage.verifyLoginFieldsEmpty();
    LandingPage.verifyEmptyLoginCookies();
  });

  it("Add first item to cart", () => {
    LandingPage.login("standard_user");
    ProductsPage.addFirstItemToCart();
    ProductsPage.verifyRemoveButton();
    NavigationBar.goToCart();
    CheckoutPage.verifyAddedItem();
  });

  it.only("Removing items from the cart", () => {
    CheckoutPage.setupForCartCases("standard_user", "[4, 3, 2]");
    CheckoutPage.removeAddedItems();
    CheckoutPage.verifyEmptyCart();
  });
});
