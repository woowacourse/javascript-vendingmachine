import { createMainElement, selectDom } from '../utils/dom';
import { TEMPLATE } from './template';

export default class AddChangeTab {
  #vendingMachine;
  #addChangeContainer;
  #addChangeForm;
  #changeInput;
  #totalChange;
  #coinStatusTable;

  constructor(machine) {
    //멤버변수 생성
    this.#vendingMachine = machine;

    this.#addChangeContainer = createMainElement(TEMPLATE.ADD_CHANGE);
    this.#addChangeForm = selectDom('#add-change-form', this.#addChangeContainer);
    this.#changeInput = selectDom('#change-input', this.#addChangeContainer);
    this.#totalChange = selectDom('#total-change', this.#addChangeContainer);
    this.#coinStatusTable = selectDom('#coin-status-table', this.#addChangeContainer);

    //이벤트 바인딩
    this.#addChangeForm.addEventListener('submit', this.#handleAddChange);
  }

  get tabElements() {
    this.#totalChange.textContent = this.#vendingMachine.totalChange;
    this.#renderCoinStatus();
    return this.#addChangeContainer;
  }

  #handleAddChange = (e) => {
    e.preventDefault();
    const money = this.#changeInput.valueAsNumber;

    try {
      this.#vendingMachine.addChange(money);
      this.#renderCoinStatus();
      this.#resetInput();
    } catch ({ message }) {
      alert(message);
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
    this.#changeInput.value = '';
  }
}
