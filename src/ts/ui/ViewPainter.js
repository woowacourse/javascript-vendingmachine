export default class ViewPainter {
  constructor(productInventoryUI) {
    this.productInventoryUI = productInventoryUI;
  }

  renderProducts() {
    this.productInventoryUI.render();
  }
}
