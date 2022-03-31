import { Props } from '../interfaces/ProductList.interface';

const productListContainer = (props: Props) => {
  const { title, tabName } = props;
  const listHeaderText = tabName === 'ProductPurchase' ? '구매' : '';

  return `
  <section id="product-list-container">
    <div id="product-list-wrapper">
      <h4>${title}</h4>
      <ul id="product-list">
        <li class="list-header">
          <span class="product-block">상품명</span>
          <span class="product-block">가격</span>
          <span class="product-block">수량</span>
          <span class="product-block">${listHeaderText}</span>
        </li>
      </ul>
    </div>
  </section>`;
};

export default productListContainer;
