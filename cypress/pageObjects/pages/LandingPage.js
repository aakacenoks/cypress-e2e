import { BasePage } from "../BasePage";

const USERNAME_FIELD = "[data-test=username]";
const PASSWORD_FIELD = "#password";
const LOGIN_BUTTON = ".submit-button";
const LOGIN_COOKIE_NAME = "standard_user";

export class LandingPage extends BasePage {
  static login(user) {
    cy.visit("https://www.saucedemo.com/");
    cy.fixture("testUsers").then((fixture) => {
      this.type(USERNAME_FIELD, fixture[user].username);
      this.type(PASSWORD_FIELD, fixture[user].password);
    })
    this.click(LOGIN_BUTTON);
  }

  static verifyLoginFieldsEmpty() {
    this.hasText(USERNAME_FIELD, "");
    this.hasText(PASSWORD_FIELD, "");
  }

  static verifyEmptyLoginCookies() {
    this.cookieNotExist(LOGIN_COOKIE_NAME);
  }
}
