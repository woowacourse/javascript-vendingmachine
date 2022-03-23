import ProductTableComponent from './common/ProductTableComponent';
import CoinTableComponent from './common/CoinTableComponent';

class PurchaseProductComponent {
  #purchaseProductComponent;
  #returnChangeComponent;
  constructor($parent) {
    this.$parent = $parent;
    this.mount();
    this.initDOM();
  }
  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }
  initDOM() {
    this.$purchaseProductContainer = document.querySelector('#purchase-product-container');
  }
  generateTemplate() {
    return `<section id="purchase-product-container" aria-labelledby="purchase-product-title">
          <h2 id="purchase-product-title" hidden>상품을 구매하는 섹션</h2>
          <form id="charge-input-form" class="input-form">
            <label for="charge-input-form">상품을 구매할 금액을 투입해주세요</label>
            <div class="input-wrapper">
              <input id="charge-input" type="number" placeholder="금액" />
              <button type="button" class="submit-button">추가</button>
            </div>
            <div class="total-amount">투입한 금액: <span id="input-total-amount"></span>원</div>
          </form>
        </section>`;
  }
  initChildComponents() {
    this.#purchaseProductComponent = new ProductTableComponent(this.$purchaseProductContainer, {
      tableId: '#purchase-product-list',
      tableCaption: '구매 가능 상품 현황',
    });
    this.#returnChangeComponent = new CoinTableComponent(this.$rechargeChangeContainer, {
      tableId: 'return-change-table',
      tableCaption: '잔돈 반환',
    });
  }
}

export default PurchaseProductComponent;
