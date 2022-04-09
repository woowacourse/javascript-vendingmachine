import isLogin from "../util/checkLogin";

class PageByLogin extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    if (isLogin()) {
      this.renderNavButtonContainer();
      return;
    }

    this.renderPurchaseContainer();
  }

  renderPurchaseContainer() {
    this.innerHTML = `
    <div id="page">
      <product-purchase></product-purchase>
      <div id="snackbar"></div>
    </div>
    `;
  }

  renderNavButtonContainer() {
    const template = document.querySelector("#nav-button-container").content;
    const cloneNode = template.cloneNode(true);
    this.appendChild(cloneNode);
  }
}

customElements.define("page-by-login", PageByLogin);
