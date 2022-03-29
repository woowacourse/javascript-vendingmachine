import { on, emit } from '../util/event.js';
import { $, createElement } from '../util/dom';
import productTemplate from '../template/product.template.js';
import { EVENT_TYPE } from '../constant';

class ProductPageView {
  constructor() {
    this.$page = $('#page');
    this.$formContainer = createElement(
      'form',
      {
        id: 'add-product-form',
        class: 'form',
      },
      productTemplate.input(),
    );

    this.$productStatusContainer = createElement(
      'section',
      {
        id: 'product-status',
      },
      productTemplate.productTable(),
    );

    this.$page.appendChild(this.$formContainer);
    this.$page.appendChild(this.$productStatusContainer);

    this.edited = false;
    this.bindEvent();
  }

  initProductsStatus = products => {
    $('#products-list', this.$productStatusContainer).insertAdjacentHTML(
      'beforeend',
      products
        .map(product => {
          return productTemplate.product(product.get());
        })
        .join(''),
    );
  };

  bindEvent = () => {
    on(this.$formContainer, 'submit', this.productSubmitHandler);
    on(this.$productStatusContainer, 'click', this.onClick);
  };

  productSubmitHandler = e => {
    e.preventDefault();
    if (this.edited === true) return;

    const $productNameInput = $('#product-name-input', this.$formContainer);
    const $productPriceInput = $('#product-price-input', this.$formContainer);
    const $productCountInput = $('#product-count-input', this.$formContainer);

    emit(EVENT_TYPE.ADD, {
      name: $productNameInput.value,
      price: $productPriceInput.valueAsNumber,
      count: $productCountInput.valueAsNumber,
    });

    $productNameInput.value = '';
    $productPriceInput.value = '';
    $productCountInput.value = '';
  };

  onClick = ({ target }) => {
    if (target.classList.contains('delete-button')) {
      if (this.edited === true) return;

      this.productDeleteHandler(target);
    }
    if (target.classList.contains('edit-button')) {
      if (this.edited === true) return;

      this.productUpdateHandler(target);
    }

    if (target.classList.contains('save-button')) {
      this.productSubmitUpdateHandler(target);
    }
  };

  productDeleteHandler = target => {
    const productId = target.closest('tr').dataset.id;
    emit(EVENT_TYPE.DELETE, { id: productId });
  };

  productUpdateHandler = target => {
    const $product = target.closest('tr');
    $product.replaceChildren();
    $product.insertAdjacentHTML(
      'beforeend',
      productTemplate.productUpdateForm({
        name: $product.dataset.name,
        price: $product.dataset.price,
        count: $product.dataset.count,
      }),
    );

    this.edited = true;
  };

  productSubmitUpdateHandler = target => {
    const updatedProduct = target.closest('tr');

    const id = updatedProduct.dataset.id;
    const updatedName = updatedProduct.querySelector('#edit-name-input').value;
    const updatedPrice = updatedProduct.querySelector('#edit-price-input').valueAsNumber;
    const updatedCount = updatedProduct.querySelector('#edit-count-input').valueAsNumber;

    this.edited = false;

    emit(EVENT_TYPE.EDIT, {
      id,
      name: updatedName,
      price: updatedPrice,
      count: updatedCount,
    });
  };

  renderNewProduct = product => {
    $('#products-list', this.$productStatusContainer).insertAdjacentHTML(
      'beforeend',
      productTemplate.product(product.get()),
    );
  };

  renderDeleteProduct = id => {
    const list = $('#products-list', this.$productStatusContainer);
    const target = $(`[data-id="${id}"]`, list);
    list.removeChild(target);
  };

  renderUpdatedProduct = (id, { name, price, count }) => {
    const list = $('#products-list', this.$productStatusContainer);
    const target = $(`[data-id="${id}"]`, list);
    target.setAttribute('data-name', name);
    target.setAttribute('data-price', price);
    target.setAttribute('data-count', count);

    target.replaceChildren();
    target.insertAdjacentHTML(
      'beforeend',
      `<td>${name}</td>
    <td>${price}</td>
    <td>${count}</td>
    <td>
      <button class="edit-button process-button">수정</button>
      <button class="delete-button process-button">삭제</button>
    </td>`,
    );
  };
}

export default ProductPageView;
