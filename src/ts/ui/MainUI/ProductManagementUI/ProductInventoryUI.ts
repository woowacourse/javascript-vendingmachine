import { MESSAGE } from '../../../constants/message';
import { showSnackbar } from '../../../utils';
import { $, $$, replaceHTML } from '../../../utils/dom';
import { viewPainter } from '../../ViewPainter';

export default class ProductInventoryUI {
  private readonly $container: HTMLElement;
  private readonly productDomain;

  constructor(productDomain) {
    this.$container = $('.product-inventory__container');
    this.productDomain = productDomain;
    this.render();
    this.$container.addEventListener('click', this.buttonClickHandler);
  }

  render() {
    replaceHTML(this.$container, this.template());
    $$('.product-inventory__input').forEach($input =>
      $input.addEventListener('keydown', this.enterForEditHandler),
    );
  }

  private template() {
    const { products } = this.productDomain;
    const baseTemplate = `
      <div class="product-inventory__item grid-item grid-header">
        상품명
      </div>
      <div class="product-inventory__item grid-item grid-header">
        가격(원)
      </div>
      <div class="product-inventory__item grid-item grid-header">
        수량
      </div>
      <div class="product-inventory__item grid-item grid-header"></div>
      <div class="product-inventory__item grid-item grid-header"></div>
    `;

    const productsTemplate = products
      .map(product => {
        const { name, price, quantity } = product.product;
        return `
          <div class="product-inventory__item grid-item" data-product-name="${name}">
            <input class="product-inventory__input" value="${name}" data-product-name="${name}" readonly />
          </div>
          <div class="product-inventory__item grid-item" data-product-name="${name}">
            <input type="number" class="product-inventory__input" value="${price}" data-product-name="${name}" readonly />
          </div>
          <div class="product-inventory__item grid-item" data-product-name="${name}">
            <input type="number" class="product-inventory__input" value="${quantity}" data-product-name="${name}" readonly />
          </div>
          <div class="product-inventory__item grid-item" data-product-name="${name}">
            <button
              type="button"
              title="수정"
              data-product-name="${name}"
              class="product-inventory__button product-inventory__edit-button grid-button"
            >
              수정
            </button>
          </div>
          <div class="product-inventory__item grid-item" data-product-name="${name}">
            <button
              type="button"
              title="삭제"
              data-product-name="${name}"
              class="product-inventory__button product-inventory__delete-button grid-button"
            >
              삭제
            </button>
          </div>
        `;
      })
      .join('');

    return baseTemplate + productsTemplate;
  }

  private enterForEditHandler = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    if (!(e.target instanceof HTMLElement)) return;

    const $editButton = $(
      `button[data-product-name="${e.target.dataset.productName}"][title="수정"]`,
    ) as HTMLButtonElement;

    this.finishEditMode($editButton);
  };

  private buttonClickHandler = (e: MouseEvent) => {
    const { target } = e;
    if (!(target instanceof HTMLButtonElement)) return;

    switch (target.innerText) {
      case '수정':
        this.activateEditMode(target);
        break;
      case '확인':
        this.finishEditMode(target);
        break;
      case '삭제':
        const { productName } = target.dataset;
        if (!confirm(`🥤${productName}🥤${MESSAGE.CONFIRM_DELETE_PRODUCT}`))
          return;
        this.deleteProduct(productName);
    }
  };

  private activateEditMode($button: HTMLButtonElement) {
    $button.innerText = '확인';

    const $$inputs = $$(
      `input[data-product-name="${$button.dataset.productName}"]`,
    ) as NodeListOf<HTMLInputElement>;
    $$inputs.forEach($input => {
      $input.removeAttribute('readonly');
    });

    $$inputs[0].focus();

    const inputValueLength = $$inputs[0].value.length;
    $$inputs[0].setSelectionRange(inputValueLength, inputValueLength);
    $$inputs[0].scrollLeft = inputValueLength * 30;

    const $deleteButton = $(
      `button[data-product-name="${$button.dataset.productName}"][title="삭제"]`,
    ) as HTMLButtonElement;
    $deleteButton.setAttribute('hidden', '');
  }

  private deactivateEditMode($button: HTMLButtonElement) {
    $button.innerText = '수정';

    const $$inputs = $$(
      `input[data-product-name="${$button.dataset.productName}"]`,
    );
    $$inputs.forEach($input => {
      $input.setAttribute('readonly', '');
    });

    const $deleteButton = $(
      `button[data-product-name="${$button.dataset.productName}"][title="삭제"]`,
    ) as HTMLButtonElement;
    $deleteButton.removeAttribute('hidden');
  }

  private finishEditMode($button: HTMLButtonElement) {
    const prevProductName = $button.dataset.productName;
    const $$inputs = $$(
      `input[data-product-name="${prevProductName}"]`,
    ) as NodeListOf<HTMLInputElement>;
    const product = {
      name: $$inputs[0].value,
      price: $$inputs[1].valueAsNumber,
      quantity: $$inputs[2].valueAsNumber,
    };

    try {
      this.productDomain.validateProductInput(product, prevProductName);
    } catch ({ message }) {
      showSnackbar(message);
      return;
    }

    this.productDomain.editProduct($button.dataset.productName, product);

    this.deactivateEditMode($button);
    viewPainter.renderProducts();
    showSnackbar(MESSAGE.SUCCESS_EDIT_PRODUCT);
  }

  private deleteProduct(productName) {
    this.productDomain.deleteProduct(productName);

    const $$tableRow = $$(`div[data-product-name="${productName}"]`);
    $$tableRow.forEach($item => $item.remove());
    showSnackbar(MESSAGE.SUCCESS_DELETE_PRODUCT);
  }
}
