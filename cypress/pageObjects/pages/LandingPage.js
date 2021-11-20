import { BasePage } from "../BasePage";

const USERNAME_FIELD = "[data-test=username]";
const PASSWORD_FIELD = "#password";
const LOGIN_BUTTON = ".submit-button";
const LOGIN_COOKIE_NAME = "standard_user";

export class LandingPage extends BasePage {
  static login(username) {
    cy.visit("https://www.saucedemo.com/");
    this.type(USERNAME_FIELD, username);
    this.type(PASSWORD_FIELD, "secret_sauce");
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
