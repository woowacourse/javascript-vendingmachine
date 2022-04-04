import { createMainElement, selectDom } from '../../utils/dom';
import chargeTabTemplate from './ChargeTabTemplates';

export default class ChargeTab {
  #vendingMachine;
  #ChargeTabContainer;
  #addChangeForm;
  #moneyInput;
  #totalChange;
  #coinStatusTable;

  constructor(machine, snackbar) {
    this.snackbar = snackbar;
    this.#vendingMachine = machine;

    this.#ChargeTabContainer = createMainElement(chargeTabTemplate);
    this.#addChangeForm = selectDom('#add-change-form', this.#ChargeTabContainer);
    this.#moneyInput = selectDom('#money-input', this.#ChargeTabContainer);
    this.#totalChange = selectDom('#total-change', this.#ChargeTabContainer);
    this.#coinStatusTable = selectDom('.coin-status-table', this.#ChargeTabContainer);

    this.#addChangeForm.addEventListener('submit', this.#handleAddChange);
  }

  get tabElements() {
    this.#renderCoinStatus();
    return this.#ChargeTabContainer;
  }

  #handleAddChange = (e) => {
    e.preventDefault();
    const money = this.#moneyInput.valueAsNumber;

    try {
      this.#vendingMachine.addChange(money);
      this.#renderCoinStatus();
      this.#resetInput();
    } catch ({ message }) {
      this.snackbar.addToMessageList(message);
    }
  };

  #renderCoinStatus() {
    const coinCountElements =
      this.#coinStatusTable.querySelectorAll('td[data-coin-name]');
    const { coinStatus } = this.#vendingMachine;

    this.#totalChange.textContent = this.#vendingMachine.totalChange;
    coinCountElements.forEach((element) => {
      element.textContent = `${coinStatus[element.dataset.coinName]}개`;
    });
  }

  #resetInput() {
    this.#moneyInput.value = '';
  }
}
