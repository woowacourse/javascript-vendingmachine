class ViewPainter {
  #productInventoryUI;
  renderProducts() {
    this.#productInventoryUI.render();
  }

  set productInventoryUI(productInventoryUI) {
    this.#productInventoryUI = productInventoryUI;
  }
}

export const viewPainter = new ViewPainter();
