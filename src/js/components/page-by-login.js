class PageByLogin extends HTMLElement {
  constructor() {
    super();
    this.user = JSON.parse(localStorage.getItem("user-info"));
    this.render();
  }

  render() {
    if (this.checkLogin()) {
      this.renderNavButtonContainer();
      return;
    }

    this.renderPurchaseContainer();
  }

  checkLogin = () => {
    return this.user && this.user.key;
  };

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
