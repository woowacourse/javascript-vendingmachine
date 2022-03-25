class PurchaseProductComponent {
  constructor($parent) {
    this.$parent = $parent;
    this.mount();
    this.initDOM();
    this.initChildComponents();
  }

  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    this.$purchaseProductContainer = document.querySelector('#purchase-product-container');
  }

  generateTemplate() {
    return `<section id="purchase-product-container" aria-labelledby="purchase-product-title" class="hide">
          <h2 id="purchase-product-title" hidden>상품을 구매하는 섹션</h2>
          <div class="empty-img"><img src="./empty-img.png" width="200px" height="200px"></img></div>
        </section>`;
  }

  show() {
    this.$purchaseProductContainer.classList.remove('hide');
  }

  hide() {
    this.$purchaseProductContainer.classList.add('hide');
  }
  show() {
    this.$purchaseProductContainer.classList.remove('hide');
  }

  hide() {
    this.$purchaseProductContainer.classList.add('hide');
  }
}

export default PurchaseProductComponent;
