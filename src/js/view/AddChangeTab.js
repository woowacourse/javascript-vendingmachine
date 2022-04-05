import { createMainElement, selectDom } from '../utils/dom';
import { emitEvent } from '../utils/event';
import { addChangeTemplate } from './template';

export default class AddChangeTab {
  #vendingMachine;
  #addChangeContainer;
  #addChangeForm;
  #moneyInput;
  #totalChange;
  #coinStatusTable;

  constructor(machine) {
    this.#vendingMachine = machine;

    this.#addChangeContainer = createMainElement(addChangeTemplate);
    this.#addChangeForm = selectDom('#add-change-form', this.#addChangeContainer);
    this.#moneyInput = selectDom('#money-input', this.#addChangeContainer);
    this.#totalChange = selectDom('#total-change', this.#addChangeContainer);
    this.#coinStatusTable = selectDom('#coin-status-table', this.#addChangeContainer);

    this.#addChangeForm.addEventListener('submit', this.#handleAddChange);
  }

  get element() {
    return this.#addChangeContainer;
  }

  #handleAddChange = (e) => {
    e.preventDefault();
    const money = this.#moneyInput.valueAsNumber;
    emitEvent(selectDom('body'), 'addChange', { money });
  };

  renderCoinStatus(coinStatus, totalChange) {
    const coinCountElements =
      this.#coinStatusTable.querySelectorAll('td[data-coin-name]');

    this.#totalChange.textContent = totalChange;
    coinCountElements.forEach((element) => {
      element.textContent = `${coinStatus[element.dataset.coinName]}개`;
    });
  }

  resetInput() {
    this.#moneyInput.value = '';
  }
}
