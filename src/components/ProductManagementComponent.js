import ProductTableComponent from './ProductTableComponent';

class ProductManagementComponent {
  #currentProductListComponent;
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
    this.$manageProductContainer = document.querySelector('#manage-product-container');
  }
  generateTemplate() {
    return `<section id="manage-product-container" aria-labelledby="manage-product-title">
    <h2 id="manage-product-title" hidden>상품을 관리하는 섹션</h2>
    <form id="product-input-form" class="input-form">
      <label for="product-input-form">추가할 상품 정보를 입력해주세요</label>
      <div class="input-wrapper">
        <input id="product-name-input" type="text" placeholder="상품명" />
        <input id="product-price-input" type="number" placeholder="가격" />
        <input id="product-quantity-input" type="number" placeholder="수량" />
        <button type="button" class="submit-button">추가</button>
      </div>
    </form>
   
  </section>`;
  }
  initChildComponents() {
    this.#currentProductListComponent = new ProductTableComponent(this.$manageProductContainer, {
      tableId: 'current-product-list',
      tableCaption: '상품 현황',
    });
  }
}
export default ProductManagementComponent;
