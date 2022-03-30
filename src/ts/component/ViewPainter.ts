class ViewPainter {
  #productInventoryComponent;
  #coinHoldingsComponent;

  set productInventoryComponent(productInventoryComponent) {
    this.#productInventoryComponent = productInventoryComponent;
  }

  set coinHoldingsComponent(coinHoldingsComponent) {
    this.#coinHoldingsComponent = coinHoldingsComponent;
  }

  renderProducts() {
    this.#productInventoryComponent.render();
  }

  renderCoins() {
    this.#coinHoldingsComponent.render();
  }
}

export const viewPainter = new ViewPainter();
