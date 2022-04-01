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
    this.$pageTitle = this.$app.querySelector('#page-title');
    this.$tabNav = this.$app.querySelector('#tab-nav');
    this.$loginButton = this.$app.querySelector('#login-button');
    this.$purchaseTab = this.$app.querySelector('#purchase-product-tab');

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
    this.$pageTitle.textContent = '🍿 자판기 🍿';
    this.$tabNav.classList.remove('hide');
    this.$loginButton.classList.remove('hide');
    this.$purchaseProductContainer.classList.remove('hide');
  }

  hideSection() {
    this.$purchaseTab.classList.remove('checked');
    this.$purchaseProductContainer.classList.add('hide');
  }
}

export default PurchaseComponent;
