class ViewPainter {
  #mainUI;
  #productInventoryUI;
  #coinHoldingsUI;
  #purchaseCashChargeUI;
  #signInUI;

  set mainUI(mainUI) {
    this.#mainUI = mainUI;
  }

  set productInventoryUI(productInventoryUI) {
    this.#productInventoryUI = productInventoryUI;
  }

  set coinHoldingsUI(coinHoldingsUI) {
    this.#coinHoldingsUI = coinHoldingsUI;
  }

  set purchaseCashChargeUI(purchaseCashChargeUI) {
    this.#purchaseCashChargeUI = purchaseCashChargeUI;
  }

  set signInUI(signInUI) {
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

  renderUser(name: string) {
    this.#mainUI.renderUserUI(name);
  }
}

export const viewPainter = new ViewPainter();
