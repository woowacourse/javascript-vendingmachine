class ViewPainter {
  #mainUI;
  #productInventoryUI;
  #coinHoldingsUI;
  #purchaseCashChargeUI;

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

  renderMainUI() {
    this.#mainUI.renderInitPage();
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
