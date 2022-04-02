class PurchaseComponent {
  constructor() {
    this.$app = document.querySelector('#app');
    this.mount();
    this.initDOM();
  }

  mount() {
    this.$app.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    /** 상위 컴포넌트가 관리하는 뷰 영역을 참조하게 된다. */
    this.$purchaseTab = this.$app.querySelector('#purchase-product-tab');
    this.$notAccess = this.$app.querySelector('#not-access-section');

    this.$purchaseProductContainer = this.$app.querySelector('#purchase-product-container');
  }

  generateTemplate() {
    return `<section id="purchase-product-container" aria-labelledby="purchase-product-title" class="hide">
            <h2 id="purchase-product-title" hidden>상품을 구매하는 섹션</h2>
            <div class="empty-img"><img src="./empty-img.png" width="200px" height="200px"></img></div>
          </section>`;
  }

  showSection() {
    this.$purchaseTab.classList.add('checked');

    this.$purchaseProductContainer.classList.remove('hide');
    this.$notAccess.classList.add('hide');
  }

  hideSection() {
    this.$purchaseTab.classList.remove('checked');
    this.$purchaseProductContainer.classList.add('hide');
  }
}

export default PurchaseComponent;
