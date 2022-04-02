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

  renderMainUI(isLogin: boolean) {
    this.#mainUI.renderInitPage(isLogin);
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
}

export const viewPainter = new ViewPainter();
