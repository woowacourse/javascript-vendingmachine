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
    const { coinStatusList } = this.#vendingMachine;

    coinStatusList.forEach(({ name, count }) => {
      const coinTableData = selectDom(
        `td[data-coin-name="${name}"]`,
        this.#coinStatusTable
      );
      coinTableData.textContent = `${count}개`;
    });

    this.#totalChange.textContent = this.#vendingMachine.totalChange;
  }

  #resetInput() {
    this.#moneyInput.value = '';
  }
}
