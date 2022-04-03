import { BalanceChargeInputForm } from '../component/BalanceChargeInputForm';
import { CoinVaultTable } from '../component/CoinVaultTable';

import { CoinVault } from '../domain/CoinVault';

export class BalanceChargeView {
  #balanceChargeInputForm: BalanceChargeInputForm;
  #coinVaultTable: CoinVaultTable;
  #coinVault: CoinVault;
  #contentsContainer: HTMLDivElement;
  #props: object;

  constructor() {
    this.#coinVault = new CoinVault();

    this.#contentsContainer = document.querySelector('#contents-container');
  }

  init() {
    this.#contentsContainer.textContent = '';

    this.#props = {
      target: this.#contentsContainer,
      coinVault: this.#coinVault,
    };
    this.#balanceChargeInputForm = new BalanceChargeInputForm(this.#props);
    this.#coinVaultTable = new CoinVaultTable(this.#props);
  }

  renderAll() {
    this.#balanceChargeInputForm.render();
    this.#coinVaultTable.render();
  }
}
