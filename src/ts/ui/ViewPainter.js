class ViewPainter {
  #productInventoryUI;
  #coinHoldingsUI;
  renderProducts() {
    this.#productInventoryUI.render();
  }

  renderCoins() {
    this.#coinHoldingsUI.render();
  }

  set productInventoryUI(productInventoryUI) {
    this.#productInventoryUI = productInventoryUI;
  }

  set coinHoldingsUI(coinHoldingsUI) {
    this.#coinHoldingsUI = coinHoldingsUI;
  }
}

export const viewPainter = new ViewPainter();
