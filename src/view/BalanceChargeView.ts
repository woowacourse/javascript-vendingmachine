import { BalanceChargeInputForm } from '../component/BalanceChargeInputForm';
import { CoinVaultTable } from '../component/CoinVaultTable';

import { CoinVault } from '../domain/CoinVault';

export class BalanceChargeView {
  #balanceChargeInputForm: BalanceChargeInputForm;
  #coinVaultTable: CoinVaultTable;
  #coinVault: CoinVault;
  #balanceChargeContainer: HTMLDivElement;
  #isRendered: boolean;

  constructor() {
    this.#isRendered = false;
    this.#balanceChargeContainer = document.querySelector('#balance-charge-container');

    this.#coinVault = new CoinVault();
    this.#balanceChargeInputForm = new BalanceChargeInputForm({
      target: this.#balanceChargeContainer,
      coinVault: this.#coinVault,
    });
    this.#coinVaultTable = new CoinVaultTable({
      target: this.#balanceChargeContainer,
      coinVault: this.#coinVault,
    });
  }

  getIsRendered() {
    return this.#isRendered;
  }

  setIsRendered(status: boolean) {
    this.#isRendered = status;
  }

  show() {
    this.#balanceChargeContainer.classList.remove('hide');
  }

  hide() {
    this.#balanceChargeContainer.classList.add('hide');
  }

  renderAll() {
    this.#balanceChargeInputForm.render();
    this.#coinVaultTable.render();
  }
}
