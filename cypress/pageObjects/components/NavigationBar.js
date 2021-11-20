import { BasePage } from "../BasePage";

const BURGER_MENU_BUTTON = "#react-burger-menu-btn";
const LOGOUT_BUTTON = "#logout_sidebar_link";
const SHOPPING_CART_LINK = "#logout_sidebar_link";

export class NavigationBar extends BasePage {
  static logout() {
    this.click(BURGER_MENU_BUTTON);
    this.click(LOGOUT_BUTTON);
  }

  static goToCart() {
    this.click(SHOPPING_CART_LINK);
  }
}
