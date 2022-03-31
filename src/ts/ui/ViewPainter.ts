class ViewPainter {
  #productInventoryUI;
  #coinHoldingsUI;
  #purchaseCashChargeUI;

  set productInventoryUI(productInventoryUI) {
    this.#productInventoryUI = productInventoryUI;
  }

  set coinHoldingsUI(coinHoldingsUI) {
    this.#coinHoldingsUI = coinHoldingsUI;
  }

  set purchaseCashChargeUI(purchaseCashChargeUI) {
    this.#purchaseCashChargeUI = purchaseCashChargeUI;
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
