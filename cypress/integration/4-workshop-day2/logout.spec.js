import {LandingPage} from "../../pageObjects/pages/LandingPage";
import {NavigationBar} from "../../pageObjects/components/NavigationBar";

describe("Login test cases", () => {
  before(() => {
    cy.request("POST", "https://discord.com/api/webhooks/911928386681720842/t3q2LAjy2lU-rMw2qtvd1pwWnuSChnfKrWAMESBQKWVVmAWhLPh4xQ1ZXG5fWcoVIPP5",
      {
        username: "God",
        avatar_url: "https://sco.wikipedia.org/wiki/God#/media/File:Cima_da_Conegliano,_God_the_Father.jpg",
      content: "peepeepoopoo"
    })
  })

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
    cy.visit("inventory.html", {
      failOnStatusCode: false,
    });
    cy.get(".header_secondary_container").should("be.visible");
  });

  it("Login and logout", () => {
    LandingPage.login("normal_user");
    NavigationBar.logout();
    LandingPage.verifyLoginFieldsEmpty();
    LandingPage.verifyEmptyLoginCookies();
  });

  it("Login with locked out user", () => {
    LandingPage.login("locked_user");
    NavigationBar.logout();
  });
})