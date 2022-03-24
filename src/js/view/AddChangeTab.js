import { templateB } from './template';

export default class AddChangeTab {
  #addChangeTabContainer;
  #addChangeForm;
  #moneyInput;
  #totalChange;

  constructor() {
    this.#addChangeTabContainer = document.createElement('main');
    this.#addChangeTabContainer.insertAdjacentHTML('beforeend', templateB);
    this.#addChangeForm =
      this.#addChangeTabContainer.querySelector('#add-change-form');
    this.#moneyInput =
      this.#addChangeTabContainer.querySelector('#money-input');
    this.#totalChange =
      this.#addChangeTabContainer.querySelector('#total-change');
  }

  get tabElements() {
    return this.#addChangeTabContainer;
  }
}
