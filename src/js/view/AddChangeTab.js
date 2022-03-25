import { templateB } from './template';

export default class AddChangeTab {
  #vendingMachine;
  #addChangeTabContainer;
  #addChangeForm;
  #moneyInput;
  #totalChange;
  #coinStatusTable;

  constructor(machine) {
    this.#vendingMachine = machine;
    this.#addChangeTabContainer = document.createElement('main');
    this.#addChangeTabContainer.insertAdjacentHTML('beforeend', templateB);
    this.#addChangeForm =
      this.#addChangeTabContainer.querySelector('#add-change-form');
    this.#moneyInput =
      this.#addChangeTabContainer.querySelector('#money-input');
    this.#totalChange =
      this.#addChangeTabContainer.querySelector('#total-change');
    this.#coinStatusTable =
      this.#addChangeTabContainer.querySelector('#coin-status-table');

    this.#addChangeForm.addEventListener('submit', this.handleAddChange);
  }

  get tabElements() {
    return this.#addChangeTabContainer;
  }

  handleAddChange = (e) => {
    e.preventDefault();

    const money = this.#moneyInput.valueAsNumber;

    try {
      this.#vendingMachine.addChange(money);
      this.renderCoinStatus();
    } catch ({ message }) {
      alert(message);
    }
  };

  renderCoinStatus() {
    this.#totalChange.textContent = this.#vendingMachine.totalChange;

    const coinCountElements =
      this.#coinStatusTable.querySelectorAll('td[data-coin-name]');
    const { coinStatus } = this.#vendingMachine;

    coinCountElements.forEach((element) => {
      element.textContent = `${coinStatus[element.dataset.coinName]}개`;
    });
  }
}
