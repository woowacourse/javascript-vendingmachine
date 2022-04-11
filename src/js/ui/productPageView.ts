import { on, emit } from "../util/event";
import { $, createElement } from "../util/dom";
import { ISingleProduct } from "../interface/product.interface";
import productTemplate from "../template/product.template";
import headerTemplate from "../template/header.template";
import { EVENT_TYPE } from "../constant";
import {
  IDeleteProductEvent,
  IAddProductEvent,
  IUpdateProductEvent,
} from "../type";

class ProductPageView {
  $page;
  $header;

  $userInfoContainer;
  $formContainer;
  $productStatusContainer;
  $productNameInput;
  $productPriceInput;
  $productCountInput;
  $productList;

  init() {
    this.$page = $("#page");
    this.$header = $("#header");
    this.$page.replaceChildren();
    this.$header.replaceChildren();

    this.$userInfoContainer = createElement("section", {
      id: "user-info",
    });

    this.$formContainer = createElement(
      "form",
      {
        id: "add-product-form",
        class: "form",
      },
      productTemplate.inputCollection()
    );

    this.$productStatusContainer = createElement(
      "section",
      {
        id: "product-status",
      },
      productTemplate.productTable()
    );

    this.$page.appendChild(this.$formContainer);
    this.$page.appendChild(this.$productStatusContainer);

    this.$productNameInput = $("#product-name-input", this.$formContainer);
    this.$productPriceInput = $("#product-price-input", this.$formContainer);
    this.$productCountInput = $("#product-count-input", this.$formContainer);

    this.$productList = $("#products-list", this.$productStatusContainer);
    this.$userInfoContainer = $("#user-info", this.$header);
    this.bindEvent();
  }

  bindEvent() {
    on(this.$formContainer, "submit", this.productSubmitHandler);
    on(this.$productStatusContainer, "click", this.onClick);
  }

  productSubmitHandler = (e: Event) => {
    e.preventDefault();

    emit<IAddProductEvent>(EVENT_TYPE.ADD, {
      name: this.$productNameInput.value,
      price: this.$productPriceInput.valueAsNumber,
      count: this.$productCountInput.valueAsNumber,
    });

    this.$productNameInput.value = "";
    this.$productPriceInput.value = "";
    this.$productCountInput.value = "";
  };

  onClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("delete-button")) {
      this.productDeleteHandler(e);
      return;
    }
    if (target.classList.contains("edit-button")) {
      this.productUpdateHandler(e);
      return;
    }
    if (target.classList.contains("save-button")) {
      this.productSubmitUpdateHandler(e);
      return;
    }
  };

  productDeleteHandler = (e: Event) => {
    const target = e.target as HTMLElement;
    const productId = target.closest("tr").dataset.id;
    emit<IDeleteProductEvent>(EVENT_TYPE.DELETE, { id: productId });
  };

  productUpdateHandler = (e: Event) => {
    const target = e.target as HTMLElement;
    const $product = target.closest("tr");
    $product.replaceChildren();
    $product.insertAdjacentHTML(
      "beforeend",
      productTemplate.productUpdateForm({
        name: $product.dataset.name,
        price: +$product.dataset.price,
        count: +$product.dataset.count,
      })
    );
  };

  productSubmitUpdateHandler = (e: Event) => {
    const target = e.target as HTMLElement;
    const updatedProduct = target.closest("tr");

    const id = updatedProduct.dataset.id;
    const updatedName = (
      $("#edit-name-input", updatedProduct) as HTMLInputElement
    ).value;
    const updatedPrice = (
      $("#edit-price-input", updatedProduct) as HTMLInputElement
    ).valueAsNumber;
    const updatedCount = (
      $("#edit-count-input", updatedProduct) as HTMLInputElement
    ).valueAsNumber;

    emit<IUpdateProductEvent>(EVENT_TYPE.EDIT, {
      id,
      name: updatedName,
      price: updatedPrice,
      count: updatedCount,
    });
  };

  renderHeader(userInfo) {
    this.$header.insertAdjacentHTML(
      "beforeend",
      headerTemplate.loggedIn(userInfo.name[0])
    );
  }

  renderProductsStatus(products: ISingleProduct[]) {
    this.$productList.insertAdjacentHTML(
      "beforeend",
      products
        .map((product) => {
          return productTemplate.product(product.get());
        })
        .join("")
    );
  }

  renderNewProduct(product: ISingleProduct) {
    $("#products-list", this.$productStatusContainer).insertAdjacentHTML(
      "beforeend",
      productTemplate.product(product.get())
    );
  }

  renderDeleteProduct(id: string) {
    const target = $(`[data-id="${id}"]`, this.$productList);
    this.$productList.removeChild(target);
  }

  renderUpdatedProduct(
    id: string,
    { name, price, count }: IUpdateProductEvent
  ) {
    const target = $(`[data-id="${id}"]`, this.$productList);
    target.setAttribute("data-name", name);
    target.setAttribute("data-price", price.toString());
    target.setAttribute("data-count", count.toString());

    target.replaceChildren();
    target.insertAdjacentHTML(
      "beforeend",
      productTemplate.updatedProduct({ name, price, count })
    );
  }
}

export default ProductPageView;
