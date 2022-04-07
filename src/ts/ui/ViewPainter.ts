import MainUI from './MainUI/MainUI';
import ProductInventoryUI from './MainUI/ProductManagementUI/ProductInventoryUI';
import CoinHoldingsUI from './MainUI/CoinManagementUI/CoinHoldingsUI';
import PurchaseCashChargeUI from './MainUI/ProductPurchaseUI/PurchaseCashChargeUI';
import SignInUI from './SignUI/SignInUI';

class ViewPainter {
  #mainUI: MainUI;
  #productInventoryUI: ProductInventoryUI;
  #coinHoldingsUI: CoinHoldingsUI;
  #purchaseCashChargeUI: PurchaseCashChargeUI;
  #signInUI: SignInUI;

  set mainUI(mainUI: MainUI) {
    this.#mainUI = mainUI;
  }

  set productInventoryUI(productInventoryUI: ProductInventoryUI) {
    this.#productInventoryUI = productInventoryUI;
  }

  set coinHoldingsUI(coinHoldingsUI: CoinHoldingsUI) {
    this.#coinHoldingsUI = coinHoldingsUI;
  }

  set purchaseCashChargeUI(purchaseCashChargeUI: PurchaseCashChargeUI) {
    this.#purchaseCashChargeUI = purchaseCashChargeUI;
  }

  set signInUI(signInUI: SignInUI) {
    this.#signInUI = signInUI;
  }

  renderMainUI(isSignIn: boolean) {
    this.#mainUI.renderInitPage(isSignIn);
  }

  renderSignInUI() {
    this.#signInUI.render();
  }

  renderProducts() {
    this.#productInventoryUI.render();
  }

  renderCoins() {
    this.#coinHoldingsUI.render();
  }

  renderPurchaseCash() {
    this.#purchaseCashChargeUI.render();
  }

  renderUserUI(name: string) {
    this.#mainUI.renderUserUI(name);
  }

  renderUserName(name: string) {
    this.#mainUI.renderUserName(name);
  }
}

export const viewPainter = new ViewPainter();
