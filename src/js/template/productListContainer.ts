const productListContainer = () => {
  return `
  <section id="product-list-container">
    <div id="product-list-wrapper">
      <h4>상품 현황</h4>
      <ul id="product-list">
        <li class="list-header">
          <span class="product-block">상품명</span>
          <span class="product-block">가격</span>
          <span class="product-block">수량</span>
          <span class="product-block"></span>
        </li>
      </ul>
    </div>
  </section>`;
};

export default productListContainer;
