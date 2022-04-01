import { changesProcessMachine } from "../domain/changesProcessMachine";
import { productPurchaseMachine } from "../domain/productPurchaseMachine";
import { emit } from "../util/event";

class ReturnTable extends HTMLElement {
  constructor() {
    super();
    this.$page = document.querySelector("#page");
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.$returnCoin500 = this.shadowRoot.querySelector("#return-coin-500");
    this.$returnCoin100 = this.shadowRoot.querySelector("#return-coin-100");
    this.$returnCoin50 = this.shadowRoot.querySelector("#return-coin-50");
    this.$returnCoin10 = this.shadowRoot.querySelector("#return-coin-10");
    this.$returnButton = this.shadowRoot.querySelector("#return-button");

    this.$returnButton.addEventListener("click", this.onClickReturnButton);
  }

  onClickReturnButton = () => {
    const chargedUserMoney = productPurchaseMachine.getChargedMoney();
    const returnedCoins = changesProcessMachine.return(chargedUserMoney);

    productPurchaseMachine.returned(returnedCoins);
    this.updateReturnCoins(returnedCoins);
    emit(this.$page, "@updateamount");
  };

  updateReturnCoins = (returnedCoins) => {
    this.$returnCoin500.innerText = `${returnedCoins["500"]}개`;
    this.$returnCoin100.innerText = `${returnedCoins["100"]}개`;
    this.$returnCoin50.innerText = `${returnedCoins["50"]}개`;
    this.$returnCoin10.innerText = `${returnedCoins["10"]}개`;
  };

  render() {
    const template = document.querySelector("#coin-return-table").content;
    const cloneNode = template.cloneNode(true);
    this.shadowRoot.appendChild(cloneNode);
  }
}

customElements.define("return-table", ReturnTable);
